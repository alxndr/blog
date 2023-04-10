## alxndr's blog

SSL not working yet??

It's powered by Jekyll and GitHub Pages.

## Setup

### Apple M1 chip

`bundle install` with Ruby 2.7.6 was failing on macOS Ventura 13.2.1 (22D68), when it got to `eventmachine` 1.2.7; to fix that I first ran:

```
gem install eventmachine -v '1.2.7' -- --with-ldflags="-Wl,-undefined,dynamic_lookup"
```

h/t [Jesse Squires](https://www.jessesquires.com/blog/2023/01/18/eventmachine-failure-on-macos-ventura/)
