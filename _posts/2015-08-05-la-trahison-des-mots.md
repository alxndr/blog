---
title: La trahison des mots
tags: [CLI, joke]
---

Run this in your (POSIX-compliant) shell — I promise it's not bad:

    echo "ceci n'est pas une pipe" | sed -Ee 's/(eci n|pas )//g'

![animation of "WAKA WAKA" above Fozzie Bear (from the Muppets) waggling his eyebrows](http://i.imgur.com/57UvJmY.gif)

No seriously though folks, that's my favorite code joke.[^1]

[^1]: Close second is: "What's the best thing about UDP jokes? No one cares if you don't get it!" ...third is ["Knock knock. Race condition. Who's there?"](https://twitter.com/iamdevloper/status/399991896862638081)

This formation uses the "extended regex" option of GNU `sed` so I could use the `|`: another pipe, and it means there's only one `s///` operation. With basic regexes I guess it'd be:

    echo "ceci n'est pas une pipe" | sed -e 's/eci n//' -e 's/pas //'

