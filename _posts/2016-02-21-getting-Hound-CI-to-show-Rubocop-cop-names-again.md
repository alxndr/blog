---
layout: post
title: getting Hound-CI to show Rubocop "cop names" again
tags: [static analysis, continuous integration]
---

Thoughtbot's Hound-CI service runs Rubocop on Ruby projects. It had a setting to show the name of the "cop" (style rule) that failed, which made it easier to look up the options for that specific rule.

At some point, the way that was configured changed. Now instead of putting `ShowCopNames: true` in the `rubocop.yml` file, it's gotta be something like this:

```
AllCops:
  DisplayCopNames: true
```
