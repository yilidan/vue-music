'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const express = require('express')
const axios = require('axios')
// const app = express()
// axios 结合 node.js 代理后端请求
const apiRoutes = express.Router()

// apiRoutes.get('/getDiscList', function (req, res) {
//   // var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
//   var url = 'http://ustbhuangyi.com/music/api/getDiscList'

//   axios.get(url, {
//       headers: {
//         referer: 'http://ustbhuangyi.com/music/',
//         host: 'ustbhuangyi.com'
//       },
//       params: req.query
//     })
//     .then(function (response) {
//       res.json(response.data)
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// })
// app.use('/api', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(apiRoutes) {
      // 请求qq音乐歌曲列表接口
      apiRoutes.get('/api/getDiscList', function (req, res) {
        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        // var url = 'http://ustbhuangyi.com/music/api/getDiscList'
        axios.get(url, {
            headers: {
              // referer: 'http://ustbhuangyi.com/music/',
              // host: 'ustbhuangyi.com'
              referer: 'https://c.y.qq.com/',
              host: 'c.y.qq.com'
            },
            params: req.query
          })
          .then(function (response) {
            res.json(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      })

      // 请求qq音乐歌词接口
      apiRoutes.get('/api/lyric', function (req, res) {
        var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        // var url = 'http://ustbhuangyi.com/music/api/getDiscList'
        axios.get(url, {
            headers: {
              // referer: 'http://ustbhuangyi.com/music/',
              // host: 'ustbhuangyi.com'
              referer: 'https://c.y.qq.com/',
              host: 'c.y.qq.com'
            },
            params: req.query
          })
          .then(function (response) {
            var ret = response.data
            if (typeof ret === 'string') {
              // 把jsonp字符串中的‘{}’里面的数据匹配出来
              var reg = /^\w+\(({[^()]+})\)$/
              var matches = ret.match(reg)
              if (matches) {
                ret = JSON.parse(matches[1])
              }
            }
            res.json(ret)
          })
          .catch(function (error) {
            console.log(error)
          })
      })

    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
