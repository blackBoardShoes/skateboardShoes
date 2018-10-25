<template>
  <div id="patient-record">
    <!-- 患者详情报告 -->
    <div class="basic-title light-text" v-if="mixForms.length > 0">
      患者：
      <span class="primary-text">{{formData.patientName}}</span>
      <span>（{{formData.gender === 1 ? '男' : '女'}}）</span>
      <span class="hospital-num"> 住院编号：{{formData.operationNum}} </span>
      <div class="operate-buttons">
        <el-button type="primary" @click="printRecord" plain size="small">打印</el-button>
      </div>
    </div>
    <sync-slider :contentBox="contentBox" v-on:changeActiveIndex="changeActiveIndex" ref="child" v-if="mixForms.length > 0">
      <!-- 左側導航 -->
      <div slot="nav" class="nav">
        <div class="navi">
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
                  {{basicInfo.name}}的详情报告
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
                  <div class="menu-icon">
                    <i :class="subMenu.moduleIcon"></i>
                  </div>
                  <div
                    class="text-overflow-ellipsis menu-text"
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
                <div class="">PATIENT DETAILS RECORD</div>
                <div class="system"> <span>ERCP</span>信息录入管理系统</div>
              </div>
            </div>
            <div class="basic-info">
              <div class="info-title">
                患者基本信息
              </div>
              <div class="info-content">
                <div class="info-case">
                  <div class="info-head letter-space">
                    <div>姓</div>
                    <div>名</div>
                  </div>
                  <div class="info-detail text-overflow-ellipsis">：{{basicInfo.name}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head letter-space">
                    <div>性</div>
                    <div>别</div>
                  </div>
                  <div class="info-detail text-overflow-ellipsis">：{{basicInfo.gender === '1' ? '男' : '女'}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">患者民族</div>
                  <div class="info-detail text-overflow-ellipsis">：{{basicInfo.nation}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">住院编号</div>
                  <div class="info-detail text-overflow-ellipsis">：{{basicInfo.hospitalId}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">身份证号</div>
                  <div class="info-detail text-overflow-ellipsis">：{{basicInfo.idCard}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">联系方式</div>
                  <div class="info-detail text-overflow-ellipsis">：{{basicInfo.phoneNum}}</div>
                </div>
                <div class="info-case">
                  <div class="info-head">常居住地</div>
                  <div class="info-detail text-overflow-ellipsis">：{{basicInfo.province !== basicInfo.city ? basicInfo.city : ''}}{{basicInfo.city}}{{basicInfo.district}}{{basicInfo.staAddress}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 具体表单内容 -->
        <div class="forms" v-for="(record, index) in mixForms" :key="index">
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
          <div class="detail" v-for="(module, index) in record._template" :key="index">
            <div class="module-title">
              <div class="module-title-main">
                <i :class="module.icon"></i>
                {{module.name}}
              </div>
              <div class="right-rounds"></div>
            </div>
            <div class="module-content">
              <!-- {{module.fields}} -->
              <p v-for="(question, index) in module.fields" :key="index">
                {{question.label}}：（{{question.real_value}}）（{{question.unit}}）({{question.type}})
              </p>
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
import { Loading } from 'element-ui'
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
      formData: [],
      smallNavi: [],
      basicInfo: {},
      templates: [],
      mixForms: [],
      loadingInstance: ''
    }
  },
  mounted () {
    let data = JSON.parse(this.$route.params.id)
    let id = data.recordId
    this.basicInfo = data.basicInfo
    console.log(this.basicInfo)
    this.getRecord(id)
    this.getFormTemplate()
    this.loadingInstance = Loading.service({
      lock: true,
      target: document.getElementById('patient-record'),
      text: '患者详情报告模板生成中',
      spinner: 'el-icon-loading',
      background: '#fff',
      fullscreen: false
    })
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
      // console.log(this.fullScream)
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
        this.templates.forEach((item) => {
          if (item.id === i) {
            obj[i].moduleName = item.name
            obj[i].moduleIcon = item.icon
          }
        })
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
        // console.log(response.data.entity)
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
        // this.basic = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    mixOptions () {
      let forms = this.formData.forms
      let template = this.templates
      forms.forEach((item) => {
        item._template = []
      })
      forms.forEach((form, formIndex) => {
        for (let module in form.data) {
          let moduleTemplate = template.find((n) => n.id === module)
          // 将form.forms.data
          for (let field in moduleTemplate.fields) {
            // 填充模板内的值
            for (let key in form.data[module]) {
              if (key === moduleTemplate.fields[field].id) {
                moduleTemplate.fields[field].real_value = form.data[module][key]
                continue
              }
            }
          }
          // 将模板推入form._template
          form._template.push(moduleTemplate)
        }
      })
      this.mixForms = forms
      // this.$nextTick(() => {
      this.loadingInstance.close()
      // })
    },
    // 获取表单模板
    async getFormTemplate () {
      let response = await getAllFormTemplates()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.templates = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    }
  },
  watch: {
    'templates': {
      handler: function (newVal) {
        console.log(newVal)
        if (newVal && newVal !== []) {
          if (this.formData && this.formData !== []) {
            this.mixOptions()
          }
        }
      },
      deep: true
    },
    'activeIndex': {
      handler: function (newVal) {
        // console.log(newVal)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/variable';
  #patient-record{
    overflow: hidden;
    width: 100%;
    height: 100%;
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
        position: relative;
        z-index: 2;
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
            // padding: 0 30px;
            // padding-left: 30px !important;
            border-bottom: 1px dotted rgba($color: $groupColor, $alpha: 1);
            display: flex;
            flex-direction: row;
            .menu-icon{
              width: 40px;
            }
            .menu-text{
              flex: 1;
              text-align: left;
            }
          }
          .el-menu-item-group__title{
            display: none;
          }
        }
      }
    }
  }
  .detail{
    // min-height: 200px;
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
        min-width: 80px;
        font-size: 15px;
        font-weight: 700;
      }
      .right-rounds{
        flex: 1;
        border-bottom: 2px dotted #ddd;
        position: relative;
        bottom: 20px;
        left: 10px;
      }
    }
    .module-content{
      font-size: 15px;
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
      height: 3px;
      background: repeating-linear-gradient(45deg, #9DA0A3 0%,#9DA0A3 0.1%, #fff 0.1%, #fff 0.2%, #9DA0A3 0.2%, #9DA0A3 0.3%, #fff 0.3%, #fff 0.4%);
    }
    .form-recorder{
      padding: 2px 16px;
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      .recorder, .checker{
        min-width: 220px;
        span{
          margin-left: 10px;
        }
      }
    }
  }
  // 封面
  .detail:nth-of-type(1){
    // margin-top: 50px;
    .basic-cover{
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
          font-size: 24px;
        }
        .info-content{
          font-size: 16px;
          margin: 20px auto;
          .info-case{
            width: auto;
            margin: 0px auto;
            // margin-left: 50px;
            line-height: 2;
            // text-align: center;
            // width: 40%;
            width: 400px;
            display: flex;
            flex-direction: row;
            // justify-content: center;
            // font-size: 18px;
            .info-head{
              width: 4em;
              margin-left: 8em;
            }
            .letter-space{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            .info-detail{
              text-align: left;
              // width: 200px;
              flex: 1;
              margin-left: 3px;
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
</style>
