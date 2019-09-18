---
layout: post
title: don't be scared of merge conflicts
tags: [git, versioning, merge conflicts]
---

First things first: it can be a lot easier to resolve merge conflicts when you can see what the code looked like *before* the edits which are now conflicting. Git calls that the "common ancestors" of the conflicting lines of code, and it's easy to configure Git to show those in the merge conflicts themselves using the `merge.conflictstyle` config option. Here's what Git's help has to say about it:

> Specify the style in which conflicted hunks are written out to working tree files upon merge. The default is "merge", which shows a `<<<<<<<` conflict marker, changes made by one side, a `=======` marker, changes made by the other side, and then a `>>>>>>>` marker. An alternate style, "diff3", adds a `|||||||` marker and the original text before the `=======` marker.

To configure your local Git client to always use this style of merge conflict, run `git config --global merge.conflictstyle diff3` in your shell (which will modify your global `.gitconfig`).

---

When you do a merge and there's a crazy conflict, you want to see what changed between the common ancestor and whatever you just pulled down. You can do that for individual files like this:

```shell
$ git ls-files -u | awk '{print $3" "$4}'
```

...to show what files are conflicting. It'll print out something like this:

```
1 path/to/file
2 path/to/file
3 path/to/file
```

...the `1` there is the common ancestor; `2` is your file (your HEAD); `3` is what you've tried to merge in. To see what changed between the common ancestor and what you just merged in, do this:

```shell
$ git diff :1:path/to/file :3:path/to/file
```
