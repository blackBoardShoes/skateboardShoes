<template>
  <div class="formAll">
    <div class="formContent">
      <div class="formTopContent">
        <!-- <el-menu :default-active="activeIndexNav" class="formTopLeft" mode="horizontal" @select="handleSelect">
          <template v-for="(item, index) in allArr">
            <el-submenu :disabled="!['术前', '术中', '术后'].includes(activeIndexNav)" :index="item.label" :key="index" v-if="item.submenu" :show-timeout="100">
              <template slot="title">{{item.label}}</template>
              <el-menu-item :disabled="activeIndexNav !== x.label" v-for="(x, i) in item.submenu" :index="x.label" :key="i">
                {{x.label}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item :disabled="activeIndexNav !== item.label" :key="index" :index="item.label" v-else>{{item.label}}</el-menu-item>
          </template>
        </el-menu> -->
        <el-menu :default-active="activeIndexNav" class="formTopLeft" mode="horizontal" @select="handleSelect">
          <el-menu-item :index="activeIndexNav">{{activeIndexNav}}</el-menu-item>
        </el-menu>
        <div class="formTopRight">
          患者: <span style="color: #117FD1;opacity: 0.9">{{patientInfo.patientName}}</span>
          &nbsp;({{(patientInfo.gender === '男' | patientInfo.gender === '1') ? '男' : (patientInfo.gender === '女' | patientInfo.gender === '0') ? '女' : '无'}})&nbsp;&nbsp;&nbsp;&nbsp;
          住院号: {{patientInfo.patientId}}
        </div>
      </div>
      <div class="formContentContent" v-if="Boolean(navArr[activeIndex])">
        <sx-no-route-control :navArr="navArr" :activeIndex="activeIndex" @emitClick="emitClick"></sx-no-route-control>
        <div style="width: 100%">
          <div class="rightContentControl">
            <div class="rightContentControlName">
              <div v-if="navArr[activeIndex].name.length < 14">
                {{navArr[activeIndex] ? navArr[activeIndex].name : ''}}&nbsp;&nbsp;
              </div>
              <el-tooltip class="item" effect="dark" placement="top" :content="navArr[activeIndex] ? navArr[activeIndex].name : ''" v-else>
                <div style="font-weight: bold;width: 210px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                  {{navArr[activeIndex] ? navArr[activeIndex].name : ''}}
                </div>
              </el-tooltip>
              <!-- <el-tooltip v-if="navArr[activeIndex] ? navArr[activeIndex].description : false" class="item" effect="dark" placement="top" :content="navArr[activeIndex] ? navArr[activeIndex].description : ''">
                <div style="font-size:13px;font-weight:400;width: 180px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                  {{navArr[activeIndex] ? navArr[activeIndex].description : ''}}
                </div>
              </el-tooltip> -->
            </div>
            <div class="rightContentControlBtn">
              <el-button @click="generalSubmit"
                v-if="navArr.length - 1 === activeIndex"
                :disabled="activeIndexNav != patientInfo.phase">
                <i class="ercp-icon-general-submit"></i>&nbsp;
                阶段提交</el-button>
              <!-- <div style="width: 120px;" v-else></div> -->
              <el-button @click="generalDelete" style="color: #FF455B;" :disabled="activeIndexNav != patientInfo.phase">
                <i class="ercp-icon-general-delete"></i>&nbsp;
                删除</el-button>
              <el-button @click="generalSave" :disabled="activeIndexNav != patientInfo.phase">
                <i class="ercp-icon-general-save"></i>&nbsp;
                保存</el-button>
              <!-- <el-button @click="generalBack" style="color: #878A8D;" >
                <i class="ercp-icon-general-back"></i>&nbsp;
                返回</el-button> -->
            </div>
          </div>
          <div class="formContentRight">
            <div class="rightContent">
              <div class="rightContentDynamic" v-if="!navArr[activeIndex].isStatic">
                <sx-min-form
                  :question="question"
                  v-if="smf"
                  :disabled="activeIndexNav != patientInfo.phase"
                  v-model="fishData[navArr[activeIndex].id]"
                  ref="thatForm"
                  :mozhu="navArr[activeIndex]"
                  @notVerifying="notVerifying"
                  @consoleData="consoleData"></sx-min-form>
              </div>
              <div class="rightContentStatic" v-else>
                <!-- v-model="ssbgModel" -->
                <sx-operation-report
                  v-model="fishData[navArr[activeIndex].id]"
                  :fishData="fishData"
                  :mozhu="navArr"
                  ref="ssbgModel" v-if="smf && (navArr[activeIndex].name === '手术报告')"></sx-operation-report>
                <sx-radiography
                  ref="zyModel"
                  v-model="fishData[navArr[activeIndex].id]"
                  v-if="smf && (navArr[activeIndex].name === '鼻胆/胰管造影')"></sx-radiography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div  v-if="!Boolean(navArr[activeIndex])" style="text-align:center;padding: 150px;">
        暂无数据
      </div>
    </div>
    <el-dialog
      append-to-body
      modal-append-to-body
      :close-on-click-modal="false"
      v-if="undoneFilledFormDialogVisible"
      :visible.sync="undoneFilledFormDialogVisible">
      <sx-min-form
        addNormal
        submitTF v-model="undoneFilledFormData" :mozhu="undoneFilledFormDataMozhu[user.type]"
        @consoleData="undoneFilledFormConsoleData" ></sx-min-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import sxNoRouteControl from '../../components/submenu/noRouteControl'
import sxOperationReport from '../../components/staticForm/operationReport'
import sxRadiography from '../../components/staticForm/radiography'
import { fieldAllForms } from '../../api/form/bdk.js'
import { formdataSave, formdataSubmit, formdataData, userByMyType } from '../../api/rules/lr.js'
import { termbaseGetAllTermbases } from '../../api/form/syk.js'
export default {
  name: 'rules_index',
  components: {
    sxNoRouteControl,
    sxOperationReport,
    sxRadiography
  },
  data () {
    return {
      // 中间数组
      question: {},
      navArr: [],
      showAllForms: [],
      allArr: {},
      fishData: {},
      allFish: {
        relation: {
          pattern: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          message: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          example: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          required: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'SELECT', 'SELECTMUTIPLE', 'DATE', 'DATETIME', 'RADIO', 'TEXTAREA', 'CHECKBOX', 'CASCADER']
          },
          tree: {
            target: 'type',
            rule_type: 'EQUAL',
            value: 'CASCADER'
          },
          layerTree: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['SELECT', 'SELECTMUTIPLE', 'RADIO', 'CHECKBOX']
          },
          radioAgain: {
            target: 'type',
            rule_type: 'EQUAL',
            value: 'RADIO'
          },
          createCalculate: {
            target: 'type',
            rule_type: 'EQUAL',
            value: 'CREATECALCULATE'
          },
          createTable: {
            target: 'type',
            rule_type: 'EQUAL',
            value: 'CREATETABLE'
          }
        },
        fields: [
          {
            id: 'type',
            label: '请选择类型',
            value: '',
            type: 'RADIO',
            values: [
              {label: '输入框', value: 'INPUT'},
              {label: '整数类型输入框', value: 'INT'},
              {label: '浮点数类型输入框', value: 'DOUBLE'},
              {label: '文本标签', value: 'TEXTAREA'},
              {label: '选择器', value: 'SELECT'},
              {label: '多选选择器', value: 'SELECTMUTIPLE'},
              {label: '日期选择器', value: 'DATE'},
              {label: '日期时间选择器', value: 'DATETIME'},
              {label: '单选框', value: 'RADIO'},
              {label: '多选框', value: 'CHECKBOX'},
              {label: '级联选择器', value: 'CASCADER'},
              {label: '创建表格', value: 'CREATETABLE'},
              {label: '计算', value: 'CREATECALCULATE'}
            ],
            validations: [
              { required: true, message: '请选择类型', trigger: 'change' }
            ]
          },
          // input
          {
            id: 'id',
            label: 'ID',
            value: '',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入组件ID', trigger: 'change' },
              { pattern: '^[a-zA-Z][a-zA-Z0-9]+$', message: '只能输入以英文字母开头的英文或数字(两位以上)', trigger: 'change' }
            ]
          },
          // label
          {
            id: 'label',
            label: '标签名字',
            value: '',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入组件标签名', trigger: 'change' },
              { pattern: '^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$', message: '不能输入空格或特殊字符', trigger: 'change' }
            ]
          },
          // patten
          {
            id: 'pattern',
            label: '正则',
            type: 'INPUT'
          },
          // patten message
          {
            id: 'message',
            label: '正则提示信息',
            type: 'INPUT',
            rules: {
              id: 'type',
              rule_type: 'EQUAL',
              value: 'INPUT'
            }
          },
          // patten
          {
            id: 'example',
            label: '正则例子',
            type: 'EXAMPLE'
          },
          // tree
          {
            id: 'tree',
            label: '创建级联',
            type: 'TREE',
            values: []
          },
          // layertree
          {
            id: 'layerTree',
            label: '创建选项',
            type: 'LAYERTREE',
            values: []
          },
          // required
          {
            id: 'required',
            label: '是否必填',
            value: '',
            type: 'RADIO',
            values: [
              {label: '是', value: 1},
              {label: '否', value: 0}
            ]
          },
          {
            id: 'createCalculate',
            label: 'ID公式',
            value: '',
            type: 'CREATECALCULATE',
            validations: [
              { required: true, message: '请输入需要计算的 ID 公式,如 (id1+id2)', trigger: 'blur' }
            ]
          },
          // createtable
          {
            id: 'createTable',
            label: '创建表格',
            type: 'CREATETABLE',
            values: []
          }
        ]
      },
      activeIndexNav: '住院基本情况',
      activeIndex: 0,
      patientInfo: {},
      ssbgModel: {
        operationCheckBox: [],
        operationSelect: [],
        operationSelectMz: [],
        operationSelectJc: [],
        operationSelectHj: [],
        operationDateTime: ''
      },
      smf: false,
      // UndoneFilledFormDialogVisible
      undoneFilledFormDialogVisible: false,
      undoneFilledFormData: {},
      undoneFilledFormDataMozhu: {
        科研护士: {
          fields: [
            {
              id: 'responseName',
              label: '记录者',
              values: [],
              type: 'SELECT',
              validations: [
                { required: true, message: '请选择记录者', trigger: 'change' }
              ]
            }
          ]
        },
        诊疗中心: {
          fields: [
            {
              id: 'responseName',
              label: '记录者',
              values: [],
              type: 'SELECT',
              validations: [
                { required: true, message: '请选择记录者', trigger: 'change' }
              ]
            }
            // {
            //   id: 'responseName',
            //   label: '记录者',
            //   type: 'INPUT',
            //   validations: [
            //     { required: true, message: '请输入姓名', trigger: 'change' }
            //   ]
            // }
          ]
        }
      },
      ubmtData: [],
      notVerifyingTF: false,
      consoleDataTF: false
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  async created () {
    if (this.$route.params.data) {
      this.patientInfo = JSON.parse(this.$route.params.data)
      this.activeIndexNav = this.patientInfo.phase
    }
    console.log(this.patientInfo, 'patientInfopatientInfopatientInfo')
    await this.firstShow()
    await this.init()
    this.show()
    // this.navArrAssignment()
  },
  methods: {
    async firstShow () {
      let tgpt = await termbaseGetAllTermbases()
      if (tgpt) {
        for (let i in tgpt.data.entity) {
          if (tgpt.data.entity[i].emerge) {
            this.question[i] = tgpt.data.entity[i]
          }
        }
      }
      let faf = await fieldAllForms()
      if (faf) {
        this.showAllForms = faf.data.entity
      }
    },
    async show () {
      let a = await formdataData(this.patientInfo.id)
      if (a) {
        this.fishData = a.data.entity ? Object.assign({}, a.data.entity.data) : {}
      }
      console.log(a, 'firstShow')
    },
    async init () {
      this.navArr = []
      let z = []
      for (let i of this.showAllForms) {
        if (i.phase === this.activeIndexNav) {
          await z.push(i)
        }
        // if (i.name === '手术报告') {
        //   console.log('已过滤手术报告')
        // } else {
        //   if (i.phase === this.activeIndexNav) {
        //     await z.push(i)
        //   }
        // }
      }
      this.navArr = [...z]
      console.log(this.navArr, 'this.navArrthis.navArrthis.navArr')
      this.smf = true
    },
    navArrAssignment () {
      let a = (_) => {
        for (let i in _) {
          if (_[i].value === this.activeIndexNav) {
            return _[i]
          } else {
            if ('submenu' in _[i]) {
              if (a(_[i].submenu)) {
                return a(_[i].submenu)
              }
            }
          }
        }
      }
      let b = a(this.allArr)
      this.navArr = b ? b.subFields : []
    },
    async emitClick (data = {}) {
      this.smf = false
      this.activeIndex = data['index']
      console.log(this.activeIndex, 'this.activeIndex')
      setTimeout(_ => {
        this.smf = true
      }, 1)
    },
    async handleSelect (key, keyPath) {
      this.smf = false
      this.activeIndexNav = key
      this.activeIndex = 0
      setTimeout(_ => {
        this.init()
      }, 1)
      // this.navArrAssignment()
      // if (this.$refs['ssbgModel']) {
      //   this.$nextTick(_ => {
      //     this.$refs['ssbgModel'].resetForm()
      //   })
      // }
      // this.navArr = this.allArr[key].subFields
    },
    async generalSubmit () {
      this.undoneFilledFormData = {}
      if (this.user.type === '科研护士') {
        this.ubmtData = await userByMyType()
        this.undoneFilledFormDataMozhu['科研护士'].fields[0].values = [...this.ubmtData.data.entity]
      } else {
        this.ubmtData = await userByMyType()
        this.undoneFilledFormDataMozhu['诊疗中心'].fields[0].values = [...this.ubmtData.data.entity]
        console.log(this.patientInfo)
      }
      this.undoneFilledFormDialogVisible = true
    },
    generalDelete () {
      if (!this.navArr[this.activeIndex].isStatic) {
        this.$refs.thatForm.clearData()
      } else {
        if (this.$refs['ssbgModel']) {
          this.$refs.ssbgModel.clearData()
        }
        if (this.$refs['zyModel']) {
          this.$refs.zyModel.clearData()
        }
      }
    },
    async generalSave () {
      if (!this.navArr[this.activeIndex].isStatic) {
        await this.$refs.thatForm.notVerifying()
      } else {
        if (this.$refs['zyModel']) {
          await this.$refs.zyModel.saveData()
        }
        if (this.$refs['ssbgModel']) {
          await this.$refs.ssbgModel.consoleData()
        }
        this.notVerifyingTF = true
        console.log(this.fishData, 'this.fishData')
      }
      console.log(this.user, 'truetruetruetruetrue123123123')
      if (this.notVerifyingTF) {
        let fds = await formdataSave(Object.assign(this.patientInfo, {data: this.fishData}, { whatUser: this.user }))
        if (fds) {
          if (this.activeIndex < this.navArr.length - 1) {
            this.smf = false
            this.activeIndex++
            setTimeout(_ => {
              this.smf = true
            }, 1)
          }
          // await this.show()
        }
        this.notVerifyingTF = false
      }
    },
    async notVerifying (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      // this.fishData[this.navArr[this.activeIndex].id] = formModel
      this.$set(this.fishData, this.navArr[this.activeIndex].id, formModel)
      this.notVerifyingTF = true
    },
    async consoleData (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      // this.fishData[this.navArr[this.activeIndex].id] = formModel
      this.$set(this.fishData, this.navArr[this.activeIndex].id, formModel)
      this.consoleDataTF = true
    },
    async undoneFilledFormConsoleData (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      console.log(mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate)
      if (!this.navArr[this.activeIndex].isStatic) {
        await this.$refs.thatForm.consoleData()
      } else {
        if (this.$refs['zyModel']) {
          await this.$refs.zyModel.saveData()
        }
        if (this.$refs['ssbgModel']) {
          await this.$refs.ssbgModel.consoleData()
        }
        this.consoleDataTF = true
        console.log(this.fishData, 'this.fishData')
      }
      if (this.consoleDataTF) {
        if (this.user.type === '科研护士') {
          for (let i of this.ubmtData.data.entity) {
            if (i.value === formModel['responseName']) {
              this.patientInfo.header = Object.assign(this.patientInfo.header, { responseId: i.uuid, responseName: i.label })
            }
          }
        } else {
          for (let i of this.ubmtData.data.entity) {
            if (i.value === formModel['responseName']) {
              this.patientInfo.header = Object.assign(this.patientInfo.header, { responseId: i.uuid, responseName: i.label })
            }
          }
          // this.patientInfo.header = Object.assign(this.patientInfo.header, formModel, { responseId: this.user.id })
        }
        let fds = await formdataSubmit(Object.assign(this.patientInfo, {data: this.fishData}))
        console.log(this.patientInfo.header, 'patientInfo.headerpatientInfo.headerpatientInfo.header')
        if (fds) {
          this.generalBack()
        }
        this.consoleDataTF = false
      }
    },
    generalBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/variable';
$full: 100%;
$topControl: 42px;
$marginW: 15px;
.formAll {
  height: $full;
  width: $full;
  .formContent {
    height: $full;
    width: $full;
    display: flex;
    flex-direction: column;
    .formTopContent {
      height: $topControl;
      width: $full;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $mainBackgroundColor;
      .formTopLeft {
        display: flex;
        background: $mainBackgroundColor;
        border: none;
        /deep/ .el-menu-item, /deep/ .el-submenu__title, /deep/ .is-active {
          height: $full;
          line-height: 37px;
          background: transparent;
        }
      }
      .formTopRight {
        margin-right: 20px;
        font-size: 14px;
        color: $minorTextColor;
      }
      // padding: 0 28px;
    }
    .formContentContent {
      width: $full;
      display: flex;
      height: $full;
      // box-sizing: border-box;
      .formContentRight {
        height: $full;
        // width: $full;
        overflow: auto;
        .rightContent {
          width: $full;
          // overflow: auto;
          padding-bottom: 150px;
          display: flex;
          .rightContentDynamic {
            // width: 800px;
            flex-grow: 1;
            // width: $full;
            // box-sizing: border-box;
            padding: 50px 25px;
          }
          .rightContentStatic {
            padding: 50px 25px;
            // width: $full;
            flex-grow: 1;
          }
        }
      }
      .rightContentControl {
        height: $topControl;
        width: $full;
        background: white;
        // width: calc($full - 5px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .rightContentControlName {
          padding-left: 10px;
          font-weight: bold;
          margin-left: $marginW;
          height: $marginW;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 9px solid $minorTextColor;
          // width: 200px;
        }
        .rightContentControlBtn {
          transition: all .5s;
          // flex-grow: 1;
          width: 400px;
          height: $full;
          display: flex;
          justify-content: flex-end;
          font-weight: bold;
          margin-right: $marginW;
          /deep/ .el-button {
            display: flex;
            align-items: center;
            padding-left: $marginW;
            padding-right: $marginW;
            height: $full;
            color: #117FD1;
            border: none;
            background: transparent;
            font-weight: bold;
            font-size: 16px;
            height: $full;
            border-radius: 0;
          }
          /deep/ .el-button:hover {
            background: $mainBackgroundColor;
          }
        }
      }
    }
  }
  .slotFormClass {
    width: $full;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      color:$mainTextColor;
      font-size: 30px;
    }
    span{
      color: $minorTextColor;
      font-size: 14px;
    }
  }
}
</style>
