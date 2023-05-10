---
title: how to consistently pay back dependency tech-debt in an Agile environment
tags: [Agile, techdebt, dependencies, software management]
---

_tldr: make a 'recursive' ticket which you continually schedule for future sprints_

#### Given...

* Software which is in-use needs to be maintained.  
* Ignoring maintenance often has little short-term pain and frees up some time but compounds over the long-term, resulting in a specific form of tech-debt.
* No matter the management style (Agile, etc), the Product owners and/or the business's immediate needs are regularly prioritized, despite well-meaning attempts to "pay back" the tech-debt.

_Here is a way to be able to account for necessary-but-ineffable software maintenance in a management style which demands prioritization, thereby allowing the tech team to gradually and regularly pay down tech debt:_

### the [Sisyphus](https://en.wikipedia.org/wiki/Sisyphus) Ticket

The ticket is titled "Upgrade or refactor some dependencies", or something _intentionally slightly vague_ — This is to allow the developer some leeway in deciding what sorts of dependency work they'll tackle, each time the ticket rolls around.

The ticket is scheduled for a regularly-occurring _specific time period_ —  sprint, month, whatever the team is already using — This time period should be regular enough that the ticket doesn't feel unusual, but not so frequent that it gets in the way of other work.

This ticket is actually _many tickets, which are created recursively_{:.style="text-shadow:1px 1px 1px cadetblue"} — part of the Acceptance Criteria is to create a new ticket, ready to be scheduled/refined — This ensures that the pattern continues!
