<template>
  <div id="data-charts">
    <div class="chart-part er-card">
      <div class="chart"  :style="transformData(item.style)" v-for="(item, index) in options" :key="index">
        <transition name="fade">
          <div class="top" v-if="showAdjust">
            <div class="block">
              <el-slider v-model="item.style.width" :show-tooltip="false" :min="30" :max="98"></el-slider>
              <i class="el-icon-sort-up icon1" @click="upIndex(index)" v-if="index !== 0"></i>
              <i class="el-icon-sort-down icon2" @click="downIndex(index)" v-if="index !== options.length - 1"></i>
            </div>
          </div>
        </transition>
        <chart ref="A" :options="item.data" auto-resize></chart>
        <transition name="fade">
          <div class="left"  v-if="showAdjust">
            <div class="block">
              <el-slider v-model="item.style.height" :show-tooltip="false" vertical height="100%" :min="30" :max="90"></el-slider>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import {charts, initChart} from '../../../data/chartTemplates/chart'
export default {
  name: 'System_manage',
  data () {
    return {
      showAdjust: false,
      options: [
        {
          style: {
            width: 48,
            height: 35
          },
          data: {}
        },
        {
          style: {
            width: 48,
            height: 35
          },
          data: {}
        },
        {
          style: {
            width: 48,
            height: 35
          },
          data: {}
        },
        {
          style: {
            width: 48,
            height: 35
          },
          data: {}
        },
        {
          style: {
            width: 98,
            height: 35
          },
          data: {}
        },
        {
          style: {
            width: 98,
            height: 35
          },
          data: {}
        },
        {
          style: {
            width: 98,
            height: 35
          },
          data: {}
        }
      ]
    }
  },
  methods: {
    upIndex (index) {
      let obj = this.options[index]
      if (index > 0) {
        this.options.splice(index, 1)
        this.options.splice(index - 1, 0, obj)
      }
    },
    downIndex (index) {
      let obj = this.options[index]
      if (index !== this.options.length) {
        this.options.splice(index, 1)
        this.options.splice(index + 1, 0, obj)
      }
    },
    transformData (value) {
      let clientHeight = document.body.clientHeight
      let obj = {
        width: value.width.toString() + '%',
        height: value.height / 100 * clientHeight + 'px'
      }
      return obj
    },
    saveChange () {
      console.log(this.options)
    }
  },
  mounted () {
    let info = JSON.parse(JSON.stringify(charts))
    console.log(info)
    this.options.forEach((item, index) => {
      this.options[index].data = info[index]
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/variable';
  #data-charts{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    overflow-y: auto;
    .settings-part{
      margin: 10px 2%;
    }
    .chart-part{
      width: 100%;
      // height: 100%;
      padding: 0 2%;
      box-sizing: border-box;
      // overflow: auto;
      .chart{
        background-color: #fff;
        position: relative;
        margin: 10px 1%;
        box-sizing: border-box;
        padding: 30px;
        float: left;
        .top{
          position: absolute;
          top: 0px;
          left: 0;
          height: 20px;
          width: 100%;
          .block{
            position: absolute;
            top: -5px;
            width: 200px;
            max-width: 80%;
            margin-left: 26px;
            .el-slider{
              margin-left: 16px;
            }
            i.icon1{
              position: absolute;
              left: -28px;
              top: 12px;
              color: $themeColor;
              // transform: rotate(90deg);
            }
            // i:nth-of-type(2){
            //   position: absolute;
            //   right: -32px;
            //   top: 12px;
            //   width: 20px;
            //   height: 20px;
            //   text-align: center;
            //   line-height: 20px;
            //   color: $themeColor;
            //   border: 2px solid $themeColor;
            //   border-radius: 50%;
            // }
            i.icon2{
              position: absolute;
              left: -12px;
              top: 12px;
              color: $themeColor;
              // transform: rotate(90deg);
            }
          }
        }
        .left{
          position: absolute;
          left: 0px;
          top: 26px;
          width: 30px;
          height: 100%;
          .block{
            position: absolute;
            left: -5px;
            height: 200px;
            max-height: 80%;
            margin-top: 10px;
            .el-slider{
              height: 100%;
            }
          }
        }
      }
    }
  }
</style>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
