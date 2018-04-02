<template>
  <transition name="slide">
    <div class="singer-detail">

    </div>
  </transition>
</template>

<script>
// vuex提供的语法糖（取数据）
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    //  取数据
    ...mapGetters(['singer'])
  },
  created() {
    this._getDetail()
    console.log(this.singer)
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
          console.log(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {

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
