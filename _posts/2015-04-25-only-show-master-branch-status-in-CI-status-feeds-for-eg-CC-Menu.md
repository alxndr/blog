---
layout:  post
title: only show master branch status in CI status feeds (for e.g. CCMenu)
tags: [build status, ccmenu, travis ci, circle ci, xml feed]
---

[CCMenu](http://ccmenu.org/) is a neat little menu icon which shows the build status of your projects [on Travis CI](http://docs.travis-ci.com/user/cc-menu/), [CircleCI](https://circleci.com/docs/polling-project-status), or many other automated build services.

Sometimes they show the build status of all open PRs, which can often be noisy. I like to limit them to only show the status of the master branch:

For Travis CI, stick [`&branch=master`](https://github.com/travis-ci/travis-api/commit/3f16100247e1baf2be97eb870afb26a542f23fcc) onto [the `cc.xml` URL you're using](http://docs.travis-ci.com/user/cc-menu/).

For Circle CI, [add "master" to the file name](https://circleci.com/docs/polling-project-status) so [the full URL looks like `https://circleci.com/gh/USER/REPO/tree/master.cc.xml?circle-token=TOKEN&ccmenu-hack=cc.xml`](https://circleci.com/docs/polling-project-status).

*Update:* Circle CI rotates tokens. When you notice that all of your builds on Circle are showing gray circles, it's time to get a new token! Go to your [Personal API Tokens page in Circle CI](https://circleci.com/account/api) and click Create New Token to get a new one.
