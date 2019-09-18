---
layout: post
title: advanced filtering in Chrome's Network dev tools
tags: [Google Chrome, developer tools, network, filters]
---

Google Chrome has some nice developer tools. The Network tab in there lets you see requests and their headers, responses, initiators, and much more. Being able to filter the list of requests in the Network tab can be very useful.

In Chrome 43 (on OS X 10.10), show the filter toolbar by clicking on the gray “filter” / “funnel” icon; it’ll turn blue and a text box appears below it. Next to the text box is a row of "buttons” which let you quickly filter by request type; “All” is the selected default. footnote:[The next time you’re filtering something in the Network panel but you’re not seeing what you think you should be seeing, make sure this request type quick selector is on “All”!]

The text box is the more powerful tool, with what the [Dev Tools docs call](https://developer.chrome.com/devtools/docs/network) “filter types”.

To only show requests from a certain domain name, use the filter type `domain:` like so: `domain:github.io`. To hide requests from a certain domain, start it with a hyphen: `-domain:github.io`.

To only show requests that haven’t finished yet, use `is:running`.

Find potentially-troublesome requests with `-status-code:200 -status-code:302 -status-code:204 -status-code:304 -status-code:307`. (If currently-running requests are distracting you, stick `-is:running` at the beginning of that.)

Find out more handy little tips like this by keeping an eye on [Umar Hansa](https://plus.google.com/+UmarHansa)’s mini-blog [Chrome Dev Tips](https://umaar.com/dev-tips/#archive).
