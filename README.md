# [leonelgalan.com](https://leonelgalan.com/) [![Build Status](https://travis-ci.org/leonelgalan/site.svg?branch=master)](https://travis-ci.org/leonelgalan/site)

Jekyll site, hosted on Github Pages, deployed by Travis.

## Locally

```sh
bundle exec jekyll serve --future
```

Optionally, start both _Jekyll_ and _Browsersync_ (`npm i -g browser-sync`) with a tool that runs a _Procfile_:

* `foreman start` (`gem install foreman`)
* `heroku local`

I [decided](https://github.com/leonelgalan/site/commit/81ac3fac8b5a832a54fe03dd67d80b2639b74580) not to add Browsersync to the development requirements because this setup is optional.

## Content

### Posts/Pages

* Banner Images
  * Size: 1600 x 320
  * Format: JPEG, ~100 KB
  * Preferred source: [Unsplash](https://unsplash.com/): All photos published on Unsplash can be used for free. You can use them for commercial and noncommercial purposes. You do not need to ask permission from or provide credit to the photographer or Unsplash, although it is appreciated when possible.

## Deploy

Push or merge into the _master_ branch.
