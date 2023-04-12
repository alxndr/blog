---
title: search Git history, ignoring certain directory
tags: [git, version control, code archaeology]
---

Ever wanted to look through a Git repository's history for a commits involving a specific string, but ignoring a certain directory (e.g. for packaged/built code)?

As of Git 1.9, you're in luck! In the file listing, you can now exclude certain paths by starting them with `:(exclude)` (or `:!` but your shell might mess with that):

```shell
git log -u -S fooBar -- . ":(exclude)public/pkg/" ":(exclude)vendor/"
```

This will look through the current directory (`.`, with the `--` [indicating the end of the options and the beginning of the paths](http://unix.stackexchange.com/a/11382/48320)) for commits which add or remove the string "fooBar", but will not look through the `public/pkg/` or `vendor/` subdirectories of the current directory.

Tip of the hat to [VonC on StackOverflow](http://stackoverflow.com/a/21079437/303896).
