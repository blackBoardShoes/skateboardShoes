<template>
  <div id="home">
    <div class="sys-view">
      <div class="overview er-card">
        <div class="card-title">
          <span><i class="ercp-icon-general-summary"></i><b>系统概览</b></span>
        </div>
        <div class="basic-view">
          <div class="case"  v-for="(item, index) in viewOptions" :key="index">
            <div class="icon"> <i :class="item.icon"></i></div>
            <div class="one-case">
              <div class="case-num">{{item.count}}</div>
              <div class="case-title light-text">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
       <div class="statistics">
         <div class="case-top er-card">
           <chart ref="A" :options="optionA" auto-resize style="width: 100%;height: 100%;"></chart>
           <div class="transType">
             <div class="type" @click="transformBy('day')"><div :class="{'color': true, 'active': activeIndex === 'day'}"></div>按日</div>
             <div class="type" @click="transformBy('week')"><div :class="{'color': true, 'active': activeIndex === 'week'}"></div>按周</div>
             <div class="type" @click="transformBy('month')"><div :class="{'color': true, 'active': activeIndex === 'month'}"></div>按月</div>
           </div>
         </div>
         <div class="case-bottom">
           <div class="case-left er-card">
            <chart ref="B" :options="optionB" auto-resize style="width: 100%;height: 100%;"></chart>
          </div>
          <div class="case-right er-card">
            <chart ref="C" :options="optionC" auto-resize style="width: 100%;height: 100%;"></chart>
          </div>
         </div>
       </div>
    </div>
  </div>
