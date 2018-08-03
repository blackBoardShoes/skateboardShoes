<template>
  <div id="charts">
    <div class="chart">
      <div class="case">
        <h3>区域缩放类图表</h3>
        <ve-histogram
          :data="chart1.chartData"
          :data-zoom ="chart1.dataZoom"
          :settings = "chart1.chartSettings"
          :extend = "chart1.extend"
          height="100%">
        </ve-histogram>
      </div>
      <div class="case">
        <h3>嵌套类图表</h3>
        <ve-pie :data="chart2.chartData" :settings="chart2.chartSettings" height="100%">
        </ve-pie>
      </div>
      <div class="case">
        <h3>环图类图表</h3>
        <ve-ring :data="chart3.chartData" :settings="chart3.chartSettings" height="100%"></ve-ring>
      </div>
      <div class="case">
        <button @click="changeType">切换图表类型</button>
        <ve-chart :data="chart4.chartData" :settings="chart4.chartSettings" height="100%"></ve-chart>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'scalingChart',
  data () {
    this.typeArr = ['line', 'histogram', 'pie']
    this.index = 0
    return {
      chart1: {
        chartData: {
          columns: ['日期', '外科1', '外科2'],
          rows: [
            { '日期': '1月', '外科1': 15, '外科2': 12 },
            { '日期': '2月', '外科1': 12, '外科2': 25 },
            { '日期': '3月', '外科1': 21, '外科2': 10 },
            { '日期': '4月', '外科1': 41, '外科2': 32 },
            { '日期': '5月', '外科1': 31, '外科2': 30 },
            { '日期': '6月', '外科1': 71, '外科2': 55 },
            { '日期': '7月', '外科1': 15, '外科2': 12 },
            { '日期': '8月', '外科1': 12, '外科2': 25 },
            { '日期': '9月', '外科1': 21, '外科2': 10 },
            { '日期': '10月', '外科1': 41, '外科2': 32 },
            { '日期': '11月', '外科1': 31, '外科2': 30 },
            { '日期': '12月', '外科1': 71, '外科2': 55 }
          ]
        },
        chartSettings: {
          stack: { '用日期户': ['外科1', '外科2'] }
        },
        extend: {
          series: {
            label: { show: true, position: 'inside' }
          }
        },
        dataZoom: [
          {
            type: 'slider',
            start: 20,
            end: 60,
            dataBackground: {
              lineStyle: {
                type: 'dotted'
              }
            },
            // 填充颜色
            fillerColor: 'rgba(0, 155, 255, 0.2)'
          }
        ]
      },
      chart2: {
        chartData: {
          columns: ['维度', '人数'],
          rows: [
            { '维度': '0-30岁', '人数': 133 },
            { '维度': '30-50岁', '人数': 233 },
            { '维度': '50-80岁', '人数': 333 },
            { '维度': '男', '人数': 323 },
            { '维度': '女', '人数': 393 }
          ]
        },
        chartSettings: {
          level: [
            ['0-30岁', '30-50岁', '50-80岁'],
            ['男', '女']
          ]
        }
      },
      chart3: {
        chartData: {
          columns: ['时长', '数量'],
          rows: [
            { '时长': '<120m', '数量': 1393 },
            { '时长': '120-180m', '数量': 3530 },
            { '时长': '>180m', '数量': 2923 }
          ]
        },
        chartSettings: {
          radius: [80, 100],
          // offsetY: 200,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '26',
                fontWeight: 'bold',
                align: 'center',
                verticalAlign: 'center'
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            }
          }
        }
      },
      chart4: {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1月1日', '访问用户': 1523 },
            { '日期': '1月2日', '访问用户': 1223 },
            { '日期': '1月3日', '访问用户': 2123 },
            { '日期': '1月4日', '访问用户': 4123 },
            { '日期': '1月5日', '访问用户': 3123 },
            { '日期': '1月6日', '访问用户': 7123 }
          ]
        },
        chartSettings: { type: this.typeArr[this.index] }
      }
    }
  },
  methods: {
    changeType () {
      this.index++
      console.log(this.index)
      if (this.index >= this.typeArr.length) { this.index = 0 }
      this.chart4.chartSettings = { type: this.typeArr[this.index] }
    }
  }
}
</script>
<style lang="scss" scoped>
  #charts{
    width: 100%;
    height: 100%;
    padding:20px;
    box-sizing: border-box;
    overflow-y: auto;
    .chart{
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding: 20px;
      overflow-y: auto;
      box-sizing: border-box;
      .case{
        // width: 45%;
        flex: 1;
        height: 400px;
        border:1px solid #eee;
        margin-top:20px;
        position: relative;
        h3{
          position: absolute;
          top: 10px;
        }
      }
    }
  }
</style>
