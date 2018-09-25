// node 起服务
var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var app = express()

var apiRoutes = express.Router()

// 请求qq音乐recommend推荐页的热门歌单数据
apiRoutes.get('/getDiscList', function (req, res) {
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

// 请求qq音乐player组件歌曲的歌词接口
apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
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

// 抓取recommend推荐页歌单数据
apiRoutes.get('/getCdInfo', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
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

// 抓取搜索页面搜索时列表的数据
apiRoutes.get('/search', function (req, res) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios.get(url, {
      headers: {
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

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listening at http://localhost:' + port + '\n')
})
