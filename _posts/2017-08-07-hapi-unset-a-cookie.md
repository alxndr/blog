---
title: hapi — unset a cookie
tags: [notes to self, javascript, HapiJS]
---

...because the documentation for Hapi is awful:

If you're trying to `reply().unstate("cookiename")` and it Just Won't Work, look for how you set that cookie. If you used `reply().state("cookiename", value, cookieOptions)`, you need to include those `cookieOptions` when you try to unset: `reply().unstate("cookiename", cookieOptions)` should work.
