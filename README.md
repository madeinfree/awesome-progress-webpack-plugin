# Awesome Progress Plugin

Webpack awesome progress with i18n plugin

## Installation

### NPM

```
npm install --save-dev awesome-progress-webpack-plugin
```

### YARN

```
yarn add --dev awesome-progress-webpack-pluginmarf
```

## USE

```javascript
var AwesomeProgressPlugin = require('./plugin/awesome-progress-plugin')

new AwesomeProgressPlugin({ language: 'en_US' }, function(percentage, msg) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(msg)
}),
```
