function AwesomeProgressPlugin(options = {}, handler) {
  this.handler = handler
  this.options = options
}

module.exports = AwesomeProgressPlugin

AwesomeProgressPlugin.prototype.apply = function(compiler) {
  var handler = this.handler,
      options = this.options
      moduleCount = 0,
      moduleDone = 0,
      moduleFail = 0,
      moduleRemains = 0,
      activeModules = [],
      isTW = false

  if (options) {
    isTW = options.language === 'zh_TW'
  }

  var _internalMsg = isTW ? '打包中' : 'BUILDING'

  var update = function() {
    isTW ?
      handler(0, '[進行中]: ' + moduleRemains + ' [已載入]: ' + moduleCount + ' [已完成]: ' + moduleDone + ' [失敗]: ' + moduleFail + ' [狀態]: ' + _internalMsg) :
      handler(0, '[Progress]: ' + moduleRemains + ' [Loaded]: ' + moduleCount + ' [Done]: ' + moduleDone + ' [Fail]: ' + moduleFail + ' [Status]: ' + _internalMsg)
  }

  var buildDone = function(module) {
    moduleDone++
    var ident = module.identifier()
    if (ident) {
      var idx = activeModules.indexOf(ident)
      if (idx >= 0) {
        activeModules.splice(idx, 1)
        moduleRemains = activeModules.length
      }
      _internalMsg = isTW ? '打包中' : 'BUILDING'
    }
    if (activeModules.length === 0) {
      _internalMsg = isTW ? '等待中' : 'WAITING'
    }
    update()
  }

  var buildFail = function(module) {
    moduleFail++
  }

  compiler.plugin('compilation', function(compilation) {
    /* cache */
    moduleCount = 0
    moduleDone = 0
    moduleDone = 0
    moduleRemains = 0

    console.log('\n' + '------ webpack awesome progress plugin starting ------')

    handler(0, isTW ? '[開始打包]' : '[Start]')

    compilation.plugin('build-module', function(module) {
      moduleCount++;
      var ident = module.identifier()
      if (ident) {
        activeModules.push(ident)
      }
      update()
    })

    // builder
    compilation.plugin('succeed-module', buildDone)
    compilation.plugin('failed-module', buildFail)
  })
  //emit
  compiler.plugin('emit', function(compilation, callback) {
    _internalMsg = isTW ? '產生檔案' : 'Emit'
    update()
    callback()
  })
  // done
  compiler.plugin('done', function() {
    _internalMsg = isTW ? '完成' : 'Done'
    update()
  })
}
