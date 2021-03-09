# `create-react-app` / `react-scripts` (v3?) to Gatsby (v3)

This makes me think it's possible! https://www.gatsbyjs.com/docs/porting-from-create-react-app-to-gatsby/ but it's light on specifics...

`npm install gatsby` in the repo, adds it to the `package.json` ...

(using gatsby CLI directly will let you know if your version of Node is too old... mine was... I used `fnm` to set it to `12.13.0`)

https://khaledgarbaya.net/articles/moving-from-create-react-app-to-gatsby-js

* static page? put it in `src/pages/`
* routes based on fetching data? put it in `src/templates/`
* (what's `src/layouts` for?)
* oh but I'm not using graphql...

https://www.gatsbyjs.com/docs/how-to/querying-data/using-gatsby-without-graphql/


* [example repo](https://github.com/jlengstorf/gatsby-with-unstructured-data/tree/8512704c4b64b) uses v2...
* so `gatsby-node.js` is where to define the route patterns for all pages to be statically-generated
* each route pattern is defined with a path, React component, and optional data to be passed to the individual instances of each route
* 


https://www.gatsbyjs.com/blog/2018-10-25-using-gatsby-without-graphql/
