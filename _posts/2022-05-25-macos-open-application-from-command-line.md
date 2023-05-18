---
title: open Mac application from the command-line
tags: [MacOS, CLI]
---

Today I Learned about the `-a` flag in MacOS's `open` command-line application. It lets you specify the name of an app in `/Applications` (without the `.app` ending), and then opens it!

(well, today I rediscovered it, buried in my command history 😄)

```
$ open -a Preview
```

The `open` command will exit immediately. If you want it to remain running until the other application exits, use `-W`. To pass command-line arguments to the application, stick `--args` at the end and append your flags. It also has some interesting `stdin` `stdout` `stderr` piping options.

This makes it easier to define an alias for opening up a browser with certain flags that you always use!

```
$ alias testbrowser=open -a Google\ Chrome\ Canary --args --disable-web-security
```

Now you'd be able to run `testbrowser` at the command line and have Chrome Canary open up with the `--disable-web-security` flag.
