---
title: linking to code? always use an href which is tied to a specific commit
tags: [version control, future-proofing, documentation]
---

*tl;dr* _Don't_ use links like `github.com/owner/repo/blob/master/file.ext#L13` because that branch _will_ change! Use `github.com/owner/repo/blob/COMMIT_SHA/file.ext#L13` and be _future-proof_.

---

Are you creating a link to a specific line of code, or a particular file in a code repository? _That file may change or move in the future_ which means your link *will eventually be worthless*: the file you're referring to can be edited which means your link will highlight the *wrong* line of code, or the whole file itself could move or be renamed which means your link will *be a 404 error*!

You're in luck: it's very easy to avoid this problem. Find the most recent commit in that repository, and link to the file/line using the SHA from that commit. The commit itself (should!) never change, so even if your line of code gets _deleted_ in the future, your link will still work and will still highlight the correct code.

The way I do this on GitHub is to visit the project's root page (e.g. [github.com/alxndr/lyriki](http://github.com/alxndr/lyriki)). Just above the list of files on that page, there's a row which shows the most recent commit (e.g. at time of writing `@alxndr bump patch version, Latest commit 82ff021 5 days ago`). Both the commit message and the SHA there are links to that commit's page (e.g. [github.com/alxndr/lyriki/commit/82ff0210...](https://github.com/alxndr/lyriki/commit/82ff0210da03760b530ecafb640f78efc83c3a02)); visit that page and then click the "Browse files" button on the right-hand side of the commit message header. You'll be taken to a page which looks like the project's root page (e.g. [github.com/alxndr/lyriki/tree/82ff0210...](https://github.com/alxndr/lyriki/tree/82ff0210da03760b530ecafb640f78efc83c3a02)), but now you're looking at the repo at a specific point in time instead of whatever is most recent; notice that the URL includes "tree/COMMIT_SHA/..." (if you're at a directory) or "blob/COMMIT_SHA/..." (if you're at a file).

Now you can click through to find your target file (or use the `t` shortcut to fuzzy-find it), and notice that the URL for the file also includes "blob/COMMIT_SHA/...". That URL will continue to work and show this file, even if the file is renamed, moved, or deleted in the repository's future. _Magic!_

(This does not, however, protect against the repository itself being deleted; if you're worried about that, clone the repo and link to your fork. It also doesn't protect against GitHub going away; if you're worried about that, I dunno what to tell you.)

(Anyone know if this is possible with [Mozilla's Kuma](https://github.com/mozilla/kuma), the wiki which powers the [MDN](https://developer.mozilla.org/en-US/) site?)
