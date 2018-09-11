import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

// 当有迷你播放器时，页面底部高度变化
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

// 音乐播放模式更改
export const playerMixin = {
  computed: {
    // 更改播放模式icon 随机，顺序，单曲
    iconMode() {
      return this.mode === playMode.sequence
        ? 'icon-sequence'
        : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode'
    ])
  },
  methods: {
    // 播放模式更改
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    // 当前播放歌曲的index索引
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    // 通过mapMutations来改变fullScreen的值
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCRREN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    })
  }
}

// 添加歌曲列表
export const searchMixin = {
  data () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    // 输入需要搜索的内容 调接口取数据
    onQueryChange(query) {
      this.query = query
    },
    // 保存搜索历史
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    // 使input框失去焦点
    blurInput() {
      this.$refs.searchBox.blur()
    },
    // 点击热门搜索的内容，并显示在搜索框内
    addQuery(query) {
      // 用$refs去触发子组件中的事件
      this.$refs.searchBox.setQuery(query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
