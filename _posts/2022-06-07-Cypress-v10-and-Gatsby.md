---
layout: post
title: upgrading Cypress to v10 within a Gatsby project
tags: [cypress.io, gatsby, testing, web]
---

[Cypress] v10 is out, and it makes some big changes. It comes with a real handy migration guide built into the `cypress open` command, which is nice! But the [component testing framework](https://docs.cypress.io/guides/component-testing/testing-react#Selecting-the-Stepper-Component) they've added expects you to be using [Webpack] in a normal way, and if you're using [Gatsby], that is <em>not</em> the case...

When the migration tool attempts to modify your normal Webpack config to add component testing, it fails and then shows a screen titled "Unexpected Error", and shows a list of filenames it's looking at to find a Webpack config. I picked `webpack.config.js` and created a new file with the contents `{}`, and clicked "Try Again" and it got through the step. Then I opened the (newly-created from migration) `cypress.config.js` file and removed the `component` chunk, and now my `npm run cypress run` command works like it used to!

<!--
Gatsby has a helpful page explaining [how to use a custom Webpack config](https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/). TLDR: add a `onCreateWebpackConfig` function to your `gatsby-node.js`, and in it will get passed a `setWebpackConfig` function...
-->

[Cypress]: https://cypress.io
[Gatsby]: https://gatsbyjs.com
[Webpack]: https://webpack.js.org
