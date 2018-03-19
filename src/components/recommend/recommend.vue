<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wapper">
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
import {getRecommend} from 'api/recommend.js'
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
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
          console.log(res.data.slider)
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
