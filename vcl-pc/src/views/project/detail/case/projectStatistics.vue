<template>
  <div id="project-statistics">
    <div class="operate-buttons align-right">
      <el-button type="primary" @click="addStatistics">添加统计</el-button>
    </div>
    <div class="statistics">
      <div class="chart" v-for="(item, index) in tableArr" :key="index">
        <!-- <div class="outter"> -->
        <chart :options="item.option" auto-resize style="height:100%;width:100%;"></chart>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {charts} from '../../../../data/chartTemplates/chart'
export default {
  name: 'Project_detail_statistics',
  data () {
    return {
      tableArr: [
        {
          name: '统计图1',
          option: {}
        },
        {
          name: '统计图2',
          option: {}
        },
        {
          name: '统计图3',
          option: {}
        },
        {
          name: '统计图4',
          option: {}
        },
        {
          name: '统计图5',
          option: {}
        }
      ]
    }
  },
  methods: {
    addStatistics () {
      this.$message.success('添加统计待做')
    }
  },
  mounted () {
    this.tableArr[0].option = charts[0]
    this.tableArr[1].option = charts[1]
    this.tableArr[2].option = charts[2]
    this.tableArr[3].option = charts[3]
    this.tableArr[4].option = charts[4]
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/variable';
   #project-statistics{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:16px;
    overflow: auto;
    // display: flex;
    // flex-direction: column;
    .operate-buttons{
      min-height: 40px;
      line-height: 40px;
      padding:10px 0;
    }
    .statistics{
      // flex: 1;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      .chart{
        border: 2px solid #AAA;
        padding: 20px;
        margin: 1% 0;
        box-sizing: border-box;
        width: 100%;
        height: 300px;
        overflow: auto;
      }
    }
  }
</style>
