"""
Suggest tags for a blog post using TypeSafe/Jev, from the blog's existing tag
vocabulary only.

WHAT THIS DOES
    Scans every post's frontmatter to build the set of tags already in use,
    then sends ONE TypeSafe request containing a Noul ("yes/no, with a
    probability") question per tag: "does this post relate to tag X?". All
    questions run in parallel over the same post text and come back as
    independent probabilities.

WHY NOUL-PER-TAG (NOT A SINGLE CHOICE QUESTION)
    A post can legitimately have several tags at once (this one has 4), so
    this is a multi-label problem. TypeSafe's Choice primitive picks exactly
    one winner from a set of options, which is the wrong shape here. One Noul
    per candidate tag is the documented pattern for "several may apply."
    See: https://docs.typesafe.ai/primitives/noul.md

WHY THE VOCABULARY IS "TAGS ALREADY IN USE," NOT "ANY TAG"
    Noul/Choice can only judge options you explicitly hand it - it cannot
    invent a tag that isn't offered, and if you offer an incomplete list it
    will still confidently pick from what's there. Restricting the question
    set to tags that already exist on the blog sidesteps that failure mode
    entirely (nothing to omit), at the cost of never discovering that a post
    needs a brand-new tag - a different problem this script doesn't attempt.

SETUP (see scripts/README.md for the one-time environment explanation)
    1. Requires Python >= 3.10 (repo's default `python3` may be older - see README).
    2. `pip install typesafe-sdk`
    3. `export TYPESAFE_API_KEY="..."` (get a key at https://typesafe.ai)

USAGE
    python3 scripts/tag_suggest_poc.py

    Runs against the single hardcoded TEST_POST below, whose real tags are
    withheld from the request state and used only afterward to score the
    result. To try a different post, change TEST_POST and GROUND_TRUTH_TAGS.
    This is a POC, not a CLI - it isn't wired up to take a --post argument
    or to write suggested tags back into a file.

READING THE OUTPUT
    Each line is `<probability 0-1>  <tag>`, sorted highest first. A Noul
    near 1.0 means "yes"; near 0 means "no"; near 0.5 means the model itself
    is unsure (not "medium relevance"). There's a worked example of picking
    action thresholds from these probabilities in
    https://docs.typesafe.ai/confidence.md - e.g. auto-apply the tag above
    some high threshold, queue for human review in a middle band, and ignore
    the rest.

KNOWN RESULT AND LIMITATION (observed 2026-09-17, model jev-latest)
    On the fonts/vim/CLI/eyecandy test post, all 4 real tags scored in the
    top 8 of 82 (fonts 0.99, vim 0.87, CLI 0.84, eyecandy 0.83) - recall is
    strong enough to use this for "surface suggestions for a human to
    confirm." But 9 other tags scored 0.6-0.97 too (howto, Macs, tooling,
    MacOS, unix, UI, code, notes to self, workaround) - precision is weak
    enough that auto-applying anything past a single confidence threshold
    would over-tag. Some of those aren't really wrong, either - the post IS
    a how-to, on a Mac - which is really a ground-truth problem: this
    author's own tagging was never exhaustive, so "differs from the human's
    tags" isn't the same claim as "is incorrect."
    The likely fix, not yet tried: the criteria text below is a generic
    template ("the post is meaningfully about {tag}"), which sets a loose
    bar that many superficially-related tags clear. Hand-written per-tag
    criteria (see the "criteria quality" discussion this script came out of)
    would likely sharpen precision at the cost of authoring ~80 short
    descriptions. Worth re-testing before building anything on top of this.
"""

import glob
import re
import collections
from pathlib import Path

from typesafe_sdk import TypeSafeClient, Noul

POSTS_DIR = Path(__file__).resolve().parent.parent / "src" / "data" / "blog-posts"
TEST_POST = POSTS_DIR / "2014-04-29-setting-up-fancy-fonts-for-vim-in-iTerm.md"
GROUND_TRUTH_TAGS = {"vim", "cli", "fonts", "eyecandy"}


def load_tag_vocabulary():
    """Every distinct tag used across all posts, keyed by lowercased tag
    ("fold") since the real data has inconsistent casing for the same tag
    (e.g. `javascript` / `JavaScript`, `npm` / `NPM`). The value is a single
    canonical display casing - whichever variant appears most often, so a
    typo'd one-off casing doesn't win - for use in prompts and printed
    output; the fold is what all lookups key on."""
    variant_counts = collections.defaultdict(collections.Counter)
    for path in glob.glob(str(POSTS_DIR / "*.md")) + glob.glob(str(POSTS_DIR / "*.mdx")):
        text = open(path, encoding="utf-8").read()
        match = re.search(r"^tags:\n((?:\s*-\s*.+\n?)+)", text, re.MULTILINE)
        if not match:
            continue
        for line in match.group(1).splitlines():
            tag = line.strip("- ").strip()
            if tag:
                variant_counts[tag.lower()][tag] += 1

    return {fold: variants.most_common(1)[0][0] for fold, variants in variant_counts.items()}


def load_test_post_state():
    """Title + body only - the real `tags:` frontmatter field is deliberately
    dropped so the request is a blind test against GROUND_TRUTH_TAGS."""
    text = TEST_POST.read_text(encoding="utf-8")
    frontmatter, body = text.split("---", 2)[1:]
    title_match = re.search(r"^title:\s*(.+)$", frontmatter, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else ""
    return {"title": title, "body": body.strip()}


def build_questions(tag_vocabulary):
    """One Noul per tag, using a generic true/false template rather than a
    hand-written description per tag. This is the cheap end of a real
    tradeoff (see the module docstring's KNOWN RESULT section) - fine for
    unambiguous tags like `javascript`, weaker for short/overloaded ones
    like `UI` or `code` where the tag name alone underspecifies intent."""
    questions = {}
    for fold, display_name in tag_vocabulary.items():
        questions[fold] = Noul(
            instructions=f'Does this blog post relate to the topic "{display_name}"?',
            criteria={
                "true": f"The post is meaningfully about {display_name}",
                "false": f"The post is not about {display_name}",
            },
        )
    return questions


def main():
    tag_vocabulary = load_tag_vocabulary()
    state = load_test_post_state()
    questions = build_questions(tag_vocabulary)

    print(f"Post title: {state['title']!r}")
    print(f"Vocabulary size: {len(questions)} tags")
    print(f"Ground truth (withheld): {sorted(GROUND_TRUTH_TAGS)}")
    print()

    with TypeSafeClient() as client:
        response = client.system_one(
            state=state,
            questions=questions,
            model="jev-latest",
        )

    scored = sorted(
        ((fold, response.nouls[fold].noul) for fold in questions),
        key=lambda pair: pair[1],
        reverse=True,
    )

    print("Top 15 by probability:")
    for fold, probability in scored[:15]:
        hit = " <-- ground truth" if fold in GROUND_TRUTH_TAGS else ""
        print(f"  {probability:.3f}  {tag_vocabulary[fold]}{hit}")

    missed = [fold for fold in GROUND_TRUTH_TAGS if fold not in [f for f, _ in scored[:15]]]
    if missed:
        print()
        print("Ground truth tags NOT in top 15 (showing their actual rank/score):")
        rank_by_fold = {fold: (rank, p) for rank, (fold, p) in enumerate(scored, start=1)}
        for fold in missed:
            rank, probability = rank_by_fold[fold]
            print(f"  #{rank:3d}  {probability:.3f}  {tag_vocabulary[fold]}")

    print()
    print(f"Usage: {response.usage.input_tokens} in / {response.usage.output_tokens} out")


if __name__ == "__main__":
    main()
