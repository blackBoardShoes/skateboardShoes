<template>
  <div id="chart">
    <div class="case">
      <chart ref="A" :options="optionA" auto-resize style="width: 100%;height: 95%;"></chart>
      <div class="mask">
        二维环状统计
      </div>
    </div>
    <div class="case">
      <chart ref="B" :options="optionB" auto-resize style="width: 100%;height: 95%;"></chart>
      <div class="mask">
        二维饼图统计
      </div>
    </div>
    <div class="case">
      <chart ref="C" :options="optionC" auto-resize style="width: 100%;height: 95%;"></chart>
      <div class="mask">
        二维柱状统计
      </div>
    </div>
    <div class="case">
      <chart ref="D" :options="optionD" auto-resize style="width: 100%;height: 95%;"></chart>
      <div class="mask">
        二维线状图趋势统计
      </div>
    </div>
    <div class="case">
      <chart ref="F" :options="optionF" auto-resize style="width: 100%;height: 95%;"></chart>
      <div class="mask">
        三维柱状统计
      </div>
    </div>
    <div class="case">
      <chart ref="E" :options="optionE" auto-resize style="width: 100%;height: 95%;"></chart>
      <div class="mask">
        三维区域缩放柱状统计
      </div>
    </div>
    <div class="case">
      <chart ref="G" :options="optionG" auto-resize style="width: 100%;height: 95%;"></chart>
      <div class="mask">
        任务完成率统计
      </div>
    </div>
  </div>
</template>
<script>
import {charts} from '../../data/chartTemplates/chart.js'
export default {
  name: 'scalingChart',
  data () {
    return {
      optionA: {},
      optionB: {},
      optionC: {},
      optionD: {},
      optionE: {},
      optionF: {},
      optionG: {}
    }
  },
  methods: {
  },
  mounted () {
    console.log(charts)
    this.optionA = charts[0]
    this.optionB = charts[1]
    this.optionC = charts[2]
    this.optionD = charts[3]
    this.optionE = charts[4]
    this.optionF = charts[5]
    this.optionG = charts[6]
  }
}
</script>
<style lang="scss" scoped>
  #chart{
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 16px;
    top: 16px;
    overflow: auto;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 8px;
    .case{
      position: relative;
      float: left;
      height: 260px;
      width:600px;
      box-sizing: border-box;
      border: 1px dotted grey;
      margin: 15px 10px;
      padding: 10px;
      .mask{
        display: none;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        // background-color: rgba(0, 0, 0, 0.1);
        transition: all 1.5s ease-in-out;
      }
    }
    .case:hover{
      .mask{
        // color:rebeccapurple;
        background: linear-gradient(to right, rgba($color: orangered, $alpha: .85), rgba($color: #fff, $alpha: 1.0));
        display: block;
        transition: all 1.5s ease-in-out;
        position: absolute;
        left: 0;
        right: 0;
        top: -30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
</style>
