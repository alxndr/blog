---
title: framework-less CLI TDD with NPM\* OMG LOL
tags: [javascript, NodeJS, tests, TDD, CLI]
---

`*` no this does not involve npm, it just made the title look good 🤷

NodeJS v16.17 / v18 introduced a new module named [`node:test`](https://nodejs.org/api/test.html) which includes basic test scaffolding!
This makes it real easy to whip up a super-basic JS test file and iterate on it, without having to set up a framework like Mocha or Jest.

Save this to a file named with a `.mjs` extension, e.g. `test.mjs`:
```
import {strictEqual} from 'assert'
import {test} from 'node:test';

test('runs a thing', () => {
  strictEqual('foo', 'bar')
})
```

...then if you've got Node >= 16.17.0 \|\| >= 18.0.0 you'll be able to:

```shell
$ node ./test.mjs
```

```
# Subtest: runs a thing
not ok 1 - runs a thing
  ---
  duration_ms: 1.016333
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    
    'foo' !== 'bar'
    
  code: 'ERR_ASSERTION'
  stack: |-
    TestContext.<anonymous> (file:///test
.mjs:5:10)
    Test.runInAsyncScope (node:async_hooks:203:9)
    Test.run (node:internal/test_runner/test:486:25)
    Test.start (node:internal/test_runner/test:413:17)
    test (node:internal/test_runner/harness:129:18)
    file:///Users/xander/workspace/br/test.mjs:4:1
    ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    async Promise.all (index 0)
    async ESMLoader.import (node:internal/modules/esm/loader:530:24
)
    async loadESM (node:internal/process/esm_loader:91:5)
  ...
1..1
```

(Note that with Node 16.19.1 using this module will also spit out a helpful warning: `(node:8518) ExperimentalWarning: The test runner is an experimental feature. This feature could change at any time`...)
