---
title: "mocking in Vitest: how to conditionally modify a mocked imported function's behavior"
tags: [howto, javascript, code, testing, vitest]
---

(This was not apparent at all despite an hour or two looking through [Vitest]'s docs...)


### tldr

[On StackOverflow](https://stackoverflow.com/a/76432956/303896), Ben Butterworth succintly solved this Vitest predicament in an answer to a question about Jest.

```javascript
// a-local-file.js -----------------------------------------------
import {dependency} from './deps'

export function aFunction() {
    setTimeout(() => {
        dependency()
    }, 2000)
}

// test.js -------------------------------------------------------
import {test, vi} from 'vitest'
import {aFunction} from './a-local-file'
import {dependency} from './deps'

vi.mock('./deps')

describe('when it returns true', () => {
    beforeEach(() => {
        vi.mocked(dependency).mockResolvedValue(true)
    })
    test('...', () => {/* ... */})
})
describe('when it returns false', () => {
    beforeEach(() => {
        vi.mocked(dependency).mockResolvedValue(true)
    })
    test('...', () => {/* ... */})
})
```


### Why??

I was adding tests to a proof-of-concept TypeScript function running on AWS Lambda.
The main function is in the file `index.ts`.

It uses `import` to pull in a helper `login` function, in the file `login-helper.ts`.

I wanted to test the behavior of the `index.ts` function when the login fails, as well as when it works.

With this ability to conditionally mock the extracted login function, I can have one `describe` block where I test the failing-login behavior...

```javascript
import {describe, test, vi} from 'vitest'
import {login} from './login-helper'
import {handlePayload} from './index'
vi.mock('./login-helper')
describe('handlePayload', () => {
  // ...
  describe('with invalid login', () => {
    beforeEach(() => {
      vi.mocked(login).mockRejectedValue('mocked login fails')
    })
    test('throws', async () => {
      await expect(() => handlePayload(payload)).rejects.toThrow('mocked login fails')
    })
  })
})
```

...as well as the "happy path" logic when the login succeeds...

```javascript
import {describe, test, vi} from 'vitest'
import {login} from './login-helper'
import {handlePayload} from './index'
vi.mock('./login-helper')
describe('handlePayload', () => {
  // ...
  describe('with valid login', () => {
    let mockedPost
    beforeEach(() => {
      mockedPost = vi.fn()
      vi.mocked(login).mockResolvedValue({
        post: mockedPost,
      })
    })
    test('attempts to post', async () => {
      await handlePayload(payload)
      expect(mockedPost).toHaveBeenCalledWith({/* ... */})
    })
  })
})
```


[Vitest]: https://vitest.dev
