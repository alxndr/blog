---
title: eslint — Cannot read property 'value' of undefined
tags: [eslint, ecmascript, javascript, linting, notes to self]
---

Are you seeing ESLint throwing an error like

    Cannot read property 'value' of undefined
    TypeError: Cannot read property 'value' of undefined
        at getStarToken (.../node_modules/eslint/lib/rules/generator-star-spacing.js:68:25)
        ... bunch more stack trace here

It might be that you've put `async` on a named function, and ESLint doesn't like it. I made ESLint happy by making the function a fat-arrow anonymous function with `async` on it, and assigning it to a `const` with the name I wanted.

Related:

* [eslint/eslint issue: Async function declaration](https://github.com/eslint/eslint/issues/6773)
* [babel/babel-eslint issue: Remove the ast changes for async/await when ESLint supports it](https://github.com/babel/babel-eslint/issues/350)
