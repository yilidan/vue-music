import jsonp from 'common/js/jsonp'
import {commonParams, opts} from './config'

/**
 * jsonp 抓取歌手页歌手列表
 * 接口：https://c.y.qq.com/v8/fcg-bin/v8.fcg
 */
export function getSingerList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 5381
  })

  return jsonp(url, data, opts)
}
