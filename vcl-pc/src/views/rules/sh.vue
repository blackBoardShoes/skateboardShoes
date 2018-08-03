<template>
  <div class="formAll">
    <div class="formContent">
      <div class="formTopContent">
        <el-menu :default-active="activeIndex" class="formTopLeft" mode="horizontal" @select="handleSelect">
          <el-menu-item index="sq">术前记录</el-menu-item>
          <el-menu-item index="sz">术中记录</el-menu-item>
          <el-menu-item index="sh">术后记录</el-menu-item>
          <el-menu-item index="sf">随访记录</el-menu-item>
        </el-menu>
        <div class="formTopRight">
          患者: <span style="color: #117FD1;opacity: 0.9">鲁斯</span> (女 100岁) 住院编号：123123
        </div>
      </div>
      <div class="formContentContent">
        <sx-no-route-control :navArr="navArr" @emitClick="emitClick"></sx-no-route-control>
        <div class="formContentRight">
          <div class="rightContentControl"></div>
          <div class="rightContent">
            <!--
              inline
              label-position="right"
              label-width="100px"
            -->
            <sx-min-form
              v-model="fishData"
              ref="thatForm"
              :mozhu="allFish"></sx-min-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sxNoRouteControl from '../../components/submenu/noRouteControl'
export default {
  name: 'rules_index',
  components: {
    sxNoRouteControl
  },
  data () {
    return {
      navArr: [
        {
          path: '#aa-1',
          icon: 'el-icon-setting',
          name: '表单库'
        },
        {
          path: '#aa-2',
          index: 'zdk',
          icon: 'el-icon-setting',
          name: '字段库'
        },
        {
          path: '#aa-3',
          index: 'syk',
          icon: 'el-icon-setting',
          name: '术语库'
        }
      ],
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
      allFish1: {
        fields: [
          {
            id: 'type',
            label: '请选择类型请选择类型请选择类型请选择类型请选择类型请选择类型请选择类型',
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
      activeIndex: '1'
    }
  },
  created () {
    console.log(this.$route.params.data)
    console.log(JSON.parse(this.$route.params.data))
  },
  methods: {
    emitClick (data) {
      this.allFish = this.allFish1
      console.log(data)
    },
    handleSelect () {}
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/variable';
$full: 100%;
$topControl: 42px;
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
        background: $mainBackgroundColor;
        border: none;
        /deep/ .el-menu-item, .el-submenu__title, .is-active {
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
      display: flex;
      height: $full;
      .formContentRight {
        height: $full;
        overflow: auto;
        .rightContentControl {
          height: $topControl;
          background: white;
          width: calc($full - 5px);
        }
        .rightContent {
          padding: 20px;
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
