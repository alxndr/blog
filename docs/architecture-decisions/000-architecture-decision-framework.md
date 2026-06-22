# 000 — adopt a framework for capturing architecture decisions

**Date:** 2026-06-22

**Status:** Implemented


### Context

I'm using AI coding assistants to increase my solo-coding leverage across projects, including in this Blog site/repo.

I want to provide AI assistants with useful context, including the history of a build and what the important factors are that go into the build process.

I feel that capturing the decisions will be a helpful resource both for me in the future and for AI assistants which do not come with the historical context as part of their memory the same way my human memory works.


### Decision

Keep track of important decisions and the context around them. They will be in easily-readable Markdown files, in an obviously-named part of the repo: `./docs/architecture-decisions/`

The format will be very basic to start with, so I don't get bogged down in process. The important parts so far are:

* a **numbering scheme**
* a **Date** (not necessarily matching the order of the numbering scheme, if decisions were made in the past but are getting documented later)
* a **Status**
* a **Context** section
* a **Decision** section

More sections may be added in the future.
