---
title: "entr: watch some files, and run something whenever they change"
tags: [CLI]
excerpt: I keep forgetting what this tool is called…
redirect_from:
- /2015/04/15/watch-some-files-and-run-something-whenever-they-change.html
---

For the next time I forget what this tool is called…

<big><big>[`entr`](entrproject.org)</big></big> ("event notify test runner") is a neat little tool that monitors files and runs a command when they change.

You can hit space to re-run the command even when the watched files haven't changed, and exit by hitting `q` or `Ctrl-C`.

I've been using it for over a decade now, and decided it's worth documenting why!


## basic use case

Run a test file whenever a source file changes!

```
$ find . -name '*.ex' -o -name '*.exs' | entr mix test
```

This looks for all the files in any subdirectories that end in `.ex` or `exs`, and runs `mix test` when any of them changes.


## running multiple commands piped or chained together

Trying to run multiple commands using `|` or `;` or `&&` or `||` will not work as expected, because those character sequences get interpreted by the shell first. Instead, reach for the `-s` flag:

```
$ ls package*.json | entr -crs 'npm install && npm start'
```

...to watch the `package.json` _and_ `package-lock.json` files in the current directory, and then `npm install` and `npm start` when they change.

* list the filenames to watch and pipe them to `entr`'s stdin
* the `-c` flag 'clears' the screen before running the command (but preserves the output too so you can still scroll up and read it!)
* the `-r` flag indicates the command is long-running and won't exit (e.g. it's a server process or a daemon)
* `-s <command-string>` allows passing a string for the command to run, which means it can contain semicolons / ampersands / pipes 


## echo or use the modified filepath

...the string `/_` within the command will be replaced with the first filepath which triggers the command, e.g.:

```
find . -name '*' | entr echo modified: /_
```

Running that and then editing a file in that directory will log out the name of the just-edited file.

### combining `/_` with the `-s` flag

In order to get the modified filepath into a complex `-s <command-string>` use the param `$0` within the command string.

```
find . -name '*' | entr -s 'echo modified: $0'
```


## gotchas

Note that if you use a [glob](https://en.wikipedia.org/wiki/Glob_(programming)) to select files and then watch them with `entr`, and _then_ you add a new file which should match that glob, the file creation and later edits of the file will _not_ trigger the `entr` command, because the new file was not present when the glob was evaluated. Using the `-d` flag might help remind you of this; the `-d` flag will exit `entr` when a new file shows up in any of the directories it is watching.


## links

* [`entr` home page](entrproject.org) including [contents of the manpage docs](https://eradman.com/entrproject/entr.1.html)
* [Jonathan Paladry's blog page about `entr`](https://blog.jpalardy.com/posts/entr-the-standalone-file-watcher/)


[entrproject.org]: https://entrproject.org
