---
title: resizing tab width on GitHub diffs
publishDate: '2022-10-14'
slug: 2022/10/14/tab-size-on-github-diffs
tags:
  - diff
  - github
  - browser hack
---

Do you think 8-wide tabs are too wide, especially when reviewing code side-by-side?

Create a bookmarklet with this, and it'll shrink those tabs right up whenever you click it.

```
javascript:[...document.getElementsByClassName('tab-size')].forEach(t => t.setAttribute('data-tab-size', 2))
```
