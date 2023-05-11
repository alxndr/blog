---
title: how to consistently pay back dependency tech-debt in an Agile environment
tags: [Agile, techdebt, dependencies, software management]
---

_tldr: make a 'recursive' ticket which you continually schedule for future sprints… Product will hate it initially, but will love it eventually_

#### Given...

* Software which is in-use needs to be maintained.  
* Ignoring maintenance often has little short-term pain and frees up some time but compounds over the long-term, resulting in a specific form of tech-debt.
* No matter the management style (Agile, etc), the Product owners and/or the business's immediate needs are regularly prioritized, despite well-meaning attempts to "pay back" the tech-debt.

_Here is a way to be able to account for necessary-but-ineffable software maintenance in a management style which demands prioritization, thereby allowing the tech team to gradually and regularly pay down tech debt:_

### the [Sisyphus](https://en.wikipedia.org/wiki/Sisyphus) Ticket

The ticket is titled "Upgrade or refactor some dependencies", or something _intentionally slightly vague_{:style="text-shadow:1px 1px 1px red"} — This is to allow the developer some leeway in deciding what sorts of dependency work they'll tackle, each time the ticket rolls around.

The ticket is scheduled for a regularly-occurring _specific time period_{:style="text-shadow:1px 1px 1px orange"} —  sprint, month, whatever the team is already using — This time period should be regular enough that the ticket doesn't feel unusual, but not so frequent that it gets in the way of other work.

This ticket is actually _many tickets, which are created recursively_{:style="text-shadow:1px 1px 1px magenta"} — part of the Acceptance Criteria is to create a new ticket, ready to be scheduled/refined — This ensures that the pattern continues!

-------

After seeing several dependency-laden codebases (using e.g. NodeJS, or Ruby on Rails) become brittle as their developers are not able to upgrade the scaffolding of the application, and witnessing the same pattern happen with different leaders and team members and management styles and team structures, I was looking for a way to have the Product team(s) recognize the notion of "expected maintenance". In order for it to be useful in a variety of situations, the form of this expected maintenance has to fit however the Product team wants to manage, so in my case it took the form of a never-ending series of Jira tickets.

Normally a developer would hate the idea of an infinite sequence of tickets, but this is essentially free time for the developer to tackle whatever tech debt they see fit to tackle. I like to have these tickets rotate between the developers, so that everyone gets a chance to scratch whatever itch was bothering them lately.

Really, this dripping tap of work is an accurate reflection of _maintenance costs_ and should scare the Product team more than anyone else! It's the cost of doing business with any codebase, no matter how many dependencies there are — there should always be periodic maintenance, to clear out the cobwebs and grease the wheels and upgrade the latches.

This pattern has been successful for two years and counting, on a high-importance internal project which therefore has lots of Product and Leadership attention (and therefore is more likely to have techdebt de-prioritized!), allowing the team to keep all but two (!) dependencies on the major version (in a modern NodeJS project with extensive unit and integration tests).
