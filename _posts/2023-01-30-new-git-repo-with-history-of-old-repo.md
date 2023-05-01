---
title: creating a new Git repo based on the history of an old one
tags: [git]
---

Following [this how-to by Nassos Michas](https://itnext.io/git-repository-transfer-keeping-all-history-670fe04cd5e4)...

tldr:

* create a new blank repo, e.g. via GitHub ux
* `git clone --mirror old-repo-URL new-repo-name` note URL of old repo, but name of new one
* change remote to URL of _new_ repo: `cd new-repo-name && git remote set-url origin new-repo-URL`
* `git push` this will take a while, and may show errors...
* `cd .. && rm -rf ./new-repo-name` because we need to clone it fresh (not as a mirror)...
* `git clone new-repo-URL && cd new-repo-name` the clone may take a while

The new repo on GitHub will need to have its default branch set.
