# scripts/

One-off Python scripts, separate from the Astro/Node app in the rest of this repo.

## Environment

The system `python3` on this machine is 3.9, but these scripts require
Python >= 3.10. This directory has a `.tool-versions` file pinning
`python 3.14.6` via `mise` (an asdf-compatible version manager) - since the
shell has `mise activate` wired up (see `~/.zshrc`), `cd`-ing into this
directory makes plain `python3` resolve to that pinned version automatically:

```bash
cd scripts && python3 <script>.py
```

Running from the repo root instead (e.g. non-interactively, where mise's
`cd` hook won't have fired) needs an explicit pointer at this directory's
config:

```bash
mise exec -C scripts -- python3 scripts/<script>.py
```

(`mise list python` shows what's installed; install a different version with
`mise install python@<version>` first if the pinned one isn't there - ask
before doing that, same as any other install.)

Dependencies are installed into that interpreter's user site-packages with
plain `pip install --user <package>` (there's no requirements.txt or venv
here yet - ask before adding one, and always ask before installing a new
package at all).

## tag_suggest_poc.py

Suggests tags for a blog post from the blog's existing tag vocabulary using
TypeSafe/Jev. See the module docstring at the top of the file for what it
does, why it's shaped the way it is, and its known precision/recall
tradeoff - that's the primary documentation; this README only covers
getting the environment ready to run it.

Requires:
- `pip install typesafe-sdk` (see above re: asking before installing)
- `export TYPESAFE_API_KEY="..."` - get a key at https://typesafe.ai
