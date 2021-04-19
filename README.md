<div align="center">

# simple-progress-webpack-plugin

**A simple progress plugin for [Webpack](https://webpack.js.org/), coming with four different logging output formats.**

</div>

<br><br>

## What it does

**simple-progress-webpack-plugin** is a plugin for **[Webpack](https://webpack.js.org/)**. It improves the overall Webpack Developer
Experience by showing a much more detailed and also visually appealing build progress in the command line. Four different output formats are
available, from which two are ready to be used in a CI environment (such as **[GitHub Actions](https://github.com/features/actions)**).

<br><br><br>

## How to install

You can get the **simple-progress-webpack-plugin** via **npm** by addingh it as a new _dev-dependency_ to your `package.json` file and
running `npm install`. Alternatively, run the following command:

```bash
npm install simple-progress-webpack-plugin --save-dev
```

### Requirements

- **simple-progress-webpack-plugin** requires **NodeJS 12** (or higher) to be installed

<br><br><br>

## How to use

To use the plugin, import it into your Webpack configuration file and instantiate it within the list of plugins:

```javascript
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const webpackConfig = {
  plugins: [new SimpleProgressWebpackPlugin()];
}
```

<br><br><br>

## How to customize

To customize the plugin, pass options to the constructor of the plugin:

```javascript
plugins: [
  new SimpleProgressWebpackPlugin({
    format: 'compact',
  }),
];
```

The following is a list of available logging output formats. While `compact` is the default format, `expanded` is the recommended one for
being used within a CI environment.

<br>

### `minimal`

The `minimal` logger prints everything into a single line, constantly updated during build. This makes it look pretty similar to what the
**[Angular CLI](https://github.com/angular/angular-cli)** outputs during build. So, if you're a minimalist, this is probably the right
logger for you! _This logger format is not recommended for being used within a CI environment_.

![Minimal Logger Preview GIF](/docs/minimal-logger-preview.gif?raw=true)

<br>

### `compact`

The `compact` logger is the default logger. It shows each build step with further details (such as the sub-progress and several sub-steps)
while still not taking up too much space (thus the name compact). _This logger format is not recommended for being used within a CI
environment_.

![Compact Logger Preview GIF](/docs/compact-logger-preview.gif?raw=true)

<br>

### `expanded`

The `expanded` / `extended` logger is pretty similar to the `compact` logger, but prints every sub-step into its own separate line. _This
logger format can also be used within a CI environment_.

![Expanded Logger Preview GIF](/docs/expanded-logger-preview.gif?raw=true)

<br>

### `verbose`

The `verbose` / `debug` logger logs everything. Like everything. The full truth, every crucial detail Webpack has to offer. Best use it for
debugging purposes (or for finding bugs in this plugin). _This logger format can also be used within a CI environment_.

![Verbose Logger Preview GIF](/docs/verbose-logger-preview.gif?raw=true)

<br><br><br>

## Further recommendations

- **[Progress Bar Webpack Plugin](https://github.com/clessg/progress-bar-webpack-plugin)** is an alternative progress plugin for webpack.
  However, instead of just logging out colored text it uses an animated progress bar. Perfect for anyone who likes bars more than stupid text!
- **[Ghost Progress Webpack Plugin](https://github.com/ZSkycat/ghost-progress-webpack-plugin)** is a no side effects progress plugin for webpack.
  It can output progress and does not affect the output log of other tools, and is more suitable for use in a development server environment.
- **[Friendly Errors Webpack Plugin](https://github.com/geowarin/friendly-errors-webpack-plugin)** complements either this plugin or the
  _Progress Bar Webpack Plugin_ described above. It gives developer a cleaner, more detailed screen once the build has finished. Definitely
  worth checking out!
