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
                  <div class="info-head letter-space">
                    <div>民</div>
                    <div>族</div>
                  </div>
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
              <span>录入人员：{{record.header.responseName}}</span>
            </div>
            <div class="recorder float-right">
              <span>审核人员：{{record.header.checkerName}}</span>
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
              <div class="question-case" v-for="(question, index) in module.fields" :key="index">
                <div class="text-question" v-if="question.type !== 'TABLE' && question.label_value !== null">
                  <span :class="{'success-text': question.type === 'TITLE', 'bolder-text': question.type === 'TITLE'}">{{question.label}}：</span>
                  <span>{{typeof (question.label_value) === 'string' ? question.label_value.split('**')[0] : question.real_value}}</span>
                  <span>{{question.unit || ''}}</span>
                </div>
                <div class="table-question" v-if="question.type === 'TABLE'">
                  <p class="success-text bolder-text">{{question.label}}</p>
                  <div class="one-record" v-for="(item, index) in question.real_value" :key="index">
                    <!-- <div class="table-index">{{index + 1}}</div> -->
                    <div v-for="(item2, index2) in item" :key="index2">
                      <span :class="{'success-text': item2.type === 'TITLE', 'bolder-text': item2.type === 'TITLE'}">{{item2.label}}：</span>
                      <span>{{item2.label_value || item2.real_value}}</span>
                      <span>{{item2.unit || ''}}</span>
                    </div>
                  </div>
                  <!-- <el-table
                    :data="tableTransform(question.real_value)"
                    border
                    style="width: 100%">
                    <el-table-column
                      v-for="(item, index3) in question.real_value[0].length"
                      :key="index3"
                      :prop="tableTransform2(question.real_value)[index3].prop"
                      :label="tableTransform2(question.real_value)[index3].label">
                    </el-table-column>
                  </el-table> -->
                </div>
              </div>
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
      text: '患者详情报告生成中',
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
        if (this.formData.forms.length > 0) {
          let last = this.formData.forms[4]
          this.formData.forms.splice(4, 1)
          this.formData.forms.push(last)
        }
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
    // 获取表单模板
    async getFormTemplate () {
      let response = await getAllFormTemplates()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.templates = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 转化表格数据
    tableTransform (tableValue) {
      let arr = []
      tableValue.forEach((item) => {
        let obj = {}
        item.forEach((item2) => {
          obj[item2.id] = item2.label_value || item2.real_value
        })
        arr.push(obj)
      })
      return arr
    },
    // 转化表格数据
    tableTransform2 (tableValue) {
      let arr = []
      tableValue[0].forEach((item2) => {
        let obj = {}
        obj.prop = item2.id
        obj.label = item2.label
        arr.push(obj)
      })
      return arr
    },
    // 混合选项和值
    mixOptions () {
      let forms = this.formData.forms
      let template = this.templates
      forms.forEach((item) => {
        item._template = []
      })
      forms.forEach((form, formIndex) => {
        for (let module in form.data) {
          let moduleTemplate = template.find((n) => n.id === module && n.phase === form.header.phase)
          // 将form.forms.data
          if (moduleTemplate) {
            for (let field in moduleTemplate.fields) {
              // 填充模板内的值
              let fieldId = moduleTemplate.fields[field].id === undefined ? '' : moduleTemplate.fields[field].id
              for (let key in form.data[module]) {
                if (moduleTemplate.fields[field].type === 'RADIO' && moduleTemplate.fields[field].values === undefined) {
                  moduleTemplate.fields[field].type = 'TITLE'
                  this.matchValue(moduleTemplate.fields[field])
                } else if (moduleTemplate.fields[field].type === 'TABLE' && key === fieldId) {
                  moduleTemplate.fields[field].real_value_first = form.data[module][key]
                  this.matchValue(moduleTemplate.fields[field])
                  continue
                } else if (key === fieldId) {
                  moduleTemplate.fields[field].real_value = form.data[module][key]
                  this.matchValue(moduleTemplate.fields[field])
                  continue
                }
              }
            }
            // 将模板推入form._template
            form._template.push(moduleTemplate)
          } else {
            this.$message.warning('未找到' + module + '的模板')
          }
        }
      })
      this.mixForms = forms
      console.log(this.mixForms)
      this.loadingInstance.close()
    },
    // 分离表格题型
    separate (tableItem) {
      let records = tableItem.real_value_first
      let arr = []
      if (records.length > 0) {
        records.forEach((record) => {
          let arr2 = []
          for (let key in record) {
            let fieldTemplate = tableItem.subFields.find((n) => n.id === key)
            fieldTemplate.real_value = record[key]
            // item[key]
            this.matchValue(fieldTemplate)
            arr2.push(fieldTemplate)
          }
          arr.push(arr2)
        })
      }
      return arr
    },
    transformValue (value, options) {
      if (options && value) {
        return (options.find((n) => n.value === value) === undefined ? '' : options.find((n) => n.value === value).label)
      } else {
        return null
      }
    },
    // 匹配真实的value
    matchValue (caseItem, num) {
      // {label: '输入框', value: 'INPUT'},
      // {label: '整数类型输入框', value: 'INT'},
      // {label: '浮点数类型输入框', value: 'DOUBLE'},
      // {label: '文本标签', value: 'TEXTAREA'},
      // {label: '选择器', value: 'SELECT'},
      // {label: '多选选择器', value: 'SELECTMUTIPLE'},
      // {label: '日期选择器', value: 'DATE'},
      // {label: '日期时间选择器', value: 'DATETIME'},
      // {label: '单选框', value: 'RADIO'},
      // {label: '多选框', value: 'CHECKBOX'},
      // {label: '级联选择器', value: 'CASCADER'},
      // {label: '创建表格', value: 'CREATETABLE'},
      // {label: '计算', value: 'CALCULATE'}
      let textValue = ['INPUT', 'TEXTAREA', 'DATETIME', 'CALCULATE', 'DATE', 'INT', 'DOUBLE', 'RADIOTEXT']
      if (textValue.includes(caseItem.type)) {
        // 以文本形式存的值 9
        caseItem.label_value = caseItem.real_value === '' ? null : caseItem.real_value
      } else if (caseItem.type === 'RADIO' || caseItem.type === 'SELECT') {
        // 单选选项
        caseItem.label_value = this.transformValue(caseItem.real_value, caseItem.values)
      } else if (caseItem.type === 'CHECKBOX' || caseItem.type === 'SELECTMUTIPLE') {
        // 多选
        if (caseItem.real_value.length > 0) {
          let arr = []
          caseItem.real_value.forEach((small) => {
            arr.push(this.transformValue(small, caseItem.values))
          })
          let text = ''
          arr.forEach((item, index) => {
            text += (index + 1).toString() + '、' + (item === null ? '' : item)
          })
          caseItem.label_value = text
        } else {
          caseItem.label_value = null
        }
      } else if (caseItem.type === ('CHECKBOXTEXT')) {
        // 多选 ['Tom', 'Jerry', null, null, 'Jackie']格式
        let text = ''
        caseItem.real_value.forEach((item, index) => {
          if (item === null) {
            caseItem.real_value.splice(index, 1)
          }
        })
        // 判断是否存在值，不存在则为null
        if (caseItem.real_value.length > 0) {
          caseItem.real_value.forEach((item, index) => {
            text += (index + 1).toString() + '、' + (item === null ? '' : item)
          })
          caseItem.label_value = text
        } else {
          caseItem.label_value = null
        }
      } else if (caseItem.type === ('TABLE')) {
        caseItem.real_value = this.separate(caseItem)
      } else if (caseItem.type === ('CASCADER')) {
        let arr = []
        let index2
        if (caseItem.real_value.length > 0) {
          caseItem.real_value.forEach((item, index) => {
            let text = ''
            if (index === 0) {
              text += this.transformValue(item, caseItem.children)
              index2 = caseItem.children.find((n) => n.value === item)
            } else {
              text += '-' + this.transformValue(item, index2.children)
            }
            arr.push(text)
          })
          let text = ''
          arr.forEach((item, index) => {
            text += (item === null ? '' : item)
          })
          caseItem.label_value = text
        } else {
          caseItem.label_value = null
        }
      } else {
        // 其他未检索到的类型赋值为其real_value
        caseItem.label_value = caseItem.real_value
      }
      // if (caseItem.label_value === null) {
      //   console.log(caseItem.type)
      //   console.log(caseItem.real_value)
      // }
      // console.log(caseItem.type)
      // console.log(caseItem.label_value)
      // console.log(caseItem.real_value)
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
        margin-top: 56px;
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
      line-height: 1.5;
      .question-case{
        // margin: 5px
        .text-question{
          padding: 8px;
        }
        .table-question{
          padding: 8px;
          border-radius: 4px;
          margin-top: 4px;
          .one-record{
            margin-top: 8px;
            padding: 8px;
            position: relative;
            // .table-index{
            //   position: absolute;
            //   width: 100px;
            //   left: 50%;
            //   margin-left: -50px;
            //   // margin: 0px auto;
            //   // left: 100px;
            //   // right: 100px;
            //   font-weight: 100;
            //   top: 5px;
            //   bottom: 5px;
            //   font-size: 30px;
            //   display: flex;
            //   justify-content: center;
            //   align-items: center;
            //   z-index: -1;
            //   // filter: blur(3px);
            //   color: #666;
            // }
          }
          .one-record::before{
            content: "";
            width: 100%;
            height: 2px;
            position: absolute;
            left: 0;
            top: -2px;
            background: -webkit-gradient(linear,left top,left bottom,from(#999),to(#eee));
            background: linear-gradient(180deg,#999,#eee);
            border-radius: 50%/100% 100% 0 0;
            transform: rotate(180deg);
          }
          .one-record::after{
            content: "";
            width: 100%;
            height: 2px;
            position: absolute;
            left: 0;
            bottom: -2px;
            background: -webkit-gradient(linear,left top,left bottom,from(#999),to(#eee));
            background: linear-gradient(180deg,#999,#eee);
            border-radius: 50%/100% 100% 0 0;
            // transform: rotate(180deg);
          }
        }
        .table-question:hover{
          // padding: 4px;
          // background-color: #dfdfdf;
        }
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
