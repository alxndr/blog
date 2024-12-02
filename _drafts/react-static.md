tags: howto, jamstack, react-static, gh-pages, ssg

**WIP... this still does not work**

----

Adding [`react-static`](https://github.com/react-static/react-static) to an existing React site made with CRA and hosted on GitHub Pages (and therefore using `HashRouter` and a "traditional" single HTML file with a bare DOM to serve as the foundation for the client-side SPA)...

I think the kids-these-days are calling this Jamstack.

    $ npm install --global react-static
    $ react-static create
    ? What should we name this project? static
    ? Select a template below... Local Directory...
    ? Enter an local directory's absolute location (~/Desktop/my-template)

...needs absolute directory, despite the example/default being relative...
pointed it at my existing repo's `public/` subdir...

    Using template from directory: /[project-root]/public
    Installing dependencies with: NPM...
    npm WARN tsutils@3.17.1 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.


    [✓] Project "static" created (31.8s)

      To get started:

        cd "static"

        npm run start - Start the development server
        npm run build - Build for production
        npm run serve - Test a production build locally

Test run to see if things look right...
`cd static && npm run start` yup they do... 

    $ npm run build
    building...
    Creating an optimized production build...
    Browserslist: caniuse-lite is outdated. Please run:
    npx browserslist@latest --update-db

    File sizes after gzip:

      114.37 KB (+102 B)  build/static/js/2.08970198.chunk.js
      6.69 KB (-1 B)      build/static/js/main.9dff53a3.chunk.js
      1.62 KB             build/static/css/2.e22355b1.chunk.css
      1.29 KB             build/static/css/main.a837ca31.chunk.css
      780 B               build/static/js/runtime-main.e88884bc.js

    The project was built assuming it is hosted at /.
    You can control this with the homepage field in your package.json.

    The build folder is ready to be deployed.
    You may serve it with a static server:

      npm install -g serve
      serve -s build

    Find out more about deployment here:

      bit.ly/CRA-deploy

okay let's see if we can deploy it!!!

modified `App.js` to use `BrowserRouter` (which is half of the eventual goal here) so that we can see if it's working...

modify the `build` task to use `react-static build` instead of `react-scripts build`, then when I try `nr deploy` it errors cause it can't find a `static.config.js`, so let's add one...

then `nr deploy` complains about `Module not found: Error: Can't resolve 'react-hot-loader/webpack'` but continues to run, eventually printing this a couple times `Error: Cannot find module '/[project-root]/artifacts/static-app.js'`

(shoulda tried commenting out the hot loader stuff, but didnt)

----

new approach... `react-static create` a new app (layout=blank to start) and see what it has going on and then try to bring that over to ADN...

it uses `react-static` for its scripts...

  "scripts": {
    "start": "react-static start",
    "stage": "react-static build --staging",
    "build": "react-static build",
    "analyze": "react-static build --analyze",
    "serve": "serve dist -p 3000"
  },

...applying that to `start` and we already used it for `build` but not `deploy`...

should we eject from `react-scripts`? ...or fork & extend it? probably, but ~too lazy~ don't want to get distracted right now...

bringing over some changes to how index.js starts up the React app 

running locally, looks ok once it hydrates, but the server side generation isnt up n running

prolly gotta define a static.config.js as well..........

look at a new app with layout=basic now to try to figure out the config file / routes / etc...
* looks sorta like all the data fgetching has to bve moved into the react-static rconfig near routes?? cause the blog post in the basic example are importing  their data like `import { useRouteData } from 'react-static'` then `const { posts } = useRouteData()` and rendering `<ul>{posts.map(PostComponent)}</ul>` etc...
* whats the difference between its `scr/pages/` files and `src/contatiners`? react components all of em...
* moved fetching (for just the Home page) into react-static config getRoutes, now seeing a not-well-explained React error...
  * wrapping with React `Suspense` component does the trick...
* Home page now renders in browser!!
  * ...but not with a generated HTML payload...
* ooooh this might be helpful https://github.com/ninaolo/react-static-github-pages-example

here's a potential clue https://github.com/react-static/react-static/blob/master/docs/guides/incremental-builds.md
