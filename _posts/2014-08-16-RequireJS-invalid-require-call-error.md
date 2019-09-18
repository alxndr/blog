---
layout: post
title: RequireJS 'invalid require call' error"
tags: [requirejs, javascript]
---

Ruh roh.

    Uncaught Error: Invalid require call
    http://requirejs.org/docs/errors.html#requireargs require.js:167
    makeError require.js:167
    localRequire require.js:1372
    Module.fetch require.js:806
    Module.check require.js:841
    Module.enable require.js:1144
    context.enable require.js:1512
    (anonymous function) require.js:1129
    (anonymous function) require.js:133
    each require.js:58
    Module.enable require.js:1091
    Module.init require.js:775
    (anonymous function) require.js:1417

That link up there pointing to the RequireJS site tersely states that this happens because you didn't pass an array as the first parameter to `require()`.

This error can also come from the shim portion of the config, if you (similarly) declare the `deps` as a bare string instead of an array. CoffeeScript example:

    require.config shim:
      'underscore':
        exports: '_'
      'backbone':
        exports: 'Backbone'
        deps: ['jquery', 'underscore']
      'marionette':
        exports: 'Backbone.Marionette'
        #deps: 'backbone'   # wrong
        deps: ['backbone']  # there we go!