</template>
<script>
import {initChart} from '../../../data/chartTemplates/chart'
import { operationDiff, outHospitalStatus, patientNumber, inHospitalNumber, needOperation, nonCheckNumber, nonRepairNumber, operationFinishedByMonth, operationFinishedByWeek, operationFinishedByDay } from '../../../api/home/home.js'
export default {
  name: 'home',
  data () {
    return {
      optionA: {},
      optionB: {},
      optionC: {},
      user: {},
      viewOptions: [],
      finishedOperation: {
        day: {},
        month: {},
        week: {}
      },
      activeIndex: 'day'
    }
  },
  mounted () {
    this.user = this.$store.state.user
    if (this.user.codetype !== null) {
      this.initView(this.user.codetype)
    }
  },
  methods: {
    initView (type) {
      // 相同的任务统计（年月日手术统计、难度分级、患者出院状态）
      this.operationByDay()
      this.operationByWeek()
      this.operationByMonth()
      this.operationDiffMeth()
      this.outHospitalStatusMeth()
      // 不同的用户--不同的数字统计
      switch (type) {
        // 管理员/医生
        case 1: case 3:
          this.viewOptions = [
            // 患者人数、住院人次、待做手术
            // 手术完成统计/各科室患者分布/患者出院时状态分布
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '住院人次',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-task',
              title: '待做手术',
              count: '???'
            }
          ]
          // 数字统计
          this.patientNumberMeth(1)
          this.inHospitalNumberMeth(2)
          this.needOperationMeth(3)
          break
        // 科研管理员
        case 2:
          // 患者人数、住院人次、待做手术、待审核
          // 手术完成统计、各科室患者分布、患者出院状态分布
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '住院人次',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-task',
              title: '待做手术',
              count: '???'
            },
            {
              icon: 'ercp-icon-general-audit',
              title: '待审核',
              count: '???'
            }
          ]
          // 数字统计
          this.patientNumberMeth(1)
          this.inHospitalNumberMeth(2)
          this.needOperationMeth(3)
          this.nonCheckNumberMeth(4)
          break
        // 临床质控员
        case 4:
          // 患者人数、住院人次、待做手术、待审核
          // 手术完成统计/手术难度（ASGE分级）分布、各科室患者分布
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '住院人次',
              count: '???'
            },
            {
              icon: 'ercp-icon-general-audit',
              title: '待做手术',
              count: '???'
            },
            {
              icon: 'ercp-icon-general-audit',
              title: '待审核',
              count: '???'
            }
          ]
          // 数字统计
          this.patientNumberMeth(1)
          this.inHospitalNumberMeth(2)
          this.needOperationMeth(3)
          this.nonCheckNumberMeth(4)
          break
        // 诊疗中心
        case 5:
          // 患者人数、住院人次、（本用户）待审核、（本用户）待修正
          // 手术完成统计/手术难度（ASGE分级）分布、各科室患者分布
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '住院人次',
              count: '???'
            },
            {
              icon: 'ercp-icon-general-audit',
              title: '待审核',
              count: '???'
            },
            {
              icon: 'ercp-icon-general-correct',
              title: '待修正',
              count: '???'
            }
          ]
          // 数字统计
          this.patientNumberMeth(1)
          this.inHospitalNumberMeth(2)
          this.nonCheckNumberMeth(3)
          this.nonRepairNumberMeth(4)
          break
        // 科研护士
        case 6:
          // 患者人数、住院人次、（本用户）待审核、（本用户）待修正
          // 手术完成统计、各科室患者分布、患者出院状态分布
          this.viewOptions = [
            {
              icon: 'ercp-icon-module-patient',
              title: '患者人数',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '住院人次',
              count: '???'
            },
            {
              icon: 'ercp-icon-general-audit',
              title: '待审核',
              count: '???'
            },
            {
              icon: 'ercp-icon-general-correct',
              title: '待修正',
              count: '???'
            }
          ]
          // 数字统计
          this.patientNumberMeth(1)
          this.inHospitalNumberMeth(2)
          this.nonCheckNumberMeth(3)
          this.nonRepairNumberMeth(4)
          break
        default:
          this.$messsage.error('未存在该用户类型')
          break
      }
    },
    // 切换手术完成统计的日月周
    transformBy (value) {
      this.activeIndex = value
      let data = this.finishedOperation[value]
      let total = 0
      data.value.forEach((item) => {
        total += item.value
      })
      let obj2 = [{
        name: '手术完成',
        value: data.value.reverse()
      }]
      let colorOptions = ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59']
      obj2[0].value.forEach((item, index) => {
        item.itemStyle = {
          color: colorOptions[index]
        }
      })
      let obj = {
        text: '手术完成统计' + ' (' + data.types[data.types.length - 1] + '~' + data.types[0] + ')',
        subtext: '共计' + total + '例',
        classes: [],
        data: obj2,
        // y轴
        legendData: data.types.reverse()
      }
      switch (value) {
        case 'day':
          let arr = []
          obj.legendData.forEach((item) => {
            arr.push(item.substr(5))
          })
          obj.legendData = arr
          obj.zoom = [20, 80]
          obj.barWidth = '50%'
          this.optionA = (initChart(this.optionA, obj, 5))
          this.optionA.xAxis[0].axisLabel = {rotate: 15, interval: 0, align: 'center', verticalAlign: 'top'}
          break
        case 'week':
          obj.text = '手术完成统计' + ' (' + data.types[data.types.length - 1].split('~')[0] + '~' + data.types[0].split('~')[1] + ')'
          obj.zoom = [0, 100]
          obj.barWidth = '20%'
          this.optionA = (initChart(this.optionA, obj, 5))
          break
        case 'month':
          obj.zoom = [0, 100]
          obj.barWidth = '35%'
          this.optionA = (initChart(this.optionA, obj, 5))
          break
      }
    },
    // 已完成手术统计(日周月)
    async operationByDay () {
      let response = await operationFinishedByDay()
      if (response.data.mitiStatus === 'SUCCESS') {
        this.finishedOperation.day = response.data.entity
        this.transformBy('day')
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async operationByWeek () {
      let response = await operationFinishedByWeek()
      if (response.data.mitiStatus === 'SUCCESS') {
        this.finishedOperation.week = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async operationByMonth () {
      let response = await operationFinishedByMonth()
      if (response.data.mitiStatus === 'SUCCESS') {
        this.finishedOperation.month = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 患者出院状态
    async outHospitalStatusMeth () {
      let response = await outHospitalStatus()
      if (response.data.mitiStatus === 'SUCCESS') {
        let data = response.data.entity
        let total = 0
        data.value.forEach((item) => {
          total += item.value
        })
        let obj = {
          text: '患者出院时状态分布',
          subtext: '共计' + total + '例',
          classes: data.type,
          data: data.value
        }
        this.optionC = (initChart(this.optionC, obj, 2))
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 手术难度分级
    async operationDiffMeth () {
      let response = await operationDiff()
      if (response.data.mitiStatus === 'SUCCESS') {
        let data = response.data.entity
        let total = 0
        data.value.forEach((item) => {
          total += item.value
        })
        let obj = {
          text: '手术难度分级统计',
          subtext: '共计' + total + '例',
          classes: data.type,
          data: data.value
        }
        this.optionB = (initChart(this.optionB, obj, 2))
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 患者人数、住院人次、待做手术、待审核、待修正(顶部数字统计)
    async patientNumberMeth (index) {
      let response = await patientNumber()
      if (response.data.mitiStatus === 'SUCCESS') {
        let info = response.data.entity
        this.viewOptions[index - 1].count = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async inHospitalNumberMeth (index) {
      let response = await inHospitalNumber()
      if (response.data.mitiStatus === 'SUCCESS') {
        let info = response.data.entity
        this.viewOptions[index - 1].count = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async needOperationMeth (index) {
      let response = await needOperation()
      if (response.data.mitiStatus === 'SUCCESS') {
        let info = response.data.entity
        this.viewOptions[index - 1].count = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async nonCheckNumberMeth (index) {
      let response = await nonCheckNumber()
      if (response.data.mitiStatus === 'SUCCESS') {
        let info = response.data.entity
        this.viewOptions[index - 1].count = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async nonRepairNumberMeth (index) {
      let response = await nonRepairNumber()
      if (response.data.mitiStatus === 'SUCCESS') {
        let info = response.data.entity
        this.viewOptions[index - 1].count = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  #home{
    position: relative;
    width:100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    .sys-view{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .overview{
        height: 140px;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
        .basic-view{
          flex:1;
          box-sizing: border-box;
          padding: 8px;
          display: flex;
          flex-direction: row;
          .case{
            margin: 0 6px;
            flex:1;
            height: 100%;
            box-sizing: border-box;
            border-right: 1px dotted #ddd;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .icon{
              height:55px;
              width: 55px;
              margin: 0 10px;
              line-height: 55px;
              text-align: center;
              font-size:27px;
              color:#fff;
              border-radius: 50%;
              background-color: #117FD1;
              border: 5px solid #B8D9F1;
            }
            .one-case{
              text-align: center;
              .case-num{
                font-size:22px;
                font-weight:900;
              }
              .case-title{
                font-size:14px;
              }
            }
          }
          .case:nth-last-child(1){
            border:none;
          }
        }
      }
      .statistics{
        flex: 1;
        width:100%;
        display: flex;
        flex-direction: column;
        position: relative;
        .case-top{
          width:100%;
          height: 60%;
          min-height: 40%;
          padding: 8px;
          margin-bottom: 8px;
          box-sizing: border-box;
          position: relative;
        }
        .transType{
          position: absolute;
          width: 40%;
          height: 30px;
          left: 30%;
          top: 5%;
          display: flex;
          justify-content: center;
          flex-direction: row;
          align-items: center;
          .type{
            cursor: pointer;
            height: 30px;
            padding: 0 8px;
            font-size: 12px;
            line-height: 30px;
            width: 80px;
            display: flex;
            justify-content: space-around;
            flex-direction: row;
            align-items: center;
            .color{
              height: 15px;
              width: 30px;
              border-radius: 5px;
              background-color: #eee;
              display: inline-block;
            }
            .active{
              background-color: #117FD1;
            }
          }
        }
        .case-bottom{
          height: 60%;
          width:100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .case-left, .case-right{
            flex: 1;
            position: relative;
            box-sizing: border-box;
            padding: 8px;
          }
          .case-left{
            position: relative;
            margin-right: 8px;
          }
        }
      }
    }
    .daily{
      flex: 0 0 360px;
      min-width: 360px;
      margin-left: 8px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .top{
        margin-bottom: 8px;
      }
      .case-statistics{
        height: 65px;
        margin: 10px 0 0 0;
        line-height: 30px;
        display: flex;
        flex-direction: row;
        .case{
          flex:1;
          border-right: 1px dotted #eee;
          text-align: center;
          font-weight: 900;
          font-size:20px;
          .light-text{
            font-weight:400;
            font-size:16px;
          }
        }
        .case:nth-of-type(3){
          border:none;
        }
      }
      .operation-buttons{
        height: 38px;
        width: 100%;
        line-height: 30px;
        padding: 10px 0;
        text-align: center;
        border-bottom: 1px solid #ddd;
      }
      .daily-work{
        flex: 1;
        padding:16px;
        overflow-y: auto;
        .case{
          height: 80px;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          font-size: 14px;
          flex-direction: row;
          line-height: 26px;
          .time{
            width: 50px;
            height: 100%;
          }
          .icon-line{
            width: 20px;
            font-size:16px;
            position: relative;
            .line{
              position: absolute;
              top: 26px;
              bottom: 0px;
              border-radius: 4px;
              left: 50%;
              margin-left: -2px;
              width: 2px;
              background-color: #eee;
            }
          }
          .operation-info{
            flex:1;
            span{
              margin-left: 6px;
            }
          }
        }
        .yet{
          .icon-line{
            .line{
              background-color: #878A8D;
            }
          }
        }
        .ing{
          .icon-line{
            color: #117FD1;
            .line{
              background-color: #117FD1;
            }
          }
        }
        .done{
          .icon-line{
            color: #409D2D;
            .line{
              background-color: #409D2D;
            }
          }
        }
      }
    }
  }
</style>
