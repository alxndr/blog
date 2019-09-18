---
layout: post
title: ElixirConf US 2015 notes
tags: [elixirconf, elixir, conference, notes]
---

[ElixirConf US 2015](http://elixirconf.com) was October 2–3 in Austin, Texas.


## Bruce Tate: The Pendulum

tech swings back and forth between approaches to problems. batch vs interactive...

* request/response not quite enough... appearance of MVC pattern for local software
  * GUIs...
* scaling on the web follows the same pattern
  * concurrency/isolation are key for future...
    * elixir!


## Chris McCord: What's Next for Phoenix

[The Book is out](https://pragprog.com/book/phoenix/programming-phoenix)!

* Phoenix beyond browser: Channel clients in JS, Swift, ObjC, C#, Java...
* planned for v1.1: gettext, Channel presence
  * gettext internationalization was meant for 1.0, but was trickier than expected
  * channel presence is very much non-trivial on distributed nodes
* look at [GraphQL](https://facebook.github.io/graphql/) for ideas
  * support in views? so instead of having to e.g. `preload: [user: [:profile]]` etc when fetching stuff in your controller
  * can help avoid "controller mayhem" (proliferation of routes for specific data shapes, versioning)
  * specs are defined in the clients, not server...
    * but the server will still do validations, deprecations?
  * *"server side views as just another GraphQL client"*
    * js clients as well as backend template construction could both use it
    * way way down the line, maybe "virtual DOM on the server"
  * why not extend Ecto to do this sort of thing? not out of the question.


## Paul Shoenfelder: Release Management with ExRM and Conform

* OTP apps: well-defined structure, explicit dependencies, useful metadata
* non-release way: dev deps in prod, can't manage multiple apps, need to build things, can't cross-compile...
* what's a release? versioned OTP app dependencies; ERTS; release metadata; configuration; scripts to manage; packaged as tarball
* what's ExRM? extends Relx (Erlang's release tool); provides mix tasks (with lots of hooks), appup generation, intelligent defaults
* configuration is compiled into static info in release (e.g. no dynamic config, can't use get_env)
* schema allows for data transformations (and validations?)


## Alexander Songe: CRDTs: Datatypes for the Apocalypse

"conflict-free datatype"... how to have distributed complex values

* CRDTs are tricky; not many usable libraries
  * not a lot of code, but it has to be precise or you'll corrupt source data
  * need to test a lot, 100% code coverage doesn't count, need to find edge cases
* basis:
  * log-based: read over logs, replay things
  * state-based: easier to reason about, but get big (& therefore hard to manage)
* updates to mutate state
  * updates are commutative, associative, idempotent
  * ...& therefore can be sent over network, will be eventually consistent
    * **as long as everyone eventually communicates**
* types:
  * flags, counters, sets, registers, maps, graphs, documents (huge...)
* examples
  * G-counter: counts up only. distributes values but takes max, so ensures eventually consistent. (can't decrement... have another G-counter for decrements.)
  * G-set: adds items to a set. similar problem for subtracting; solved with ORSWOT operation.
    * (similar but not quite the same as a vector clock)
* wider use of CRDTs... not so much
  * would be super useful in rich clients
  * [Loom](https://github.com/asonge/loom)
* wishlist
  * Gossip protocol independent of project
  * external representation
  * language & library support


## Alan Gardner: Phoenix and Elm

* Elm has Model Update View pattern
  * Update looks somewhat similar to message receiving...
* Elm's Signals: single value that changes over time...
  * this is how Elm "changes state"
* "Elm Architecture"
  * `fold` is where non-pure things can happen
* interop with outside world (Ports?)
  * starting up the app, initial state takes `inputs`
  * `init` and `update` need to account for `Effects`
* hooking Elm up to Phoenix...
  * could run separately, old standard way of doing it...
  * could compile and add as vendored JS...
  * but you **could embed Elm app into Phoenix** and use brunch to compile
    * `web/elm/` (not in `static/`)
    * [`elm-brunch` plugin](https://github.com/madsflensted/elm-brunch)
      * actually start it up with some regular old `app.js`
* Elm Ports... how outside world can interact with Elm
  * (not the same as erlang ports)
  * takes a JS data structure & constructs Elm-ish signature for it
  * need to explicitly map incoming data to (curried) `Action` s
    * and that becomes one of the `inputs`


## Bryan Joseph: Elixir Beyond the Browser

[ElixirScript](https://github.com/bryanjos/elixirscript)!

* goals
  * full or subset of Elixir into ES2015
  * complement elixir backends*
  * idiomatic Elixir
* ESTree
  * including a thing that builds JS from Elixir code
* ElixirScript: made of Compiler (in Elixir) and Runtime (in JS)
  * Compiler
    * value translation uses `Symbol`, custom things for binaries
    * use `Patterns` for "multiple" function defs/guards/destructuring params
    * uses JS modules (but scope isn't same as in Elixir...)
    * some current limitations: scopes, `quote`, `::`, pattern-matching `<< >>`
  * Runtime
    * most of the stdlib defined here
    * also some features for compiling (e.g. pattern matching)
* how to "embrace the environment"
  * interop with JS
* demos...
  * reimplementation of React API!
  * running in an iOS app!


## Jessica Kerr: Elixir Should Take Over the World

* the March of Scientific Progress is presented as viewed through rose-tinted glasses...
  * _The Structure of Scientific Revolutions_ by Thomas S Kuhn, read it... coined "paradigm"
* "Ideas are shared. Ideas keep coming. Ideas are shared."
  * when the groundwork is laid for a "new idea", many people will independently have it...
* good recent talks at StrangeLoop 2015:
  * [Camille Fournier's Hopelessness and Confidence in Distributed Systems Design](http://www.slideshare.net/CamilleFournier1/hopelessness-and-confidence-in-distributed-systems-design)
  * [Caitie McCaffrey's Building Scalable Stateful Services](https://www.youtube.com/watch?v=H0i_bXKwujQ)
* circular dependencies are painful; neither pure functional nor object-oriented approaches are quite right...
* the way to success is more failures, and learn from them. "failure is the common case"
  * if you learn from the failures, they become part of the eventual succes
* what's next? (opinions...)
  * after agile? lean. learn, build, measure, learn, build... (in theory that's the scientific method, but scientists like proving their own points)
  * after no estimates? time ranges. wider range means more unknowns... at the end, "is it still worth it to do more of this?"
  * after scientific method? Brené Brown looks at human systems, "grounded theory" data, categories, theory, data, categories...
  * after MVC? Elm architecture...
  * after REST? GraphQL... maybe with backend-sourced events, channels...
  * after microservices? better organized microservices.
    * ...microservices can easily end up circularly-dependent.
    * while working on your new thing, it'll end up being more complex than you think, but if you wrapped everything in a nice API then from the outside world it'll look sane
* it takes lots of people (especially skill levels) to make progress
  * "Science advances one funeral at a time" —Max Planck
  * "we need people who don't think like us"
  * smooth the stairs into a ramp!
* big moustachioed Banana for Jim!


## José Valim: State of the Language

* what's coming: extensibility: web infrastructure; embedded systems; financial/video platforms; GUIs
* just out: v1.1
  * handy new functions!
  * ExUnit: can capture calls to `Logger`, will print on failures; `@tag :not_implemented`; line numbers in doctests fixed
  * Mix: `profile.fprof`
  * `@callback` instead of `defcallback`; `@typedoc`
  * deprecations... `Access` protocol (implementation became a bottleneck when protocols not compiled)
* v1.2
  * gonna be Erlang >=18 only
  * multi-aliases `alias MyApp.{Foo, Bar, Baz}`
* v1.3? just ideas here...
  * `GenRouter`: separate process, multi-in/multi-out
    * adds supervision to stream-like things
    * source-driven, provides backpressure by default
    * inspired by Akka Streams


## Lennart Fridén: Virtually Instructional

* can compile elixir into Erlantg assembly: `ERL_COMPILER_OPTIONS="'S'" elixirc file.ex`
* but Erlang functions get transformed by BEAM... so we'd need to look at a running system
  * `:erts_debug.df MyApp` creates a .
    * the function names end with their params' type signature...
* BEAM is register-based, unlike JAM, which was stack-based
  * bunch of functions will say how many registers are "active" (shouldn't be GC'd?)
  * different types of registers... general, float, temporary, local vars
* BEAM's "assembly" is weird!


## Steven Proctor: BEAMing with Joy

* the Scheduler... is awesome. one per CPU. expensive to start up, so they stay up
* monitoring
  * `observer.start()`
  * erlang's `c` module if you don't have a GUI...
    * `c.regs/0` is all registered processes/ports
    * `c.i/0`, bunch of other info...
    * `c.i/3` pass in your process info and get info about just that process
    * `:c.bt/1` to look at backtrace of a `:c.pid/3`
* types... strongly-held small set of types, also dynamic if you want it
  * elixir: optional typing using `@spec`
* [TypEr (pdf)](http://user.it.uu.se/~tobiasl/publications/typer.pdf) adds type annotations to source code?
* testing
  * Property testing: QuickCheck (not free), also PropEr
  * Concurrency testing: [Concuerror](https://github.com/parapluu/Concuerror)


## Nick DeMonner: OTP Has Done It

* your technical problems aren't unique... "we need to get over our reinvention addiction"
  * don't keep using abstractions that aren't useful!
* supervisors
  * children are stopped in reverse of start order
* (intro to all the `gen_*` things)


## Ben Wilson: Streams, External Services, and OTP

* `StreamRunner` by James Fish
  * makes an enumerable thing out of external service
* but what about backpressure? `StreamRouter`
* `Collectable`


## James Smith: Interoperability in Elixir

* can interop using JInterface, NIFs, and...
* ports
  * wraps an external thing, passes messages to it, passes messages out to the owning erlang process
  * `Port.open/2`, tons of options, docs pretty good
  * ETF External Term Format to convert any data into a binary format `data == :erlang_binary_to_term(:erlang.term_to_binary(data))`
  * can use stdin or also arbitrary file descriptors


## Drew Olson: Composable Queries with Ecto

* separate construction of query from execution... `query = from(...); Repo.all(query)`
  * "the query itself is data" "very explicitly decoupled from [the Repo]"
* Query Expression syntax... pull the keywords out into functions. `query = where(Post, [p], p.published == true)`
* both syntaxes are composable! `query2 = from(c in query, where: c.votes > 5)`
* "Query Pipelines"... inventing vocab for wrapping query expressions in nicely-named functions, then piping them together
  * "query source" the data source, e.g. a whole table
  * transformation modifies an existing query
  * sink executes query, returns result
