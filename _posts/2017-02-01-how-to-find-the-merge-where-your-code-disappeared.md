---
layout: post
title: how to find the merge where your code disappeared
tags: [git, versioning, code archaeology]
---

Because I keep forgetting that [I originally put this on the twitters](https://twitter.com/drwxrxrx/status/766373512437039104)...

```shell
$ git log --patch -m -G regexForMissingCode
```

(Neither of these short options have long names...)

About `-m`:

> This flag makes the merge commits show the full diff like regular commits; for each merge parent, a separate log entry and diff is generated. An exception is that only diff against the first parent is shown when `--first-parent` option is given; in that case, the output represents the changes the merge brought into the then-current branch.

About `-G <regex>`:

> Look for differences whose patch text contains added/removed lines that match `<regex>`. To illustrate the difference between `-S<regex> --pickaxe-regex` and `-G<regex>`, consider a commit with the following diff in the same file:
>
>    +    return !regexec(regexp, two->ptr, 1, &regmatch, 0);
>    ...
>    -    hit = !regexec(regexp, mf2.ptr, 1, &regmatch, 0);

While `git log -G"regexec\(regexp"` will show this commit, `git log -S"regexec\(regexp" --pickaxe-regex` will not (because the number of occurrences of that string did not change). See the pickaxe entry in `gitdiffcore(7)` for more information.

_______

Digging through third-party code or compiled stuff? Learn how to [search diffs with `git log` but exclude certain directories](/2016/04/11/search-Git-history-ignoring-certain-directory.html)!
