---
title: getting started with Spacemacs
tags: [spacemacs, emacs, vim, vi]
---

Are you a vi/vim user who's been hearing about how wonderful/useful/fast Spacemacs can be? Here is an evolving list of pointers for folks beginning to use this crazy new blend of editors...

(First: have you read the [`VIMUSERS` doc](https://github.com/syl20bnr/spacemacs/blob/074f425dc5d233f24195ecc3021eb96ac9d55d4d/doc/VIMUSERS.org#purpose-of-this-document)? You should. Go do that, then come back and start reading this.)

Heads up: Spacemacs takes over `~/.emacs.d`, don't mess with it. Your editor configuration file is now `~/.spacemacs`. `SPC f e d` to edit your config, and once it's saved `SPC f e R` to reload it and begin using it.

The space bar is now your leader key. It's also sorta like the colon `:` to start an ex command from Normal mode... it's where pretty much all the functionality is accessible.

The Spacemacs repository's `DOCUMENTATION.org` file is much more comprehensive than the `README`. [Here it is at the time of writing](https://github.com/syl20bnr/spacemacs/blob/d555002308e7ce86161d3d7998e42cdcc5a9800d/doc/DOCUMENTATION.org); look for a more recent one... [Ian McCowan's post about creating Spacemacs](http://ian.mccowan.space/2015/04/07/Spacemacs/) is a valuable intro as well, but beware that some of the key combos may have changed since it was written.

Buffers don't correspond to files...

The Meta key is still Escape? [`(setq mac-option-modifier 'meta)`](https://www.reddit.com/r/emacs/comments/333ywx/did_anyone_else_go_wow_after_trying_spacemacs/cqj97zy) or use the OSX package which puts it under the Option key.

At the time of writing, [the recommended port for OS X](https://github.com/railwaycat/homebrew-emacsmacport) has full mouse support, including scrolling — which is pixel-based, not character-based. Seeing that when I didn't expect it was shocking enough that I felt the need to warn you.



### discovering things

Learning how to learn is the first step to learning...

`SPC h d f` (i.e. "help describe function") will bring up another fuzzy-searchable list of functions, and when you select one it'll pop open a buffer describing it and any keybindings for it.

`SPC h d v` (i.e. "help describe variable") brings up a similar list for variables.

Just type `SPC h d` and wait, a buffer appears with suggested completions. `SPC h d k` (i.e. "help describe key") prompts for another command sequence, and will pop up a buffer describing whatever it maps to. Try it on itself: type `SPC h d k`, and I see a prompt `Describe key (or click or menu item):` (I'm using the OS X GUI version; yours may be different) and then if I type `SPC h d k` again, the buffer opens explaining a little about the command `spacemacs/describe-key`.

`SPC ?` brings up a fuzzy-searchable list of functions, which you can run by hitting Enter.



### shells

I do a lot of work in a dedicated shell as well as my editor. To open a shell: `SPC :` is like hitting `:` to get into vim's Ex command line, but includes a fuzzy-searcher for the command (`M-x` in normal Emacs). Then type "shell" or "ansi-term" or "eshell" [depending on what you want](https://www.masteringemacs.org/article/running-shells-in-emacs-overview). "ansi-term" will ask you what shell you want to run, so that's how I get into zsh.



### finding files, changing directories

`SPC f f` to bring up a [buffer? window?] which finds directories or files (not fuzzy-searching though; see below for that). It begins in the current working directory, but `BS` (that's the backspace key, aka "regular delete", the one which goes left) in there will go up a directory. Change the selected entry with the arrow keys.

Create new files with `SPC f f` as well: type out a path that doesn't exist and hit enter, it'll ask if you want to create an empty file there.

`SPC p f` to fuzzy-search for files in the current project. In result list, `RET` opens the file, `C-c o` opens it in a new window (split).

[NeoTree](https://github.com/jaypei/emacs-neotree) is a NerdTree-like plugin; `SPC f t` opens the sidebar in the directory of the file you're currently editing, and `SPC p t` opens into the current project's root directory. `hjkl` to move around, `K` to move up directories, `RET` opens a file like you'd expect, vertical pipe `|` to open a file in a new vertical split, and hyphen `-` for a horizontal split.



### splits

Splits are called "windows". `SPC w /` to create a split/window to the right; `SPC w -` to create a split/window to the bottom. Navigating between windows can be done with `SPC w <direction>` or `C-w <direction>`, where direction is one of `hjkl` (and that `C-w` means to hold down control and then push `w`).

Once, something I did ended up removing all my splits, as if I had ran `:only`. Turns out restoring my splits is just a `SPC w u` away (thanks [winner mode](http://emacswiki.org/emacs/WinnerMode)).

I've been using [vim-bbye](https://github.com/moll/vim-bbye) to be able to kill a buffer (aka close a file) without losing the split that the buffer's in; in Spacemacs use `SPC b d` ("buffer delete") to `kill-this-buffer`. Closing a window can be done with `:q` like a good little vim emulation, or `SPC w c` ("window close").



### line wrapping

...is called line truncation. `SPC t l` to toggle line truncation.



### visible whitespace

All whitespace in the current window can be made visible or invisible with the `SPC t w` combo. Toggle for everything with `SPC t C-w` (that's space, then the letter `t`, then hold down control and press the letter `w`).



### key mappings

Haven't really gotten that far yet... turns out everything's already got a space-based shortcut, which I've been able to put up with...



#### chords

I'm now very accustomed to having both `jk` and `kj` in quick succession change to Normal node from Insert mode, but Emacs doesn't do the "wait and see if this will be a combo" thing that vim does. However Spacemacs includes the [evil-escape](https://github.com/syl20bnr/evil-escape) package, so I just needed to add `(setq-default evil-escape-key-sequence "jk")` to the `dotspacemacs/layers` function.

For more customizable combos than just exiting insert mode, there's a plugin called "keychord.el" which I haven't yet looked at.



### git, via Magit

[Magit](https://github.com/magit/magit) is an Emacs interface to Git. It sounds like it doesn't *hide* any of the complexity of Git, so if you're not already comfortable with it on the command line, Magit probably isn't going to be helpful...

* See a diff of the current file with `SPC g d`.
* Look at the overall project status with `SPC g s`, then:
  *  open/close diffs of files in there with `TAB`
  * `s` will stage a file (or hunk) and `u` will unstage
  * `c` to bring up the commit menu (you can do interactive-type stuff here)
  * `?` to show you what else you can do (pulling, pushing, tagging, reverting, bisecting, oh my)
  * Once you've settled on a commit message, *actually* commit by hitting `C-c C-c` (yes that's control-and-lowercase-c, twice in a row; is there a smoother way to do that?)

Close these Magit windows with a bare press of `q`.

Some potentially helpful links: [An introduction to Magit, an Emacs mode for Git](https://www.masteringemacs.org/article/introduction-magit-emacs-mode-git), [the Magit user manual](https://github.com/magit/magit/blob/a83f9303be806dd2e793cd7207926f0fc8dd8146/Documentation/magit.org) (look for a more up-to-date version!).



### "tabs"

[Perspective](https://github.com/nex3/perspective-el) "provides tagged workspaces". [Add it to `dotspacemacs-configuration-layers`](https://github.com/alxndr/dotfiles/commit/ff925be53193f0c820c82f116f3ec4dea55e8a0d), then `SPC L s` to switch between workspaces or create a new one; [rest of the bindings are here](https://github.com/syl20bnr/spacemacs/blob/6eab954afecb4af81aa29916deaa5c1cd332bcb9/layers/%2Bwindow-management/perspectives/README.org#key-bindings).



### evil-surround

[Evil-surround](https://github.com/timcharper/evil-surround) is like the venerable tpope's [vim-surround](https://github.com/tpope/vim-surround). The bindings are the same; e.g. inside something in parens, `cs([` will change the parens to square brackets with a space for padding, `cs(]` will change them to square brackets without the space.



### thanks where thanks is due

Some more people who, knowingly or unknowingly, have helped me out learning all this: [tuhdo](https://news.ycombinator.com/item?id=9395785), svarlet (in the elixir-lang Slack)
