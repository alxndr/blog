---
title: One Weird Trick to Easily Remove (maybe) Anything from a Webpage
tags: [howto, developer tools, advertising, browsers]
---

If you are using a desktop (not mobile/tablet) [Mozilla Firefox] or [Brave Browser] (or [Google Chrome] or another browser based on [Chromium]), here's a quick way to remove a specific part of a web page — e.g. a distracting ad within the content, or a persistent subscription popup, or a "subscribe now" overlay which covers half the screen...

Right-click somewhere on the offending ad/popup/overlay, and select the "Inspect" option. It may take a second to respond (...or ten seconds), but the whole browser window should shrink a bit, and show a new panel with [HTML] code and maybe [CSS] code and perhaps a [JavaScript] text interface showing some errors or warnings... **don't be afraid!**

Without clicking on anything else yet, hit the `Delete` key on your keyboard once, and if the ad/popup/overlay is still there, try hitting `Delete` again. Perhaps just a smaller part of the ad/popup/overlay has disappeared: press `Delete` once again and see if a larger part is gone... if you keep pressing `Delete` it will continue removing larger and larger chunks!

(What's going on here?!? This is the code inspector, which is included by default in many modern web browsers, allowing you to remove parts of the running webpage. It is only happening for you looking at this particular view of that page, in only that browser on that computer, no one else on the Internet is also seeing these parts of the site disappear.)

You can get a sense for how this works by right-clicking on another part of the page (maybe a link within a paragraph of text, or an entry within a list) and then pick "Inspect" — now take note of the item you initially selected, and then press `Delete` a couple times and note that with each `Delete` a larger portion of the web page is gone!

Refresh the page and it should be back to how it was initially, before you right-clicked and started with the "Inspect" stuff. This reflects how your deletions were only modifying the view of that web page which **you** were looking at, and not how that web page actually works for everyone else who is visiting it.

I use this to tweak the layout of an article so that it fits on a wide or narrow screen better for me to read it.

(Did that pique your interest? You can also live-edit the CSS code in the panel there... and also the JavaScript as it's running!)


-------

[Brave Browser]: https://brave.com
[CSS]: https://en.wikipedia.org/wiki/CSS
[Chromium]: https://www.chromium.org/Home/
[Google Chrome]: https://www.google.com/chrome/
[HTML]: https://en.wikipedia.org/wiki/HTML
[JavaScript]: https://en.wikipedia.org/wiki/JavaScript
[Mozilla Firefox]: https://www.mozilla.org/en-US/firefox/browsers/
