<template>
  <div id="data-charts">
    <div class="chart-part er-card" id="all-charts">
      <div class="chart"  v-for="(item, index) in options" :key="index">
        <div class="error" v-if="item.error">{{item.error}}</div>
        <chart :options="item" auto-resize v-else></chart>
      </div>
    </div>
  </div>
</template>
<script>
import {initChart} from '../../../data/chartTemplates/chart'
import { Loading } from 'element-ui'
import { education, occupation, familyIncome, hospitalCost, hospitalAge, hospitalDays, operationBetween, operationAfter, partingLocal, partingNation } from '../../../api/statistics/statistics'
export default {
  name: 'System_manage',
  data () {
    return {
      options: [],
      loadingInstance: ''
    }
  },
  methods: {
    async getStatistics () {
      this.loadingInstance = Loading.service({
        lock: true,
        target: document.getElementById('all-charts'),
        text: '数据加载中，请稍等',
        spinner: 'el-icon-loading',
        background: '#fff',
        fullscreen: false
      })
      let arr = []
      arr.push({type: 2, chart: await hospitalAge()})
      arr.push({type: 2, chart: await hospitalDays()})
      arr.push({type: 3, chart: await education()})
      arr.push({type: 3, chart: await occupation()})
      arr.push({type: 3, chart: await familyIncome()})
      arr.push({type: 3, chart: await hospitalCost()})
      arr.push({type: 3, chart: await operationBetween()})
      arr.push({type: 3, chart: await operationAfter()})
      arr.push({type: 2, chart: await partingLocal()})
      arr.push({type: 2, chart: await partingNation()})
      let textArr = ['入院年龄', '总住院天数', '教育水平', '职业', '家庭年收入', '总住院费用', '术中并发症', '术后表现及并发症', '憩室分型（本中心分型）', '憩室分型（国际分型）']
      arr.forEach((bbb, index) => {
        let item = bbb.chart
        if (item.data && item.data.mitiStatus === 'SUCCESS') {
          console.log(item.data.entity)
          let data = item.data.entity
          let total = 0
          data.data.forEach((item) => {
            total += item.value
          })
          let obj = {
            text: textArr[index] + '统计',
            subtext: '共计' + total + '例',
            classes: data.type,
            data: data.data
          }
          let a = []
          this.options.push(initChart(a, obj, bbb.type))
        } else {
          let obj = {
            error: '服务器错误' + '(' + textArr[index] + '统计)'
          }
          this.options.push(obj)
          return false
        }
      })
      this.loadingInstance.close()
    }
  },
  mounted () {
    // let info = JSON.parse(JSON.stringify(charts))
    // console.log(info)
    // this.options = info
    this.getStatistics()
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
      height: 100%;
      padding-bottom: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      overflow: auto;
      .chart{
        width: calc(50% - 30px);
        height: 400px;
        margin-top: 20px;
        background-color: #fff;
        position: relative;
        box-sizing: border-box;
        padding: 30px;
        overflow: auto;
        float: left;
        border: 1px dotted #dfdfdf;
      }
      .error{
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 338px;
      }
    }
  }
</style>
