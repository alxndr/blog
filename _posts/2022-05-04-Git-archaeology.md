---
layout: post
title: Git archaeology tips
tags: [git, version control, code archaeology, howto]
---

TLDR:
* history of a deleted/moved file: `git log -- path/to/deleted-file`
* find all commits which include a given string in the diff: `git log -S string`
* [ignore certain directories][blog-git-ignore-dirs]

-------

[Git](https://git-scm.com/) has some commands that let you look into the past of a repo, through code that has been overwritten and files that have been moved or deleted...

(Pro tip: all of these commands can be [tweaked to ignore certain directories][blog-git-ignore-dirs]...)

## find the history of a moved or deleted file

Normally you can find the history of a file with `git log [FILENAME]`. However if that filename doesn't currently exist, Git gets confused and thinks you're trying to find the history of a "revision" (aka SHA/branch/tag) instead, and will spit out this message:

```
⟫ git log file-that-was-deleted-ages-ago.txt
fatal: ambiguous argument 'file-that-was-deleted-ages-ago.txt': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

...note the "path not in the working tree" part.

The next line tells us what to do: "Use '--' to separate paths from revisions":

```
⟫ git log -- .circleci
commit abcdefg1234567890abcdefg1234567890abcdef
Author: Alexander
Date:   Wed May 4 12:34:56 2022

    refactor: get rid of that file

# ...
```

Now we can see all the commits which modified that file before it was deleted, including the commit which deleted (or moved) it.

🪄✨🔮


## look for any commit which includes a specific string

This ever happen to you? There's an error message with a debug code that is nowhere to be found in the current codebase, but you're pretty sure the debug code was in an old version of the codebase?

You can find commits which add or remove a specific string by using the `-S` flag on `git log`, here's what the docs say:

```
 -S<string>
     Look for differences that change the number of occurrences of the specified string (i.e.
     addition/deletion) in a file. Intended for the scripter's use.

     It is useful when you're looking for an exact block of code (like a struct), and want to know the
     history of that block since it first came into being: use the feature iteratively to feed the
     interesting block in the preimage back into -S, and keep going until you get the very first version of
     the block.

     Binary files are searched as well.
```

I like to use this flag with the `--patch / -p / -u` flag so that you can see the diff too (easier to use if [your commits are small and focused](https://dev.bleacherreport.com/small-commits-for-fun-and-profit-part-1-git-add-patch-c0966a562b10?source=collection_archive---------6-----------------------)!) e.g.:

```
…/workspace/blog main
⟫ grep -rin link: *


…/workspace/blog main
1 ✘ ⟫ git log --patch -S link:
commit 7ad72c4e436ae29a574d20f536561a358784f165 (HEAD -> main, origin/main)
Author: Alexander <alxndr+github@gmail.com>
Date:   Fri Apr 22 10:18:31 2022

    ops: fix yaml format for nav links

diff --git a/_data/navigation.yml b/_data/navigation.yml
index 2cbb546..d912f44 100644
--- a/_data/navigation.yml
+++ b/_data/navigation.yml
@@ -1,17 +1,17 @@
 - title: Blog
-  link: /
+  url: /

 - title: Eleven-Twelve
-  link: https://eleven-twelve.net
+  url: https://eleven-twelve.net

 - title: drwxrxrx.eth
-  link: drwxrxrx.eth
+  url: drwxrxrx.eth

 - title: GitHub
-  link: https://github.com/alxndr
+  url: https://github.com/alxndr

 - title: Instagram
-  link: https://instagram.com/drwxrxrx
+  url: https://instagram.com/drwxrxrx

 - title: Twitter
-  link: https://twitter.com/drwxrxrx
+  url: https://twitter.com/drwxrxrx
```

(If `-S` doesn't find what you're sure should be there, [read up on `-G`](/2017/02/01/how-to-find-the-merge-where-your-code-disappeared.html).)

[blog-git-ignore-dirs]: /2016/04/11/search-Git-history-ignoring-certain-directory.html
