<template>
  <div class="test">
    <!-- 传入contentBox -->
    <!-- 父子组件交互 -->
    <!-- slot -->
    <!-- click-scroll-ref-scroll 调用子组件事件 -->
    <!-- 内容区域id为contentBox.content,每一个子元素类名为detail -->
    <sync-slider :contentBox="contentBox" v-on:changeActiveIndex="changeActiveIndex" ref="child">
      <div slot="nav" class="nav">
        <div class="navi" v-for="(item, index) in 10" :key="index" :class="{active: index === activeIndex}" @click="scroll(index)">
          <span>{{item}}</span>
        </div>
      </div>
      <div slot="content" id="sync-content">
        <div class="detail" v-for="(item, index) in 10" :key="index">{{item}}</div>
      </div>
    </sync-slider>
  </div>
</template>
<script>
let syncSlider = () => import('../../components/syncSlider/syncSlider.vue')
export default {
  name: 'test_index',
  data () {
    return {
      contentBox: {
        content: 'sync-content',
        detail: 'detail'
      },
      activeIndex: 0
    }
  },
  methods: {
    changeActiveIndex (activeIndex) {
      this.activeIndex = activeIndex
    },
    scroll (index) {
      this.$refs.child.scroll(index)
    }
  },
  components: {
    syncSlider
  }
}
</script>
<style lang="scss">
  .test{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    .sync-slider{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      .nav{
        width: 80px;
        height: 100%;
        .navi{
          cursor: pointer;
          transition: all .5s linear;
          height: 50px;
          line-height: 50px;
          font-size: 30px;
          text-align: center;
          background-color: #eee;
        }
        .active{
          background-color: #fff;
        }
      }
      #sync-content{
        flex:1;
        overflow: auto;
        .detail{
          height: 300px;
          text-align: center;
          line-height: 300px;
          font-size: 30px;
          border-bottom:2px solid #fff;
        }
        .bottom{
          height: 400px;
        }
      }
    }
  }
</style>
