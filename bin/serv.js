const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('../build/webpack.config.js')
const config = require('../config')

const app = express()
const paths = config.utils_paths
const compiler = webpack(webpackConfig)
const mode = config.env === 'development'

if (mode) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      modules: true
    },
    historyApiFallback: true,
  }))

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    reload: true,
    noInfo: true,
    heartbeat: 10 * 1000,
  }))

  app.use(express.static(paths.client('static')))

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  app.use(express.static(paths.dist()))
}

const port = config.server_port
const host = config.server_host

const server = app.listen(port, function() {
  console.log('Example app listening at http://%s:%s', host, port)
})

module.exports = server
