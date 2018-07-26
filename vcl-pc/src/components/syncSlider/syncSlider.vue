<template>
  <div class="sync-slider">
    <slot name="nav"></slot>
    <slot name="content"></slot>
  </div>
</template>
<script>
import { clearInterval, setInterval } from 'timers'
export default {
  name: 'syncSlider',
  props: {
    contentBox: {
      type: Object,
      deault: {
        content: 'content',
        detail: 'detail'
      }
    }
  },
  data () {
    return {
      heightArr: [],
      top: 0,
      silderBox: '',
      detailBox: '',
      activeIndex: 0
    }
  },
  mounted () {
    // 内容元素主体
    this.silderBox = document.getElementById(this.contentBox.content)
    this.detailBox = this.silderBox.getElementsByClassName(this.contentBox.detail)
    // 设置padding-bottom 滑动最底部
    let parent = this.silderBox.parentNode
    let padding = parent.offsetHeight - this.detailBox[this.detailBox.length - 1].offsetHeight
    this.silderBox.style.paddingBottom = padding > 0 ? padding + 'px' : 0
    // 内容元素具体元素（类名一致、外盒子）
    let content = this.silderBox
    content.addEventListener('scroll', this.changeIndex)
    this.$nextTick(() => {
      this.initHeight()
    })
  },
  methods: {
    // 初始化数组高度
    initHeight () {
      let contentArr = []
      contentArr = this.detailBox
      for (let i = 0; i < contentArr.length; i++) {
        this.heightArr.push(contentArr[i].offsetTop)
      }
    },
    // 设置滑动参数
    scroll (index) {
      let end = this.heightArr[index]
      this.scrollAnimation(end)
    },
    // 滑动动画
    scrollAnimation (end) {
      let that = this
      let diff = end - this.silderBox.scrollTop
      let step = diff / 20
      this.step = step
      let timer = setInterval(() => {
        that.silderBox.scrollTop += step
        if (diff > 0 && end - that.silderBox.scrollTop < step) {
          that.silderBox.scrollTop = end
          clearInterval(timer)
        } else if (diff < 0 && that.silderBox.scrollTop - end < Math.abs(step)) {
          that.silderBox.scrollTop = end
          clearInterval(timer)
        }
      }, 20)
    },
    // 监听滑动时-同步activeIndex
    changeIndex () {
      this.top = this.silderBox.scrollTop
      this.changeActiveIndex(this.top)
    },
    changeActiveIndex (top) {
      for (let i = 0; i < this.heightArr.length; i++) {
        let height1 = this.heightArr[i - 1] === undefined ? 0 : this.heightArr[i - 1]
        let height2 = this.heightArr[i] === 0 ? 1 : this.heightArr[i]
        if (top === 0) {
          this.$emit('changeActiveIndex', 0)
          this.activeIndex = 0
        } else if (top > height1 && top <= height2) {
          this.$emit('changeActiveIndex', i)
          this.activeIndex = i
        }
      }
    }
  }
}
</script>
