<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
// vuex提供的语法糖（取数据）
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  components: {
    MusicList
  },
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    // 从getters中取出singer数据
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      //  当如果没有singer.id时，跳转到歌手页
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
          // processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
          //   this.songs = songs
          // })
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (isValidMusic(musicData)) {
          // console.log(musicData)
          ret.push(createSong(musicData))
        }
      })
      return ret
    }

  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .singer-detail
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 100
    background $color-background

  .slide-enter-active,.slide-leave-active
    transition all 0.3s
  .slide-enter,.slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
