> ⚠️ Blog Construction Ahead 🚧

This is the codebase & build steps for [alxndr's blog](https://alxndr.blog).

It's powered by Jekyll and [GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll).

## Setup

### Apple M1 chip

`bundle install` with Ruby 2.7.6 was failing on macOS Ventura 13.2.1 (22D68), when it got to `eventmachine` 1.2.7; to fix that I first ran:

```
gem install eventmachine -v '1.2.7' -- --with-ldflags="-Wl,-undefined,dynamic_lookup"
```

h/t [Jesse Squires](https://www.jessesquires.com/blog/2023/01/18/eventmachine-failure-on-macos-ventura/)

## Design

Uses the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme, v2.5...??

Note that only [these FontAwesome icons](https://fontawesome.com/v5/icons/home?f=classic&s=solid) are available?
