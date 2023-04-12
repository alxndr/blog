---
title: setting up fancy fonts for vim in iTerm
tags: [vim, iTerm, fonts, powerline, airline, terminal colors]
---

Might need a patched font to get the fancy glyphs, e.g. [Inconsolata for Powerline](https://github.com/Lokaltog/powerline-fonts/tree/master/Inconsolata)

In iTerm:

* use the patched font: Preferences > Profiles > Text > **Regular Font** and **Non-ASCII Font**

* don't make questionable characters doublewidth: uncheck the "Treat ambiguous-width as double width" checkbox at Preferences > Profiles > Text > **Double-Width Characters**

* change terminal name: enter "xterm-256color" in Preferences > Profiles > Terminal > **Report Terminal Type**
