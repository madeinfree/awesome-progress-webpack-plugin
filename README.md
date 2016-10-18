# Awesome Progress Plugin

Webpack awesome progress with i18n plugin

### en_US


![en_US](http://i.imgur.com/oF5sDKV.png)

### zh_TW
![zh_TW](http://i.imgur.com/71rVD9E.png)

## Installation

### NPM

```
npm install --save-dev awesome-progress-webpack-plugin
```

### YARN

```
yarn add --dev awesome-progress-webpack-plugin
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
