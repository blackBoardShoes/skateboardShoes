<template>
  <div class='all'>
    <el-button @click="dialogVisibleOpen">Newly build</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible">
      <sx-form  :fields="createdFields" @consoleData="assignment"></sx-form>
    </el-dialog>
    <sx-form edit add :fields="fields" @consoleData="consoleData"></sx-form>
  </div>
</template>

<script>
// import { fieldTest } from '@/api/a/a.js'
export default {
  data () {
    return {
      dialogVisible: false,
      fields: [],
      createdFields: [
        {
          id: 'type',
          label: '请选择类型',
          value: '',
          type: 'RADIO',
          values: [
            {label: '输入框', value: 'INPUT'},
            {label: '整数类型输入框', value: 'INT'},
            {label: '浮点数类型输入框', value: 'DOUBLE'},
            {label: '选择器', value: 'SELECT'},
            {label: '日期选择器', value: 'DATE'},
            {label: '日期时间选择器', value: 'DATETIME'},
            {label: '单选框', value: 'RADIO'},
            {label: '文本标签', value: 'TEXTAREA'},
            {label: '多选框', value: 'CHECKBOX'},
            {label: '开关', value: 'SWITCH'},
            {label: '级联选择器', value: 'CASCADER'},
            {label: '计算', value: 'CALCULATE'}
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
          rules: {
            id: 'type',
            rule_type: 'EQUAL',
            value: 'INPUT'
          },
          validations: [
            { required: true, message: '请输入组件ID', trigger: 'change' }
          ]
        },
        {
          id: 'label',
          label: '标签名字',
          value: '',
          type: 'INPUT',
          rules: {
            id: 'type',
            rule_type: 'EQUAL',
            value: 'INPUT'
          },
          validations: [
            { required: true, message: '请输入组件标签名', trigger: 'change' }
          ]
        },
        {
          id: 'pattern',
          label: '正则',
          type: 'INPUT',
          rules: {
            id: 'type',
            rule_type: 'EQUAL',
            value: 'INPUT'
          }
        },
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
        {
          id: 'required',
          label: '是否必填',
          value: '',
          type: 'RADIO',
          values: [
            {label: '是', value: '0'},
            {label: '否', value: '1'}
          ],
          rules: {
            id: 'type',
            rule_type: 'EQUAL',
            value: 'INPUT'
          }
        }
      ]
    }
  },
  async created () {
    // let a = await fieldTest()
    // console.log(a)
    // this.fields = a.data
  },
  mounted () {},
  methods: {
    assignment (allData) {
      this.formatData(allData)
      this.dialogVisible = false
    },
    formatData (data) {},
    dialogVisibleOpen () {
      this.dialogVisible = true
    },
    consoleData (allData) {
      console.log(allData, 'allData --- success')
    }
  }
}
</script>
<style lang='scss' scoped>
.all {
  height: 100%
}
</style>
