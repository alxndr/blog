---
title: version control commit messages
tags: [standards, communication, version control]
---

Here is how I like to structure my Git branches and commit messages.


## tldr

* `git add --patch` to create small and atomic commits
* `git commit --verbose` to thoroughly explain your changes (never `-m "commit message"`)
* this makes `git bisect` very powerful for code "archaeology"
* Future You will thank Past You


## philosophy

First, some reasons behind my madness...

My primary motivation with caring so much about commit messages is the value I've gotten from referencing well-written commits that others have created. Git comes with [a handy way of searching through history for a commit which introduced some behavior](https://git-scm.com/docs/git-bisect), and once you've identified which commit added a bug, it's _extremely_ helpful when the commit is only changing one (logical) thing and has a thorough explanation of _why_ it's being changed.

Having experienced that several times, I resolved to pay it forward by putting thought into how I create commit messages. Not only will the developers who maintain my code after me be grateful, it benefits myself as well when that person maintaining my two-year-old code happens to be _me_ and I've since completely forgotten the context and inspiration for a particular code change.


## atomic commits

As I hinted in the above section, I like individual commits to stand on their own, with an explanatory commit message.

I like to keep my code tidy, which can mean I'm making a commit just for something "trivial" like modifying whitespace, or changing a variable's name. A change like that will be its own commit, with a message that can be as simple as "tweaking whitespace" or "renaming variable". This allows me to verify that I didn't accidentally modify something unintended while doing what should be a minor refactor.

The most useful tool I've found for encouraging me to create small commits is the `--patch` flag for `git add`. It is related to the `--interactive` feature, which lets you "Add modified contents in the working tree interactively to the [https://git-scm.com/docs/git-add[the manpage](index" )]. The `--patch` feature pares down the full interactive mode into a series of prompts for the unstaged changes in your repository (or a subset of files, if you specify a path(s)). It asks whether or not to add each chunk of local changes to the commit-in-progress. If a chunk of changes includes two conceptually unrelated modifications, it lets you split the chunk into smaller ones, and then asks what you'd like to do for each smaller chunk. Furthermore, if there are unrelated changes within a single line, it can't split the concepts apart for you, but the "manually edit the current hunk" feature will let you (though it can be a little tricky).


## git-flow-esque branching

It can be difficult to identify the larger goal behind many small commits. Thus, I'm a fan of feature branches to group them together and identify the motivation behind all these commits.

On my personal projects I've followed something close to [the "git flow" pattern of branches](http://nvie.com/posts/a-successful-git-branching-model/), in that the `main` branch should always be what's on production, but I haven't been using a `develop` branch. At work, with more collaborators and more development happening simultaneously, we use a `develop` branch to collect what's ready to be released next (which often will only be one branch/ticket anyway).

The GitHub page for an individual commit includes a link to the pull request via which the commit made it into the `main` branch. This lets you figure out the reason for a commit when you've identified that it's responsible for a bug.


## commit messages

The Git software and GitHub site display commit messages in certain ways, so I like to structure my commit messages to work with them. When showing many commits, they tend to show just the first line of each commit message, so I use that line to be a summary of the commit as a whole. Some things truncate this summary at 72 characters, so keeping the summary short is ideal; that said, I try not to sacrifice the intelligibility of the summary in order to fit it into that limit.

After the summary line, you've got all the space you need to express yourself [e.g. with a paragraph!]((https://github.com/alxndr/lyriki/commit/a01056c21db5619e13d282d6e2b524857411b443)). GitHub will render [Markdown](https://guides.github.com/features/mastering-markdown/) in the commit message, so don't be afraid to add [a bulleted list of things you're addressing](https://github.com/alxndr/lyrem-ipsum/commit/b72bf9683ed40824e29c4c063100c37172aa5557) or any [links to other code (read this blog post if you ever link directly to code!!)](https://alxndr.github.io/blog/2016/05/06/linking-to-code-always-use-an-href-which-is-tied-to-a-specific-commit.html), documentation, StackOverflow, or other references you used in the process of changing the code.

If you're using a project management tool or bug tracker, include a reference to the ticket/story/bug in each commit. This could be as simple as "#123" where the ticket/bug ID is 123, but GitHub will think that refers to an issue or pull request in the current repository, and will turn it into a link. Therefore:

* If you're not using GitHub issues as your main issue/bug tracker, it may be more helpful to include the full URL to the ticket/bug.

* If you are using GitHub issues as your issue tracker, in addition to having "#123" turn into a link to the issue/PR, note that [GitHub can close an issue when a commit is merged](https://help.github.com/articles/closing-issues-via-commit-messages/) if the commit message includes a phrase like "resolves #123" [e.g.]((https://github.com/alxndr/lyriki/commit/cf3dc401ca9b2715474a7ef3ad77cbe85e31fb66))

A good habit I've built is to never use the `--message` (aka `-m`) flag of `git add` (which allows you to specify a commit message on the command line), and instead always use the `--verbose` (aka `-v`) flag of `git add`. The `--message` feature seems to encourage you to write a one-line commit message, whereas the `--verbose` flag will open up your favorite text editor, encouraging you to expound upon your changes. From [the manpage](https://git-scm.com/docs/git-add), *emphasis added*:

> "Show unified diff between the HEAD commit and what would be committed at the bottom of the commit message template *to help the user describe the commit by reminding what changes the commit has*. [...] This diff will not be a part of the commit message."

You can further encourage yourself to elucidate in commit messages by creating a custom template for messages. The branching strategy I use means that I can use a [githook](https://git-scm.com/docs/githooks) to build [a git commit template which extracts a meaningful ticket identifier from the branch name](https://github.com/alxndr/dotfiles/blob/619554a025950191510794d739b9e21cd19b2b8e/git-hooks/prepare-commit-msg).
You could also [create a "global" template using the `commit.template` option](https://robots.thoughtbot.com/better-commit-messages-with-a-gitmessage-template) of [`git config`](https://git-scm.com/docs/git-config).

That's all, tell Future You to say thanks to Present You!
