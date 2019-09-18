---
layout: post
title: notes for npmCamp 2016
tags: [notes, npm, conference, npmCamp]
---

## Isaac Schlueter

* history of npm
  * node.js had no sharing story; turned a bash script into a node project & sent package.json PRs to repos
  * it becoming a thing that pros ~2013 used was a dramatic change; SCALING
* semver
  * "not magic, not math… still pretty good. shared vocabulary is useful"
* don’t really know what’s next… bad at predicting the future


## Wolf Rentzsch: demo of tonicdev.com

* use node packages in browser
  * can share "notebooks"
  * visualize everything… urls, binaries, regexes, geo…
  * notebooks can be reused, idempotent installation — not like how npm works by default
  * timestamps all packages when they’re downloaded… like running shrinkwrap all the time
  * …they download _all versions of all packages in realtime_…


## Steve Kinney: Ins & Outs of Publishing to NPM

* turing.io, 7-month-long code school in CO
* walkthrough of npm init
* can note which node versions a package specifically support
* write source in whatever lang you want (TS, CS, ES2015…) but publish in Plain JS so everyone can use it (e.g. use babel)
  * create a build script… set it up on prepublish hook
* `npm version` will make git tags for you


## Kassandra Perch: npm + nodebots

* why do we code? for work; to learn; for fun.
  * learning & fun -> side projects. "[devs] need side projects, code or otherwise, to continue to survive"
* npm is intentionally diverse
* "destroy your idols"
  * "we do not need horrible people that happen to write good code in our communities"


## Sara Itani: Node + MSFT

* historically node doesn’t work so great on Windows…
  * they’re improving it
* x-platform Visual Studio with smart completion, navigation, debugger w/time travel


## Andre Arko, Steve Klabnik, Samuel Giddins: panel about package Managers

* Cargo was built before Rust hit 1.0, meant that lots of features could be in packages not core
* Cargo always has repeatable builds (unlike npm by default)


## Marcy Sutton: a11y testing w/aXe

* folks w/ disabilities are 1/5 of the web
* modernize & automate a11y testing… bring it into the future
  * tests can document intended a11y functionality
  * can’t automate screenreaders yet
* [axe-core](https://www.npmjs.com/package/axe-core)
* (Q: if Amazon has so many of the basic things wrong, how do folks manage to use it??)


## Iheanyi Ekechukwu: Ember + Devops

* "DevOps"…
  * provisioning, versioning
  * automation
* ember-cli-deploy is a plugin… lifecycle hooks


## Kate Hudson: frontend dev & npm3

* users have very different ideas of what "reliable", "intuitive", etc means
* in-browser JS doesn’t (yet) have niceties for loading modules like node does
  * node has built-in `require`… but no standard for browsers
  * loading modules is cheap on node; not via network
* npm3 optimizes for maximally flat dependency tree
* npm dedupe can recognize potential version consolidation
* writing a plugin? specify node version ranges, not a specific verison


## Andrew Goode: automating semver

* structured commit messages
  * add structure on squash-and-merge of feature branch
  * structure can be using keywords like `feat:`, `fix:`
* <https://www.npmjs.com/package/standard-version>
  * replacement of `npm version`
  * bumps versions, creates changelog


## Steph Snopek & Kiera Manion-Fischer: npm support

* official npm support exists… support@npmjs.com, [@npm_support](http://twitter.com/npm_support)
* enterprise customers can get video call support
* socks for docs… open a PR to the docs and they’ll send you some npm socks


## Stephan Bönnemann: managing deps w/ Greenkeeper

* greenkeeper is `npm updated` as a service. they do support enterprise npm
* also wrote npm.im/semantic-release
* doesn’t have to create PRs to see if it passes tests, even if update is outside of pinned range
* one-click enabling app.greenkeeper.io


## Sharon Steed: empathetic communication

* communication is supposed to be empathetic
* "empathy fuels connection" –Brené Brown
  * ∴ empathetic communication drives collaboration
* "failures of communication cannot be automated away"
* "collaboration fails because 1) people are afraid of being wrong 2) people are afraid of being misunderstood"


## Daijiro Wachi: global OSS development

* time zones… 10 min face to face can be >1 day across the globe
* reproduce the issue, use same environment (node, npm, platform)


## February Keeney: towards inclusive community

* diversity alone is not enough… need to be safe as well
* harassment types: blatant vs microaggression
  * blatant gets banhammer
  * micro gets coaching. focus on how actions affect others, not on individual instigating


## Kat Marchán (npm cli): state of the CLI

* npm3
  * been out for a year; default w/node v6
  * fancy new progress bar
* stabilizing
  * windows support; shinkwrap issues; monthly releases
* triaging
  * every day; new contributors; want to help? ...don't email forrest
* product
  * cli is the FOSS arm of npm Inc
  * new login features; opt-in analytics


## CJ Silverio: design patterns in the npm registry

* "the process of writing software is abstraction & pattern extraction"
* the registry is "medium data" fits on a single disk but not in memory
* "modularity" term comes from a 1972 paper
  * "hide info behind an interface so you can change it"
  * <http://dl.acm.org/citation.cfm?id=361623>
* how do design patterns promote modularity?
* patterns…
  * monoliths: everything in 1 process
    * easy to write & change
    * perf is okay
    * easy to write coupled code
  * microservices
    * forces you to design an API
    * easy to mess up API design; unintentional coupling & unruly side effects
  * transaction log: "what every software engineer should know about realtime data’s unifying abstraction" —LinkedIn
    * consumers do One Thing Well
  * messages/workers… (Erlang??)
    * do things independently
    * can scale
    * can crash
* none of these patterns are Right; "it’s tradeoffs all the way down"
  * what problem are you trying to solve? what tools?
* you can change systems and patterns!
