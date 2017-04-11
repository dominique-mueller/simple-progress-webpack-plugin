<div align="center">

# simple-progress-webpack-plugin

**A simple progress plugin for Webpack, coming with four different logging output formats.**

[![npm version](https://img.shields.io/npm/v/simple-progress-webpack-plugin.svg?maxAge=3600&style=flat)](https://www.npmjs.com/package/simple-progress-webpack-plugin)
[![dependency status](https://img.shields.io/david/dominique-mueller/simple-progress-webpack-plugin.svg?maxAge=3600&style=flat)](https://david-dm.org/dominique-mueller/simple-progress-webpack-plugin)
[![dev dependency status](https://img.shields.io/david/dev/dominique-mueller/simple-progress-webpack-plugin.svg?maxAge=3600&style=flat)](https://david-dm.org/dominique-mueller/simple-progress-webpack-plugin?type=dev)
[![travis ci build status](https://img.shields.io/travis/dominique-mueller/simple-progress-webpack-plugin/master.svg?maxAge=3600&style=flat)](https://travis-ci.org/dominique-mueller/simple-progress-webpack-plugin)
[![Known Vulnerabilities](https://snyk.io/test/github/dominique-mueller/simple-progress-webpack-plugin/badge.svg)](https://snyk.io/test/github/dominique-mueller/simple-progress-webpack-plugin)
[![license](https://img.shields.io/npm/l/simple-progress-webpack-plugin.svg?maxAge=3600&style=flat)](https://github.com/dominique-mueller/simple-progress-webpack-plugin/LICENSE)

</div>

<br>

## What it does

**simple-progress-webpack-plugin** is a plugin for **Webpack 2**. It improves the overall Webpack Developer Experience by showing a much
more detailed and also visually appealing build progress in the command line. Four different output formats are available, from which two
are ready to be used in a CI environment (such as *Travis CI*).

<br>

## How to install

To get the **simple-progress-webpack-plugin** via **npm**, simply add it as a new dev-dependency to your `package.json` file and run `npm
install`. Alternatively, run the following command:

``` bash
npm install simple-progress-webpack-plugin --save-dev
```

<br>

## How to use

First, import the plugin into your Webpack configuration file:

``` javascript
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );
```

Then, instantiate it within the list of plugins:

``` javascript
plugins: [
  new SimpleProgressWebpackPlugin()
]
```

<br>

## How to customize

To customize the plugin, simply pass the options in the constructor of the plugin:

``` javascript
plugins: [
  new SimpleProgressWebpackPlugin( { // Default options
    format: 'compact'
  } )
]
```

The following logging output formats are available:

### `minimal`

The `minimal` logger prints everything into a single line, constantly updated during the build progress. This makes it look pretty similar
to what the **[Angular CLI](https://github.com/angular/angular-cli)** outputs during build. So, if you're a minmimalist, this could be the
perfect logger for you.

> :heavy_check_mark: CI ready

*TODO: Screenshot*

### `compact`

The `compact` logger is the default logger of this plugin. It shows each build step with further details (such as the sub-progress) while
still appearing rather compact.

> :heavy_check_mark: CI ready

*TODO: Screenshot*

### `expanded`

The `expanded` logger is pretty similar to the `compact` logger, yet does print every sub-step into its own separate line.

> :heavy_multiplication_x: not CI ready

*TODO: Screenshot*

### `verbose`

The `verbose` / `debug` logger logs everything. Like everything. The full truth, every crucial detail webpakc has to offer. Best use it for
debugging purposes (or for finding bugs in this plugin).

> :heavy_multiplication_x: not CI ready

*TODO: Screenshot*

<br>

## Further recommendations

- **[Progress Bar Webpack Plugin](https://github.com/clessg/progress-bar-webpack-plugin)** is an alternative progress plugin for webpack.
However, instead of just logging out colored text it uses an animated progress bar. Perfect for anyone who likes bars more than stupid text!
- **[Friendly Errors Webpack Plugin](https://github.com/geowarin/friendly-errors-webpack-plugin)** complements either this plugin or the
*Progress Bar Webpack Plugin* described above. It gives developer a cleaner, more detailed screen once the build has finished. Definitely
worth checking out!

<br>

## Idea Space

- More log output formats
- Extended log output configurability

> You can't wait for one of those features, or have some new ideas?<br>Simply **[create an issue](https://github.com/dominique-mueller/simple-progress-webpack-plugin/issues/new)**. Also, contributions to this project are highly welcomed at all time!

<br>

## Creator

**Dominique Müller**

- E-Mail: **[dominique.m.mueller@gmail.com](mailto:dominique.m.mueller@gmail.com)**
- Website: **[www.devdom.io](https://www.devdom.io/)**
- Twitter: **[@itsdevdom](https://twitter.com/itsdevdom)**
