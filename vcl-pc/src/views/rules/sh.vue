<template>
  <div class="formAll">
    <div class="formContent">
      <div class="formTopContent">
        <el-menu :default-active="activeIndexNav" class="formTopLeft" mode="horizontal" @select="handleSelect">
          <template v-for="(item, index) in allArr">
            <el-submenu :index="item.label" :key="index" v-if="item.submenu" :show-timeout="100">
              <template slot="title">{{item.label}}</template>
              <el-menu-item v-for="(x, i) in item.submenu" :index="x.label" :key="i">{{x.label}}</el-menu-item>
            </el-submenu>
            <el-menu-item :key="index" :index="item.label" v-else>{{item.label}}</el-menu-item>
          </template>
        </el-menu>
        <div class="formTopRight">
          患者: <span style="color: #117FD1;opacity: 0.9">{{patientInfo.patientName}}</span> ({{patientInfo.gender ? '男' : '女'}}) 住院号：{{patientInfo.patientId}}
        </div>
      </div>
      <div class="formContentContent" v-if="Boolean(navArr[activeIndex])">
        <sx-no-route-control :navArr="navArr" :activeIndex="activeIndex" @emitClick="emitClick"></sx-no-route-control>
        <div style="width: 100%;">
          <div class="rightContentControl">
            <div class="rightContentControlName">
              {{navArr[activeIndex] ? navArr[activeIndex].name : ''}}
              &nbsp;
              <el-tooltip class="item" effect="dark" placement="top" :content="navArr[activeIndex] ? navArr[activeIndex].description : ''">
                <div style="font-size:13px;font-weight:400;width: 200px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                  {{navArr[activeIndex] ? navArr[activeIndex].description : ''}}
                </div>
              </el-tooltip>
            </div>
            <div class="rightContentControlBtn">
                <el-badge :value="fishDataComments[navArr[activeIndex].id].length" class="item">
                  <el-button @click="generalSubmit"
                    :disabled="activeIndexNav != patientInfo.phase">
                    <i class="ercp-icon-general-opinion"></i>&nbsp;
                    备注</el-button>
                </el-badge>
              <el-button @click="generalDelete" style="color: #FF455B;" :disabled="activeIndexNav != patientInfo.phase">
                <i class="ercp-icon-general-fail"></i>&nbsp;
                驳回</el-button>
              <el-button type="success" @click="generalSave" :disabled="activeIndexNav != patientInfo.phase">
                <i class="ercp-icon-general-pass"></i>&nbsp;
                通过</el-button>
              <el-button @click="generalBack" style="color: #878A8D;" >
              <!-- :disabled="activeIndexNav != patientInfo.phase"> -->
                <i class="ercp-icon-general-back"></i>&nbsp;
                返回</el-button>
            </div>
          </div>
          <div class="formContentRight">
            <div class="rightContent">
              <div class="rightContentDynamic" v-if="!(navArr[activeIndex] ? navArr[activeIndex].isStatic : false)">
                <sx-min-form
                  v-if="smf"
                  disabled
                  v-model="fishData[navArr[activeIndex].id]"
                  ref="thatForm"
                  :mozhu="navArr[activeIndex]"
                  :mozhuComments="fishDataComments[navArr[activeIndex].id]"
                  @notVerifying="notVerifying"
                  @consoleData="consoleData"></sx-min-form>
              </div>
              <div class="rightContentStatic">
                <sx-operation-report v-model="ssbgModel" ref="ssbgModel" v-if="navArr[activeIndex] ? navArr[activeIndex].isStatic === 'ssbg' : false"></sx-operation-report>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div  v-if="!Boolean(navArr[activeIndex])" style="text-align:center;padding: 150px;">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
import sxNoRouteControl from '../../components/submenu/noRouteControl'
import sxOperationReport from '../../components/staticForm/operationReport'
import { fieldAllForms } from '../../api/form/bdk.js'
import { formdataSave, formdataSubmit, formdataData } from '../../api/rules/lr.js'

