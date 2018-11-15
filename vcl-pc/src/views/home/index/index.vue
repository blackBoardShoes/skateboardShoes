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
    <div class="daily er-card" v-if="false">
      <div class="card-title">
        <span><i class="ercp-icon-medicine-reservation"></i><b>今日手术</b> <span class="light-text float-right small-text">2018-07--13 10:12:55更新过</span></span>
      </div>
      <div class="case-statistics">
        <div class="case">
          <div class="light-text">完成手术</div>
          <div>4</div>
        </div>
        <div class="case">
          <div class="light-text">待做手术</div>
          <div>2</div>
        </div>
        <div class="case">
          <div class="light-text">未做排期</div>
          <div>1</div>
        </div>
      </div>
      <div class="operation-buttons">
        <el-button type="primary" size="medium" @click="refresh" v-if="user.codetype=== 5 || user.codetype=== 6">更新患者</el-button>
        <el-button type="primary" size="medium" @click="add" v-if="user.codetype=== 5">添加患者</el-button>
      </div>
      <!-- </div> -->
      <div class="daily-work">
        <div class="yet case" v-for="item in ['a', 'b' , 'c', 'd']" :key="item">
          <div class="time">
            14:00
          </div>
          <div class="icon-line">
            <i class="ercp-icon-general-dolist"></i>
            <span class="line"></span>
          </div>
          <div class="operation-info">
            <div>
              <span>林广福<span class="info-text">未手术</span></span>
              <!-- 操作按钮 -->
              <span class="ercp-icon-medicine-operation float-right" v-if="user.codetype && user.codetype=== 5"></span>
              <span class="ercp-icon-general-fail float-right" v-if="user.codetype && user.codetype=== 5"></span>
            </div>
            <div>
              <span>手术报告<span class="info-text"></span></span>
            </div>
            <div>
              <span>手术医生<span class="info-text"></span></span>
            </div>
          </div>
        </div>
        <div class="ing case" v-for="item in ['e', 'f' , 'g', 'h']" :key="item">
          <div class="time">
            12:00
          </div>
          <div class="icon-line">
            <i class="ercp-icon-general-progress"></i>
            <span class="line"></span>
          </div>
          <div class="operation-info">
            <div>
              <span>黄小明<span class="primary-text">手术中</span></span>
              <!-- 操作按钮 -->
              <!-- <span class="ercp-icon-medicine-operation float-right"></span> -->
            </div>
            <div>
              <span>手术报告<span class="info-text">待录入</span></span>
            </div>
            <div>
              <span>手术医生<span class="info-text">王大彪</span></span>
            </div>
          </div>
        </div>
        <div class="done case" v-for="item in ['i', 'j' , 'k', 'l']" :key="item">
          <div class="time">
            10:00
          </div>
          <div class="icon-line">
            <i class="ercp-icon-general-finish"></i>
            <span class="line"></span>
          </div>
          <div class="operation-info">
            <div>
              <span>王小虎<span class="success-text">已完成</span></span>
              <!-- 操作按钮 -->
              <!-- <span class="ercp-icon-medicine-operation float-right"></span> -->
            </div>
            <div>
              <span>手术报告<span class="success-text">已打印</span></span>
            </div>
            <div>
              <span>手术医生<span class="info-text">王小彪</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {charts, initChart} from '../../../data/chartTemplates/chart'
import { aoPatient, operationFinished, operationDiff, outHospitalStatus, patientNumber, inHospitalNumber, needOperation, nonCheckNumber, nonRepairNumber } from '../../../api/home/home.js'
export default {
  name: 'home',
  data () {
    return {
      optionA: {},
      optionB: {},
      optionC: {},
      user: {},
      viewOptions: [],
      number1: 0,
      number2: 0,
      number3: 0,
      number4: 0
    }
  },
  mounted () {
    this.user = this.$store.state.user
    if (this.user.codetype !== null) {
      this.initView(this.user.codetype)
    }
    this.optionA = charts[4]
    // this.optionB = charts[0]
    this.optionC = charts[0]
  },
  methods: {
    initView (type) {
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
              icon: 'ercp-icon-module-patient',
              title: '住院人次',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-user',
              title: '待做手术',
              count: '???'
            }
          ]
          // 数字统计
          this.patientNumberMeth(1)
          this.inHospitalNumberMeth(2)
          // this.needOperationMeth(3)
          // 图表统计
          this.outHospitalStatusMeth()
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
              icon: 'ercp-icon-module-patient',
              title: '住院人次',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-user',
              title: '待做手术',
              count: '???'
            },
            {
              icon: 'ercp-icon-module-project',
              title: '待审核',
              count: '???'
            }
          ]
          // 数字统计
          this.patientNumberMeth(1)
          this.inHospitalNumberMeth(2)
          // this.needOperationMeth(3)
          this.nonCheckNumberMeth(4)
          // 图表统计
          this.outHospitalStatusMeth()
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
              icon: 'ercp-icon-module-patient',
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
          // this.needOperationMeth(3)
          this.nonCheckNumberMeth(4)
          // 图表统计
          this.operationDiffMeth()
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
              icon: 'ercp-icon-module-patient',
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
          // 图表统计
          this.operationDiffMeth()
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
              icon: 'ercp-icon-module-patient',
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
          // 图表统计
          this.outHospitalStatusMeth()
          break
        default:
          this.$messsage.error('未存在该用户类型')
          break
      }
      // 各科室患者分布、手术完成统计
      this.aoPatientMeth()
      // this.operationFinishedMeth()
    },
    // 各科室患者分布
    async aoPatientMeth () {
      let response = await aoPatient()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        let data = response.data.entity
        let total = 0
        data.value.forEach((item) => {
          total += item.value
        })
        let obj = {
          text: '各科室患者分布',
          subtext: '共计' + total + '例',
          classes: data.type,
          data: data.value
        }
        this.optionB = (initChart(this.optionB, obj, 1))
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 已完成手术统计
    async operationFinishedMeth () {
      let response = await operationFinished()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
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
        this.optionC = (initChart(this.optionC, obj, 1))
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
        this.optionC = (initChart(this.optionC, obj, 1))
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 患者人数、住院人次、待做手术、待审核、待修正
    async patientNumberMeth (index) {
      let response = await patientNumber()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        let info = response.data.entity
        this.viewOptions[index - 1].count = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async inHospitalNumberMeth (index) {
      let response = await inHospitalNumber()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        let info = response.data.entity
        this.viewOptions[index - 1].count = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async needOperationMeth (index) {
      let response = await needOperation()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        let info = response.data.entity
        this.viewOptions[index - 1].count = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async nonCheckNumberMeth (index) {
      let response = await nonCheckNumber()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        let info = response.data.entity
        this.viewOptions[index - 1].count = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async nonRepairNumberMeth (index) {
      let response = await nonRepairNumber()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
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
            // width: 25%;
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
              font-size:30px;
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
            // background-color: #fff;
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
        .case-top{
          width:100%;
          height: 60%;
          min-height: 40%;
          padding: 8px;
          margin-bottom: 8px;
          box-sizing: border-box;
          position: relative;
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
        // margin-bottom: 16px;
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
            // color: #eee;
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
