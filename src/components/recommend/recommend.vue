<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wapper" v-if="recommends.length">
        <slider>
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {getRecommend, getDiscList} from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'
import Slider from 'base/slider/slider'

export default {
  components: {
    Slider
  },
  data () {
    return {
      recommends: []
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
          console.log(res.data.slider)
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          console.log(1)
          console.log(res.data.list);

        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .recommend
      position: fixed
      width: 100%
      top: 88px
      bottom: 0
      .recommend-content
        height: 100%
        overflow: hidden
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
</style>