export default {
  name: 'rules_index',
  components: {
    sxNoRouteControl,
    sxOperationReport
  },
  data () {
    return {
      // 中间数组
      navArr: [],
      showAllForms: [],
      allArr: {
        zyjb: {
          label: '住院基本情况',
          value: 'zyjb',
          subFields: [
            {
              icon: 'ercp-icon-medicine-report',
              name: '手术报告',
              isStatic: 'ssbg'
            },
            {
              icon: 'ercp-icon-medicine-guidewire',
              name: '导丝',
              template: {
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
                      { pattern: '^[^\\s~！@#￥%……&*（）——+~!@#$%^&*_+]*$', message: '不能输入空格或特殊字符', trigger: 'change' }
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
              }
            }
          ]
        },
        ssjl: {
          label: '手术记录',
          value: 'ssjl',
          submenu: {
            sq: {
              label: '术前',
              value: 'sq',
              subFields: [
                {
                  icon: 'ercp-icon-medicine-report',
                  name: '手术报告',
                  isStatic: 'ssbg'
                },
                {
                  icon: 'ercp-icon-medicine-guidewire',
                  name: '导丝',
                  template: {
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
                  }
                },
                {
                  icon: 'ercp-icon-medicine-guidewire',
                  name: '导丝',
                  disabled: true
                }
              ]
            },
            sz: {
              label: '术中',
              value: 'sz',
              subFields: [
                {
                  icon: 'ercp-icon-medicine-report',
                  name: '手术报告'
                },
                {
                  icon: 'ercp-icon-medicine-guidewire',
                  name: '导丝'
                },
                {
                  icon: 'ercp-icon-medicine-guidewire',
                  name: '导丝',
                  disabled: true
                }
              ]
            },
            sh: {
              label: '术后',
              value: 'sh',
              subFields: [
                {
                  icon: 'ercp-icon-medicine-report',
                  name: '手术报告'
                },
                {
                  icon: 'ercp-icon-medicine-cannula',
                  name: '插管'
                },
                {
                  icon: 'ercp-icon-medicine-guidewire',
                  name: '手术报告',
                  isStatic: 'ssbg'
                }
              ]
            }
          }
        },
        cyzh: {
          label: '出院综合评估',
          value: 'cyzh',
          subFields: [
            {
              icon: 'ercp-icon-medicine-cannula',
              name: '插管'
            },
            {
              icon: 'ercp-icon-medicine-guidewire',
              name: '导丝',
              disabled: true
            }
          ]
        }
        // sf: {
        //   label: '随访记录',
        //   value: 'sf',
        //   subFields: [
        //     {
        //       icon: 'ercp-icon-medicine-cannula',
        //       name: '插管'
        //     },
        //     {
        //       icon: 'ercp-icon-medicine-guidewire',
        //       name: '导丝',
        //       disabled: true
        //     }
        //   ]
        // }
      },
      fishData: {},
      fishDataComments: {},
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
      smf: false
    }
  },
  async created () {
    if (this.$route.params.data) {
      this.patientInfo = JSON.parse(this.$route.params.data)
      this.activeIndexNav = this.patientInfo.phase
    }
    await this.firstShow()
    await this.init()
    this.show()
    // this.navArrAssignment()
  },
  methods: {
    async firstShow () {
      let faf = await fieldAllForms()
      if (faf) {
        this.showAllForms = faf.data.entity
        console.log(this.showAllForms, 'this.showAllForms')
      }
    },
    async show () {
      let a = await formdataData(this.patientInfo.id)
      if (a) {
        this.fishData = a.data.entity ? Object.assign({}, a.data.entity.data) : {}
        this.fishDataComments = a.data.entity ? 'comments' in a.data.entity ? Object.assign({}, a.data.entity.comments) : {} : {}
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
      }
      this.navArr = [...z]
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
    generalSubmit () {
      console.log(this.navArr)
      console.log(this.activeIndex)
      console.log(this.activeIndexNav)
      this.$refs.thatForm.consoleData()
    },
    generalDelete () {},
    generalStorage () {},
    generalSave () {
      this.$refs.thatForm.notVerifying()
    },
    async notVerifying (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      console.log(mozhuId, formModel, relation, newFields, idGroup, comments, coordinate)
      this.fishData[this.navArr[this.activeIndex].id] = formModel
      let commentsId = {}
      commentsId[this.navArr[this.activeIndex].id] = comments
      let fds = await formdataSave(Object.assign(this.patientInfo, { data: this.fishData, comments: commentsId }))
      console.log(fds)
      console.log(this.navArr.length - 1, 'this.activeIndexNav')
      if (this.activeIndex <= this.navArr.length - 1) {
        this.activeIndex++
      }
    },
    async consoleData (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      this.fishData[this.navArr[this.activeIndex].id] = formModel
      // let fds = await formdataSubmit(Object.assign(this.patientInfo, {data: this.fishData}))
      // console.log(fds)
      // if (fds) {
      //   this.show()
      // }
      // this.$router.go(-1)
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
            width: 800px;
            flex-grow: 1;
            padding: 50px 25px;
          }
          .rightContentStatic {}
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
          align-items: center;
          border-left: 9px solid $minorTextColor;
          width: 400px;
        }
        .rightContentControlBtn {
          transition: all .5s;
          // flex-grow: 1;
          width: 500px;
          height: $full;
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          margin-right: $marginW;
          /deep/ .el-button {
            display: flex;
            align-items: center;
            padding-left: $marginW;
            padding-right: $marginW;
            height: $full;
            color: #409D2D;
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
