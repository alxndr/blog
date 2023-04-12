---
title: notes — Erlang Factory 2015
tags: [notes, erlang factory, conference, elixir]
---

## José: What Elixir Is About

* not the syntax
* Extensibility
  *  "Data type pm'phism" not possible in erlang
    * processes: send a message. sorta-pm'phic... (sorta duck-typed in that it accepts a message)
    * modules: calling a function... same. obey a contract
    * data: not so much. but in Elixir: `defprotocol`! then `defimpl Module, for: Type`
      * Elixir's Enumerable protocol... stream... so anything in the future could be lazy-parsed
      *  Elixir's Inspect protocol... this is how everything is nice and readable in iex
* Productivity
  * mix
  * hex... some integration with rebar in the future?
  * docs
* Compatibility
  * OTP: GenServer, GenEvent are untouched
    * but because GenServer is generic, hard to understand what a specific one is doing. could be just computing, could be just holding state...
      * just computing? use Elixir Task
        * this revealed patterns: async/await, distributed work w/Task.Supervisor
      * just holding state? use Elixir Agent. provides a nice state API
        * which means can implement some determinism... Agent.Lattices... data replication with guarantees
* Parallelism
  * laziness
  * pipeline parallelism: inject Stream.async() into a lazy chain and it can use other processes to calculate
  * data parallelism
  * challenges: what's most efficient way of pm'phic dispatch? effective way of implementing caches? backpressure? sharing data?

## Erik Meadows-Jönsson: Hex

* mix: task runner. generate, compile, run tests, fetch dependencies
  * define a Project. versioning, dependencies
* hex: install separately (may be bundled in future) but do stuff via mix
  * installed as code archive (.ez): zipped .beam & .app files. erlang can code-load. auto-loaded by mix
  * "remote converger" called by converger... which is used by deps.get
    * converger: traverses deps tree, tries to merge same apps, reports error to user, put in dependency-based order
    * remote:
      * updates registry (ETS file) which is mapping of all apps & versions which are deps, plus their deps
        * ...registry format is inefficient; should change in future
      * actually does the fetching
    * Hex.pm site
      * hexdocs.pm hosts docs, generate em with ExDocs: `mix hex.docs`
* escripts: executable binaries made from erlang
  * can install from git or hex.pm... (in elixir 1.1?)
* erlang tooling
  * rebar3; otp pkg mgr

## Thomas Arts: QuickCheck

* testing is boring...
* `use EQC.ExUnit` gives you a `property "desc", do: forall {vars} <- {varTypes}, do: test(vars) end end`
  * varTypes are type "generators"
  * "shrinks" to find smallest test case that fails
  * generating something specific, like a sequence: `EQC.StateM`. defines an api for how to begin, generate elements, verify them
* CONCURRENCY! `run_parallel_commands`
  * ...wow

## Bruce Tate: making testing nice (...with ShouldI, and Blacksmith)

* coverage: https://github.com/parroty/excoveralls
  * can show you covered lines... everything should be covered.
* more of a testing DSL: https://github.com/batate/shouldi
  * basics: `should`, (nested) setup/teardown
  * `step` for longer integration tests... (or is this part of blacksmith)
* data generation: https://github.com/batate/blacksmith
  * like FactoryGirl
* concurrency...
* something about unique ids

## Jamie Winsor: MMORPG in Elixir

* don't be afraid to contract out
* don't hire maybes
  * look for IQ & EQ & Personality, all are important
* use OS
* is Elixir risky? not really... has 2-way interop w/erlang. "fixes" erlang syntax, tooling, packaging.
* building stuff:
  * protocol layer first
* sharding... buckets are postgres schemas. ...uh what
  * "route server" to have more than 100 nodes talking to each other
  * deterministic routing: knowing what shard a message goes to. using postgres functions to create unique ids... uh what
  * randomly determinstic routing: uhhhh tina-belcher.gif
  * discovery... partially enabled by erlang's architecture
* different servers for different functions: "world" vs "in-combat"

## Garrett Smith: Erlang patterns

* C Alexander: seeking "quality w/o a name" (...名可各非常名)
  * in the foreword to Software Patterns he actually basically says he's skeptical whether software has that nameless quality
    * ...but programmers know it's there
  * this is an attempt at Alexandrian approach to patterns
* creating a pattern
  * needs a name first. good name, but first just name it
  * why pattern is good
  * where it should be used
* acceptance criteria for being a pattern
  * used somewhere
  * used enough to feel how it is to use it
  * feels good to use
* possible types of patterns in erlang
  * OTP constructs
  * function types
  * process/behavior types
  * app-level facilities
  * distributed stuff
  * principles ...?
* examples!
* Supervisor, an OTP construct. recover from crashes! use when you need fault toleance.
* Message Handler, a function type. "callback" used when you receive a message. helps with boilerplate for handling messages...?
* Task, a process/behavior type. process which is expected to stop after doing something. good for performing quick autonomous work
* Cleanup Crew, an app-level facility. process which cleans up after other(s). removes cleanup burden from other tasks
* Crash By Default, a principle. "fail fast" too general... don't handle errors. (what about APIs??) good bc simplifies code.
* <http://erlangpatterns.org> <https://github.com/gar1t/erlang-patterns>
* antipatterns?

## Ransom Richardson: Erlang in the Cloud

* expect it to crash
  * ...need more than one instances, obv. AZes too. enough to absolb failures and resultant load spikes
* erld: makes the erlang vm seem like a unix daemon, supports heartbeats
* deployment: either upgrade existing server instances, or deploy all new ones. new: easy to rollback to still-running old ones. makes sure deployment is repeatable.
* replaced redis w/custom server, was simpler and faster (but redis driver for erlang is just really slow)
* AWS Lambda is interesting...

## Joseph Blomstedt: Data Structures

* bt: erlang tree data structure
* orddict: tree structure with leaves holding up to 3 values
* bt_nif: slow on 10 mil entries, but it can do it!

## Iñaki Garay: Training

* community is small; finding experienced erlangers is hard
* right candidates; apprenticeship; clear guidelines; good tooling
* <https://github.com/inaka/elvis>
* having a toy project is very helpful. use as learning sandbox... fundamental principles, concurrency, OTP, other libraries, up to deployment

## Louis-Philippe Gauthier: Debugging Complex Systems

* need to understand the system... stack: OS, VM, application, protocols, external services... tools (experiment begore you need them!)... requirements: is this really a bug?
* reproduce the bug. find conditions, try locally, try prod
* collect data... see if it's a known bug. filter out data noise.
* process of elimination / divide and conquer. macro observations: all servers affected? data centers? external services? (if multiple bugs, one might be hiding another...)
* change 1 thing at a time, don't take shortcuts. keep audit trail: postmortems, collaboration, learning.
  * tip: deploy different branches to different boxes!
* verify your assumptions! code deployed? VM version? configs? tools lying? (check your audit trail...)
* take a step back. sleep on it, ask co-worker, ask expert
* validate fix. found root cause? maybe roll out slowly.
  * regression tests are good
* tools
  * erlang's shell, can log in remotely
    * `ets:i()`? can also easily spin up interval checks for process info... (`observer:start()`...)
  * loggers. Lager
  * metrics collection... lots of em
  * crash dump... `observer` is friendly
  * profilers... `eflame`, lots of others
  * system monitoring stuff
