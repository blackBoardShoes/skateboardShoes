<template>
  <div id="patient-record">
    <!-- 患者详情报告 -->
    <div class="basic-title light-text" v-if="formData.patientName">
      患者：
      <span class="primary-text">{{formData.patientName}}</span>
      <span>（{{formData.gender === 1 ? '男' : '女'}}）</span>
      <span class="hospital-num"> 住院编号：{{formData.operationNum}} </span>
      <div class="operate-buttons">
        <el-button type="primary" @click="printRecord" plain size="small">打印</el-button>
      </div>
    </div>
    <sync-slider :contentBox="contentBox" v-on:changeActiveIndex="changeActiveIndex" ref="child" v-if="formData.patientName">
      <!-- 左側導航 -->
      <div slot="nav" class="nav">
        <div class="navi">
          <!-- <div class="cover"
            :class="{active: activeIndex === 0}"
            @click="scroll('0')">
            封面
            background-color="#fff"
            text-color="#9DA0A3"
            active-text-color="#117FD1"
          </div> -->
          <el-menu
            :unique-opened=true
            :default-active="activeIndex.toString()"
            class="el-menu-vertical-demo">
            <el-submenu
              index="11111">
              <template slot="title">
                <div
                  class="text-overflow-ellipsis">
                  <span>封面</span>
                </div>
              </template>
              <el-menu-item :index = "(smallNavi.indexOf (formData.recordCover)).toString()" :unique-opened=true>
                <div
                  class="text-overflow-ellipsis"
                  @click="scroll((smallNavi.indexOf (formData.recordCover)).toString())">
                  {{basicInfo.name}}
                </div>
              </el-menu-item>
            </el-submenu>
            <el-submenu :index="(index + 222).toString()" :unique-opened=true v-for="(item, index) in formData.forms" :key="index">
              <template slot="title">
                <div
                  class="text-overflow-ellipsis">
                  <span>{{item.header.phase}}</span>
                </div>
              </template>
              <el-menu-item-group :unique-opened=true>
                <el-menu-item v-for="(subMenu, index2) in objIntoArr(item.data)" :key="index2" :index="(smallNavi.indexOf (subMenu)).toString()">
                  <div
                    class="text-overflow-ellipsis"
                    @click="scroll((smallNavi.indexOf (subMenu)).toString())">
                    {{subMenu.moduleName}}
                  </div>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <!-- 右側内容區域 -->
      <div slot="content" id="sync-content">
        <!-- 封面 -->
        <div class="detail">
          <div class="basic-cover">
            <div class="top">
              <div class="top-logo">
                <div class="hospital">
                  <div class="top-text">
                    <div class="bolder-text">兰州大学第一医院</div>
                    <div class="">THE FIRST HOSPITAL OF LANZHOU UNIVERSITY</div>
                  </div>
                  <div class="logo">
                    <img src="../../../assets/images/ldyy.png" alt="">
                  </div>
                </div>
              </div>
              <div class="top-text">
                <div class="bolder-text">患者详情报告</div>
                <div class="">PATIENT RECORD</div>
                <div class="system"> <span>ERCP</span>信息录入管理系统</div>
              </div>
            </div>
            <div class="basic-info">
              <div class="info-title">
                患者基本信息
              </div>
              <div class="info-content">
                <div class="info-case">
                  <div class="info-head">姓名：</div>
                  <div class="info-detail">{{basicInfo.name}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">性别：</div>
                  <div class="info-detail">{{basicInfo.gender === '1' ? '男' : '女'}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">民族：</div>
                  <div class="info-detail">{{basicInfo.nation}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">住院编号：</div>
                  <div class="info-detail">{{basicInfo.hospitalId}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">身份证号：</div>
                  <div class="info-detail">{{basicInfo.idCard}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">联系方式：</div>
                  <div class="info-detail">{{basicInfo.phoneNum}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">常居住地：</div>
                  <div class="info-detail">{{basicInfo.province !== basicInfo.city ? basicInfo.city : ''}}{{basicInfo.city}}{{basicInfo.district}}{{basicInfo.staAddress}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 具体表单内容 -->
        <div class="forms" v-for="(record, index) in formData.forms" :key="index">
          <div class="reord-header">
            <i class="ercp-icon-general-stage"></i>
            【{{record.header.phase}}】
          </div>
          <div class="bottom-bg"></div>
          <div class="form-recorder light-text">
            <div class="recorder float-left">
              <span>填报人员：{{record.header.responseName}}</span>
              <span>填报时间：</span>
            </div>
            <div class="recorder float-right">
              <span>审核人员：</span>
              <span>审核时间：{{record.header.checkerName}}</span>
            </div>
          </div>
          <div class="detail" v-for="(module, index) in record.data" :key="index">
            <div class="module-title">
              <div class="module-title-main">
                {{module}}
              </div>
              <div class="right-rounds"></div>
            </div>
          </div>
        </div>
      </div>
    </sync-slider>
  </div>
</template>
<script>
// import textRadio from '../../../components/textRadio/textRadio'
// import {addressData} from '../../../data/address/addressData'
import {getRecordById, getAllFormTemplates} from '../../../api/patient/patient.js'
let syncSlider = () => import('../../../components/syncSlider/syncSlider.vue')
export default {
  name: 'patient_record',
  components: {
    syncSlider
    // textRadio
  },
  data () {
    return {
      contentBox: {
        content: 'sync-content',
        detail: 'detail'
      },
      activeIndex: 0,
      formData: {},
      smallNavi: [],
      basicInfo: {},
      templates: {}
    }
  },
  mounted () {
    let data = JSON.parse(this.$route.params.id)
    let id = data.recordId
    this.basicInfo = data.basicInfo
    console.log(this.basicInfo)
    this.getRecord(id)
    this.getFormTemplate()
  },
  created () {
    // this.NumInHospital = this.$route.params.id
  },
  methods: {
    changeActiveIndex (activeIndex) {
      this.activeIndex = activeIndex
    },
    scroll (index) {
      console.log(index)
      this.$refs.child.scroll(index)
    },
    // 打印、导出
    printRecord () {
      let subOutputRankPrint = document.getElementById('sync-content')
      let newContent = subOutputRankPrint.innerHTML
      let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    },
    objIntoArr (obj) {
      let arr = []
      for (let i in obj) {
        obj[i].moduleName = i
        arr.push(obj[i])
        if (this.smallNavi.indexOf(obj[i]) < 0) {
          this.smallNavi.push(obj[i])
        }
      }
      // console.log(this.smallNavi)
      return arr
    },
    // 根据表单id 获取表单详情
    async getRecord (info) {
      // let info = this.NumInHospital
      let response = await getRecordById(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.formData = response.data.entity
        let recordCover = {}
        for (let i in this.formData) {
          if (i !== 'forms') {
            recordCover[i] = this.formData[i]
            // recordCover = Object.assign(recordCover, this.formData[i])
          }
        }
        this.formData.recordCover = recordCover
        this.smallNavi.push(recordCover)
        this.mixOptions()
        // this.basic = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    mixOptions () {
      let data = this.formData.forms
      let template = this.templates
      console.log(data)
      console.log(template)
    },
    // 获取表单模板
    async getFormTemplate () {
      // let info = this.NumInHospital
      let response = await getAllFormTemplates()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.templates = response.data.emtity
        // this.allTemplates = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/variable';
  @media print {
  }
  #patient-record{
    overflow: hidden;
    width: 100%;
    height: 100%;
    // min-height: 100%;
    // padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    .basic-title{
      position: absolute;
      right: 0px;
      top: 0;
      left: 200px;
      height: 56px;
      line-height: 56px;
      font-size: 15px;
      background-color: $groupColor;
      border-left: 1px solid #e6e6e6;
      // border-bottom: 1px solid #C1C1C1;
      padding: 0 32px;
      span.hospital-num{
        margin-left: 12px;
      }
      .operate-buttons{
        float: left;
        position: absolute;
        right: 16px;
        top: 0px;
      }
    }
    .sync-slider{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      // 左側導航
      .nav{
        width: 200px;
        height: 100%;
        background-color: #fff;
        .navi{
          cursor: pointer;
          transition: all .5s linear;
          height: 50px;
          line-height: 50px;
          font-size: 14px;
          text-align: center;
        }
        .active{
          background-color: rgba($color: $themeColor, $alpha: .1);
        }
      }
      // 内容区域
      #sync-content{
        margin-top: 50px;
        flex:1;
        overflow: auto;
        background-color: #fff;
        padding: 16px;
        border-left: 1px solid #e6e6e6;
        .detail{
          min-height: 200px;
          box-sizing: border-box;
          padding: 8px 16px;
          // background-color: teal;
          .module-title{
            overflow: hidden;
            height: 40px;
            line-height: 40px;
            display: flex;
            flex-direction: row;
            .module-title-main{
            }
            .right-rounds{
              flex: 1;
              border-bottom: 2px dotted #dfdfdf;
              position: relative;
              bottom: 20px;
              left: 10px;
            }
          }
        }
        .forms{
          .reord-header{
            font-weight: 900;
            padding:0 16px;
            height: 48px;
            line-height: 48px;
            font-size: 16px;
          }
          .bottom-bg{
            margin:0 16px;
            height: 4px;
            background: repeating-linear-gradient(45deg, #ddd 0%,#ddd 0.2%, #fff 0.2%, #fff 0.5%, #ddd 0.5%,#ddd 0.6%);
          }
          .form-recorder{
            padding: 2px 16px;
            height: 30px;
            line-height: 30px;
            .recorder, .checker{
              span{
                margin-left: 10px;
              }
            }
          }
        }
        .detail:nth-of-type(1){
          // margin-top: 50px;
          .basic-cover{
            height: 100vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: center;
            .top{
              // height: 400px;
              .top-logo{
                .hospital{
                  .top-text{
                    margin-top: 50px;
                    line-height: 1.5;
                    div:nth-of-type(1){
                      font-size: 36px;
                    }
                    div:nth-of-type(2){
                      font-size: 16px;
                    }
                  }
                  .logo{
                    margin: 20px;
                  }
                }
              }
              .top-text{
                margin-top: 20px;
                line-height: 1.5;
                div:nth-of-type(1){
                  font-size: 26px;
                }
                div:nth-of-type(2){
                  font-size: 16px;
                }
                .system{
                  margin-top: 10px;
                  span{
                    font-weight: 900;
                  }
                  font-size: 22px;
                }
              }
            }
            .basic-info{
              margin-top: 20px;
              flex: 1;
              .info-title{
                font-size: 22px;
              }
              .info-content{
                font-size: 16px;
                margin: 20px auto;
                .info-case{
                  width: auto;
                  margin: 0px auto;
                  // margin-left: 150px;
                  line-height: 2;
                  // text-align: center;
                  // width: 40%;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  // font-size: 18px;
                  .info-head{
                    // width: 100px;
                    text-align: justify;
                  }
                  .info-detail{
                    text-align: left;
                    // flex: 1;
                    // width: 200px;
                  }
                }
              }
            }
            // height: 250px;
          }
        }
        .bottom{
          height: 400px;
        }
      }
    }
  }
</style>
<style lang="scss">
  @import '../../../assets/css/variable';
  #patient-record .sync-slider{
    .nav{
      .navi{
        .el-submenu__title{
          padding: 0px !important;
          border-bottom: 1px solid rgba($color: $groupColor, $alpha: 1);
          background-color: rgba($color: $groupColor, $alpha: .5);
          color: $commonTetxColor;
        }
        .el-menu{
          border: none;
          .el-menu-item{
            border-bottom: 1px dotted rgba($color: $groupColor, $alpha: 1);
          }
          .el-menu-item-group__title{
            display: none;
          }
        }
      }
    }
  }
</style>
