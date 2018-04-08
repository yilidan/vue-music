<template>
  <div class="player" v-show="playlist.length>0">
    <div class="normal-player" v-show="fullScreen">
      播放器
    </div>
    <div class="mini-player" v-show="!fullScreen"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {

  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist'
    ])
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .player
    .normal-player
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      z-index 150
      background $color-background
</style>
