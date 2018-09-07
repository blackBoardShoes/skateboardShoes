<template>
  <div class="validate-code">
    <canvas ref="canvas" width="160px" height="40px" @click="draw"></canvas>
  </div>
</template>
<script>
export default {
  mounted () {
    this.draw()
  },
  props: {
    codeLength: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      codes: [],
      ctx: '',
      colors1: ['#fff', '#fff', '#fff', '#fff', '#fff'],
      colors2: ['#000', '#000', '#000', '#000', '#000'],
      code_Len: this.codeLength
    }
  },
  computed: {
    codeString () {
      let result = ''
      for (let i = 0; i < this.codes.length; i++) {
        result += this.codes[i]
      }
      return result.toUpperCase()
    }
  },
  watch: {
    'codeString': function (newValue, oldValue) {
      this.$emit('change', newValue)
    }
  },
  methods: {
    generateRandom () {
      this.codes = []
      const chars = 'qwertyuiopasdfghjklzxcvbnm0123456789'
      const charsArr = chars.split('')
      for (let i = 0; i < this.code_Len; i++) {
        const num = Math.floor(Math.random() * charsArr.length)
        this.codes.push(charsArr[num])
      }
    },
    draw () {
      this.generateRandom()
      this.drawText()
    },
    drawLine () {
      const lineNumber = 300 // 线条条数
      const lineX = 120
      const lineY = 40 // 最大线条坐标
      for (let i = 0; i < lineNumber; i++) {
        this.ctx.strokeStyle = this.colors2[Math.floor(Math.random() * 5)]
        this.ctx.beginPath()
        let ori = Math.random() * lineX
        let eni = Math.floor(Math.random() * lineY)
        this.ctx.moveTo(ori, eni)
        this.ctx.lineTo(ori + 1, eni + 1)
        // this.ctx.lineTo(Math.floor(Math.random() * lineX), Math.floor(Math.random() * lineY))
        this.ctx.stroke()
      }
    },
    drawText () {
      const canvas = this.$refs['canvas']
      this.ctx = canvas.getContext('2d')
      this.ctx.fillStyle = '#20272c'
      this.ctx.fillRect(0, 0, 100, 40)
      this.ctx.font = '20px Verdana'
      let x = 15
      for (let i = 0; i < 4; i++) {
        this.ctx.fillStyle = this.colors1[Math.floor(Math.random() * 5)]
        this.ctx.fillText(this.codes[i], x, 25)
        x = x + 25
      }
      this.drawLine()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/variable';
  .validate-code {
    background-color: rgba($color: $siderbarBgColor, $alpha: 1.0);
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    // border-radius: 4px;
    overflow: hidden;
    // border: 1px solid #ddd;

    canvas {
      cursor: pointer;
    }
  }
</style>
