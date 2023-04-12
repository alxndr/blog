---
title: Sharpening Your Tools
tags: [tooling, shortcuts, efficiency]
---

…is an episode of [the Ruby Rogues podcast](http://rubyrogues.com/), [#129 with Ben Orenstein](http://rubyrogues.com/129-rr-sharpening-tools-with-ben-orenstein/) (who has spent some of his time being the host of [Thoughtbot](http://thoughtbot.com/)’s [Giant Robots podcast](http://podcasts.thoughtbot.com/giantrobots)). In the episode, Ben talks about periodically evaluating his tools and making them work better for you.

> I thought of it as slowly sanding down the rough edges of my environment. [...] Anything that irked me, I would try to spend a little time on, every morning. —Ben, at around 6:15

In general, I think re-evaluating your own tools is an interesting and often useful exercise do from time to time. Computers can make this especially easy!

Here are some of my favorite computery tool-sharpenings.

### In your shell

Do you use a shell? Can it alias things? Read on for *ONE WEIRD TRICK* that will *SAVE YOU TIME AND MONEY!!*

In the Ruby Rogues episode, one cohost begins by mentioning [a talk Ben gave](https://www.youtube.com/watch?v=8ZMOWypU34k) where he shows and talks about how he periodically analyzes the commandline tools he uses most often.

Now for some audience participation! Open up a shell and run this command after the `$`, and you should get a list of the 20 commands you use the most:

    $ history | awk '{ count[$2]++ } END { for (cmd in count) { print count[cmd] " " cmd } }' | sort -rn | head -20

What does your list look like? How many letters is your longest command?

How much time do you think you spent typing that long command last week?

Ben did this in his talk, showing and talking about the commands he runs the most often. What I find most interesting is that more than half of the commands in his list aren't "real" commands; they're shortcuts he's made. Ben's most commonly-used command is `g`, which he explains is a wrapper for `git`. Now he saves two keypresses every time he needs to use `git`.

Also in the top half of Ben's list are a set of shortcuts for specific git actions: `gad`, `gcm`, `gd`, `gco`, `gg`. Now instead of typing `git add .`, he types `gad`, and saves five characters. Instead of typing `git commit -m "message"` he types `gcm "message"` and saves ten characters. You might be able to guess what the other ones are.

This is a powerful idea to me. Our computers let us refine our tools so that they suit our hands more!

Paul McKellar has taken this history analysis step further with the [huffshell](https://github.com/paulmars/huffshell) project, which will look at your shell history and suggest shortcuts — even including the types of commands that take subcommands, like `git`, `rake`, `npm`, what have you.

As you might imagine, I also have a bunch of shortcuts in my shell. I have so many that [I keep my `.alias` file in GitHub](https://github.com/alxndr/dotfiles/blob/master/.alias). I like to read other people's and steal ideas. You should try it! And then put your `.alias` file on GitHub too!

Check this out: [I start my Rails servers with `rs`](https://github.com/alxndr/dotfiles/blob/931d9dd08849c9dcd2bd72b31c9071a0cbbe65c0/.alias#L39-47). Doesn't matter what version of Rails, my shortcut will figure it out for me. Same thing with the Rails console: [`rc` and I'm in](https://github.com/alxndr/dotfiles/blob/931d9dd08849c9dcd2bd72b31c9071a0cbbe65c0/.alias#L25-38). Bingo bango. [^1]

[^1]: Ok, that's not a normal alias, it's a new function. But it's still a shortcut!

I bet `cd` is up there on your top 20 list. If I were a betting man, I might bet that it's in your top five even. `cd` is pretty short, I guess we could shave one character off it by aliasing it to `c` or whatever...

...but what if you didn't type it at all?

![screencast of my zsh command prompt](http://i.imgur.com/5XFQX6D.gif)

This gif is showing a couple things, but mostly it's showing that zsh is pretty cool. It lets you elide `cd`: just type the directory that you're going to and hit enter. Works with `..` too. (But if you find yourself doing `../..` a lot, maybe you want to alias that to `...`?)

It also shows zsh's sweet tab completion: I initially typed "wo/br/cms", and then I hit the tab key, which zsh then [glob](http://en.wikipedia.org/wiki/Glob_%28programming%29)s to figure out that I want to go to "workspace/br/cms". Pretty nice!

And that `3`, `1`, `2`, `1` weirdness? zsh keeps track of the history of directories you've navigated through. Maybe you know about [the `cd -` trick](http://stackoverflow.com/q/9740298/303896) — it takes you back to the directory you just came from. This is the same functionality as zsh's `1`: it takes you *one* step back in the history of your directory navigation. So that `3` is taking me back to the directory I was in three `cd` s ago. This is zsh's `autopushd` feature, which is admittedly a bit of a party trick, but it's a neat party trick!

Finally, it shows my command prompt. I've streamlined my prompt to only show me the stuff I pretty much always care about: where I am, and (if I'm in a git repository) what branch I have checked out.

The git branch name is a feature of the zsh theme I'm using, but previously I had cobbled together [something similar for bash](https://github.com/alxndr/dotfiles/blob/7fe23897f764334fb1b7718668f4ea4a65fe6c5f/.bashrc#L14-30) before I started using zsh.

The colors, newlines, and emoji are all intentional:

*   the purple `$` prompt sigil is unabrasively eye-catching enough to help me locate the start of commands quickly
*   the branch name in yellow makes it stand out the most, since it's the piece of information there I use the most often
*   directory and branch name are on a separate line from the prompt itself to maximize the space available for typing commands
*   the newline gap between the end of one command's output and the start of the following prompt helps me skim through a screen full of history
*   the lightning bolt emoji is a sign that the git repository I'm in has uncommitted changes
*   the blinking active cursor is easy to find in a sea of split terminals
*   ...ok, the cactus emoji is just kinda cute

I'm new to zsh so I'm trying to discover more of the neat sharpenings that are available in it. I jumped on the [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) bandwagon to get into it, and it's been a very comfortable switch.

### In your git

Git has built-in support for aliases! Yay git!

    $ g config alias.foo status
    $ g foo
    On branch master
    Untracked files:
      (use "git add <file>..." to include in what will be committed)
        public/shortcuts.jpg
        public/shortcuts.md
    nothing added to commit but untracked files present (use "git add" to track)

I mostly end up using git aliases to package up somewhat tricky or hard-to-remember things in git. My favorite one at the moment is what I'm calling [`family tree`](https://github.com/alxndr/dotfiles/blob/772a33fdc38598f077c2812a91f647bc6060c8cb/.gitconfig#L22), which shows the branches that have been merged into whatever branch I'm currently on. There's also [`reset-upstream`](https://github.com/alxndr/dotfiles/blob/772a33fdc38598f077c2812a91f647bc6060c8cb/.gitconfig#L27), handy when I want to create a feature branch on my fork of someone else's repo: it hard-resets my origin's master branch to the newly-fetched upstream's master branch.

I also have some nice quick keystroke savers that aren't anything fancy: `b` for branch, `ci` for commit, `co` for checkout, `di` for diff, `st` for status.

Put all your git aliases together and stick 'em in your `~/.gitconfig` so they're available everywhere! [Here's mine](https://github.com/alxndr/dotfiles/blob/master/.gitconfig).

The [doc page on git's aliases](https://git.wiki.kernel.org/index.php/Aliases) includes a range of great examples as well, if you want some inspiration.

### In your editor

(I use Vim and RubyMine, so this part will be about Vim and RubyMine. If you use a different editor, I bet it has ways to do stuff like this as well. If it doesn't, maybe you should think about finding a new editor?)

Vim is (in?)famously extensible. Google "vim plugins" if you don't believe me. I use [a bunch of them](https://github.com/alxndr/dotfiles/tree/master/.vim/bundle), but I think the ones that save me the most time are:

*   [Syntastic](https://github.com/scrooloose/syntastic): point out your syntax errors, in whatever language(s) you type
*   [YouCompleteMe](https://github.com/Valloric/YouCompleteMe): powerful word completion, in whatever language(s) you type
*   [NerdCommenter](https://github.com/scrooloose/nerdcommenter): shortcut to comment and uncomment stuff, in whatever language(s) you type
*   [CtrlP](https://github.com/kien/ctrlp.vim): fuzzy file finding, and ctags integration (if you don't know what ctags is, look it up, you're in for a treat!)
*   [vim-gitgutter](https://github.com/airblade/vim-gitgutter): visually mark which lines have been added/deleted/changed since last commit, and move between them quickly
*   [Pathogen](https://github.com/tpope/vim-pathogen): vim plugin management (how meta)
*   gotta have a syntax highlighter for whatever language(s) you type!

I recommend learning as many of vim's movement and repetition capabilities as possible. Being able to move around quickly and do several things at once is less like a shortcut and more like a raw power upgrade — which you could turn into even more powerful shortcuts.

(Don't be intimidated by the variety of options for movement or text manipulation: pick whatever seems the simplest and try to start using it whenever you can. Then after a little while, pick the next simplest one and do it again. If it all just seems needlessly complex, see if either [Ben McCormick's "Vim as a Language"](http://benmccormick.org/2014/07/02/learning-vim-in-2014-vim-as-language/) or the classic SO answer ["Your problem with Vim is that you don't grok vi"](http://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118) helps at all.)

However you get your navigation or manipulation done in vim, you can package up entire sequences of keypresses into shorter commands. Vim's [key mapping](http://vim.wikia.com/wiki/Mapping%5Fkeys%5Fin%5FVim%5F-%5FTutorial%5F%28Part%5F1%29) feature lets you alias entire sequences of keypresses into quick commands. To access those shortcut mappings, you preface it by pressing a "leader" key. footnote:[In vim it's common to preface one's custom key mappings with a "leader" key, which starts a short-lived secret mode where your next keypresses are interpreted as a mapping, instead of normal vim commands. I think the backslash `\` is the most common one.]

I set up vim to respond to two leader keys, one for each hand[^2]. I'll use whichever one is on the opposite side from the first letter of the mapping I want to use, so I can always come up with an easy-to-remember shortcut that isn't uncomfortable or inconvenient to type.

[^2]: Well, that's not quite true — I just happen to use the comma as the start of some mappings, which feels the same as having another leader key. The backslash and the comma are on different sides of the keyboard in the [the Dvorak keyboard layout](http://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard).

Using the spacebar as a leader key is another quick way to be able to use both hands! (I like to use spacebar as [a fold/unfold shortcut](https://github.com/alxndr/dotfiles/blob/49a4e065/.vimrc#L53-56) instead...)

[RubyMine](http://www.jetbrains.com/ruby/) is a not-free full-blown IDE which targets Ruby-based projects, based on IntelliJ. I like it because, for the most part, it has the functionality of all those vim plugins above but already built-in, and I can make its UI get out of my way so I have a bunch of split panes/tabs plus a bunch of shortcuts. The fuzzy file finder I have available as shift-command-n; syntax errors and git modifications are shown in the gutter; command-/ will comment or uncomment lines in any language[^3]; command-b is an even more powerful ctags-like thing; word completion is built in; static code analysis is pretty good and customizable... It also has some nice automated refactoring tools (which are especially tricky to get right with a sneaky language like Ruby).

[^3]: Except it doesn't work in Dvorak! Weird. I set up another shortcut so it works with \, which is in the same place in QWERTY...

Like most big fancy GUI programs, it supports custom keybindings to access the commands that are [normally hidden under menus](https://blog.pivotal.io/pivotal-labs/labs/exploring-rubymines-quick-commands). And like a nicely-thought-out tool, it supports plugins and has a [big list of them all](http://plugins.jetbrains.com/ruby).

But finding useful commands to keybind, or getting familiar with new plugins, requires a non-trivial amount of effort to begin using. For something easier to get into, it also supports — you guessed it — custom shortcuts!

How often do you create a new method in a Ruby class? How often do you type out `console.log` in JS? RubyMine has a feature it calls Live Templates, which turn an alias into a text template, and optionally places your cursor in defined areas within the text. Here's one I think I got from [the setup that Pivotal Labs uses](https://github.com/pivotal/Pivotal-Preferences-RubyMine), which creates the skeleton of a Jasmine test when you type `it` and then a tab:

    it('should _', function() {
      _
    });

...with your cursor waiting at the first underscore to let you describe your test, and then when you hit tab again it jumps to the next underscore where you fill in your test code. Nice!

### In your browser

Did you know that your browser can do aliases too? That's right!

(I use Chrome so what I'm about to describe is based on Chrome v38’s specific UI, but I know Firefox has this feature, and the last time I used Opera I'm pretty sure it did too...)

How often do you look for something specifically on Wikipedia? Do you first Google it, and hope that the Wikipedia article is the first or second result? How much time does it take to find the Wikipedia article if it's not on the first page of results? Do you look through more results, or refine your search, or go to Wikipedia and try their built-in search?

Well *NO MORE*! Open up Chrome's preferences, find the Search section on the main Settings page, and click the "Manage search engines..." button. The little modal that pops up will show a "Default search settings" that's probably got Google as the default, but the box below that is where you can add your own. You should see three text fields: in the first one put a helpful name, like "Wikipedia short cut"; in the second one put the short alias you want to use, like `w`; and in the last one put this: `https://www.google.com/search?q=site:wikipedia.org+%s&btnI`.

Now hit "Done", and close the Settings. Go into the URL bar, and type a `w` and then a space — you'll see a thing in the URL bar appear to the left when you hit the space, saying "Search Wikipedia short cut:", and then there's your cursor. Now if you type "bleacher report" and hit enter, you're taken directly to the Wikipedia article for BR!

Take another look at the URL you stuck in: there's a `%s` hiding towards the end. That bit gets replaced with whatever you type after the "w-space", so the expansion ends up turning into a Google URL that restricts the search results to Wikipedia's domain name. The `btnI` query parameter at the end is Google's "I'm Feeling Lucky" button, which takes you directly to the first result.footnote:[Actually, Google seems to be playing with how `btnI` works these days... Unless the first result is a dead match for what you searched, it appears they'll keep you on the search results page. Some of my image search parameters have been hit-and-miss as well. What's up, Google?] 99% of the time, this'll take you right to the article you want!

(If you ever wanted to know how I find gifs of stuff quickly, it's a shortcut like this. There I just shared my secret gif recipe.)

Okay, how about some that sound useful for doing real work, instead of [enabling three hours of fascinated clicking](http://xkcd.com/214/)?

*   I use GitHub a lot on the job. How often do you end up typing "github.com" followed by something? Presto change-o! Create yourself a shortcut with this in the URL bar: `https://github.com/%s`, and now to visit my dotfiles repo all you need to do is "gh alxndr/dotfiles" in your URL bar. Nice!

*   Ever find yourself looking up the docs for an older version of something, like Ruby 1.9? They're a little buried in Google these days if you don't specify the version number... Here you go: `https://www.google.com/search?q=site:www.ruby-doc.org+"1.9"+%s&btnI`

*   I'm always forgetting the order of the parameters to JS functions... Mozilla's Developer Network is a pretty nice reference site: `https://www.google.com/search?q=site:developer.mozilla.org+%s&btnI`

*   What's that? You want to use my lyrics-jumbling Lorem Ipsum generator, but you can never remember the name of the site cause it's a stupid name? `http://lyrem-ipsum.com/text-from-lyrics-by/%s`

Exercise for the reader: make yourself a shortcut for going to Jira tickets quickly. You're welcome.

### In your OS

Oh wow, shortcuts in the operating system!

(The only operating system I use these days is OS X 10.8 and 10.9, so again that's all I'll be talking about for the time being.)

First one is the simplest, and very useful: restore power to your tab button! Head to OS X's Preferences (there's a shortcut under the Apple menu) and then the Keyboard panel. In the Keyboard Shortcuts side of the panel, there's an option called Full Keyboard Access. Flip that over to "all controls" to let your tab button skip through every button and checkbox instead of just the text boxes and selection fields. This means you don't have to reach for your mouse when a dialog pops up and you want to hit a button that's not tied to the Enter key.

If you have a trackpad, while you're in the Preferences, poke through the options in the Trackpad panel. I really like the "Secondary click" and "Three finger drag" options, and having a gesture tied to Mission Control is helpful when I find myself lost in too many windows.

I'm not using it to its full potential, but [Alfred](http://www.alfredapp.com/) is pretty much OS X's Spotlight on steroids. It's an app launcher and file searcher which you can also extend a million ways. I pretty much just use it to launch apps, which I'm slightly embarrassed to admit.

The [Spectacle app](http://spectacleapp.com/) lets you define some shortcuts to reposition windows. I use it every day to move windows from one screen to another, or maximize em, or take up exactly half the screen. It's sort of a free version of [SizeUp](http://www.irradiatedsoftware.com/sizeup/) (which is also a great tool).

Earlier I explained how I tuned my command prompt; I also try to tune the visual environment of OS X. To that end, I think it's very much worth it to give Surtees Studios fifteen bucks for [the Bartender app](http://www.macbartender.com/), which lets you hide that crap up in the menu bar that you don't care about, like the Notifications icon (which who actually uses that anyway), or the Spotlight icon (which I never use because I have Alfred), or your own account name (which hopefully you know by now).

### In closing

It is worth it to take the time to improve how you do what you do.

Evaluate your workflows and tools. Identify what is a hassle, or even what could be improved slightly. Improve it. Repeat.

And share! What's your favorite shortcut?

### Moar links

*   [Ruby Rogues #129, Sharpening Tools with Ben Orenstein](http://rubyrogues.com/129-rr-sharpening-tools-with-ben-orenstein/)
*   [Ben Orenstein's GoGaRuCo 2013 talk "Frequently Asked Questions"](http://www.confreaks.com/videos/2677-gogaruco2013-frequently-asked-questions)
*   Some dotfiles:
    *   https://github.com/alxndr/dotfiles[mine]
    *   https://github.com/thoughtbot/dotfiles[thoughtbot's]
