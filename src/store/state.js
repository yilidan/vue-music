import {playMode} from 'common/js/config'
import {loadSearch, loadPlay} from 'common/js/cache'

const state = {
  // 选中歌手数据
  singer: {},
  // 是否播放
  playing: false,
  // 是否全屏
  fullScreen: false,
  // 播放歌曲列表
  playlist: [],
  // 歌曲播放顺序列表
  sequenceList: [],
  // 三种歌曲播放顺序选择
  mode: playMode.sequence,
  // 当前播放歌曲
  currentIndex: -1,
  // 推荐页面选中的歌单
  disc: {},
  // 排行榜页面选中的歌单
  toplist: {},
  // 搜索历史列表
  searchHistory: loadSearch(),
  // 播放历史
  playHistory: loadPlay()
}

export default state
