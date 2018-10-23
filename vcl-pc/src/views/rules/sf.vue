<template>
  <div class="formAll">
    <div class="formContent">
      <div class="formTopContent">
        <el-menu :default-active="activeIndexNav" class="formTopLeft" mode="horizontal" @select="handleSelect">
          <template v-for="(item, index) in allArr">
            <el-submenu :index="item.value" :key="index" v-if="item.submenu" :show-timeout="100">
              <template slot="title">{{item.label}}</template>
              <el-menu-item v-for="(x, i) in item.submenu" :index="x.value" :key="i">{{x.label}}</el-menu-item>
            </el-submenu>
            <el-menu-item :key="index" :index="item.value" v-else>{{item.label}}</el-menu-item>
          </template>
        </el-menu>
        <div class="formTopRight">
          患者: <span style="color: #117FD1;opacity: 0.9">{{patientInfo.name}}</span> ({{patientInfo.sex}}) 住院编号：{{patientInfo.bh}}
        </div>
      </div>
      <div class="formContentContent">
        <sx-no-route-control :navArr="navArr" :activeIndex="activeIndex" @emitClick="emitClick"></sx-no-route-control>
        <div class="formContentRight">
          <div class="rightContentControl">
            <div class="rightContentControlName">{{navArr[activeIndex] ? navArr[activeIndex].name : ''}}</div>
            <div class="rightContentControlBtn">
              <div @click="generalSubmit">
                <i class="ercp-icon-general-submit"></i>&nbsp;
                阶段提交</div>
              <div @click="generalDelete" style="color: #FF455B;" >
                <i class="ercp-icon-general-delete"></i>&nbsp;
                删除</div>
              <div @click="generalSave">
                <i class="ercp-icon-general-save"></i>&nbsp;
                保存</div>
              <div @click="generalBack" style="color: #878A8D;">
                <i class="ercp-icon-general-back"></i>&nbsp;
                返回</div>
            </div>
          </div>
          <div class="rightContent">
            <div class="rightContentDynamic" v-if="!(navArr[activeIndex] ? navArr[activeIndex].isStatic : false)">
              <sx-min-form
                v-model="fishData"
                ref="thatForm"
                :mozhu="navArr[activeIndex].template"
                @notVerifying="notVerifying"
                @consoleData="consoleData"></sx-min-form>
            </div>
            <div class="rightContentStatic" v-if="navArr[activeIndex] ? navArr[activeIndex].isStatic === 'ssbg' : false">
              <sx-operation-report v-model="ssbgModel" ref="ssbgModel"></sx-operation-report>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sxNoRouteControl from '../../components/submenu/noRouteControl'
import sxOperationReport from '../../components/staticForm/operationReport'
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
      allArr: {
        sf: {
          label: '随访记录',
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
            }
          ]
        }
      },
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
      activeIndexNav: 'sq',
      activeIndex: 0,
      patientInfo: {},
      ssbgModel: {
        operationCheckBox: [],
        operationSelect: [],
        operationSelectMz: [],
        operationSelectJc: [],
        operationSelectHj: [],
        operationDateTime: ''
      }
    }
  },
  created () {
    if (this.$route.params.data) {
      this.patientInfo = JSON.parse(this.$route.params.data)
    }
    this.navArrAssignment()
  },
  methods: {
    init () {},
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
      console.log(b, 'bbbbbbbbbbbbbbbbbbbbbbbb')
      this.navArr = b ? b.subFields : []
    },
    emitClick (data = {}) {
      this.activeIndex = data['index']
      console.log(data)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.activeIndexNav = key
      this.navArrAssignment()
      if (this.$refs['ssbgModel']) {
        this.$nextTick(_ => {
          this.$refs['ssbgModel'].resetForm()
        })
      }
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
    notVerifying (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      console.log(mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate)
    },
    consoleData (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      console.log(mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate)
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
        width: $full;
        overflow: auto;
        .rightContentControl {
          height: $topControl;
          width: $full;
          background: white;
          width: calc($full - 5px);
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
            width: 350px;
          }
          .rightContentControlBtn {
            transition: all .5s;
            flex-grow: 0.25;
            height: $full;
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            margin-right: $marginW;
            div {
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
            div:hover {
              background: $mainBackgroundColor;
            }
          }
        }
        .rightContent {
          width: $full;
          .rightContentDynamic {
            padding: 25px;
          }
          .rightContentStatic {
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
