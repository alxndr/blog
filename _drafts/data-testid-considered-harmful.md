---
title: Testing Library's `data-testid` considered harmful
tags: [JavaScript, tests, TDD, DOM]
---

Well, maybe not "harmful", but I sure don't like 'em...

Let's add aria roles and/or titles to all the things? Or do [stuff like this](https://testing-library.com/docs/dom-testing-library/api-within/) instead:

```javascript
import {within} from '@testing-library/dom'

const messages = document.getElementById('messages')
const helloMessage = within(messages).getByText('hello')
```

...cause what's so bad about using an HTML `class` or `id` here sparingly, especially if they're already in the code? yeah it might be a little fragile between the test file and the component, but usually when you're changing one of those things you're also changing the other one anyway...
