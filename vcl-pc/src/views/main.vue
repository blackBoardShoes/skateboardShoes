<template>
  <div class='all'>
    <ve-bmap
      height='100%'
      :settings='chartSettings'
      :after-set-option-once='getMap'
      :series='chartSeries'
      :tooltip='chartTooltip'>
    </ve-bmap>
  </div>
</template>

<script>
import { login, hotMapData } from '../api/a/a.js'
export default {
  data () {
    return {
      chartSettings: {
        key: 'oBvDtR6nzWtVchkY4cLHtnah1VVZQKRK',
        bmap: {
          center: [120, 30],
          zoom: 14,
          roam: true,
          mapStyle: {}
        }
      },
      chartSeries: [
        {
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: [[120, 30, 3], [120, 30.001, 3]]
        }
      ],
      chartTooltip: {
        show: true
      },
      points: [],
      bmap: {}
    }
  },
  created () {},
  mounted () {},
  methods: {
    async getMap (echarts) {
      this.echarts = echarts
      this.bmap = this.echarts
        .getModel()
        .getComponent('bmap')
        .getBMap()
      this.bmap.addControl(new window.BMap.MapTypeControl())
      this.firstShow()
    },
    async firstShow () {
      let c = await login()
      console.log(c)
      this.hotMap()
      this.fox()
    },
    async hotMap () {
      let hpd = await hotMapData()
      console.log(hpd)
      this.points = [].concat.apply([], hpd.data.map((track) => {
        return track.map((seg) => {
          return seg.coord.concat([1])
        })
      }))
      this.echarts.setOption({
        animation: false,
        bmap: {
          center: [120.13066322374, 30.240018034923],
          zoom: 14,
          roam: true
        },
        visualMap: {
          show: false,
          top: 'top',
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['blue', 'blue', 'green', 'yellow', 'red']
          }
        },
        series: [{
          type: 'heatmap',
          coordinateSystem: 'bmap',
          data: this.points,
          pointSize: 5,
          blurSize: 6
        }]
      })
    },
    async fox () {
      // 创建小狐狸
      var pt = new window.BMap.Point(120.13066322374, 30.240018034923)
      var myIcon = new window.BMap.Icon(
        'http://lbsyun.baidu.com/jsdemo/img/fox.gif',
        new window.BMap.Size(300, 157)
      )
      var marker2 = new window.BMap.Marker(pt, { icon: myIcon }) // 创建标注
      this.bmap.addOverlay(marker2)
    }
  }
}
</script>
<style lang='scss' scoped>
.all {
  height: 100%
}
</style>
