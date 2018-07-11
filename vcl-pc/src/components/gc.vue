<template>
  <div class="hello">
    <div class="content">
      <sx-form add edit sort
        :momo="momo"
        :mozhu="mozhu"
        v-if="gainData"
        @consoleData="consoleData"
        @createFish="createFish"
        @notVerifying="notVerifying"
        @sortAfterData="sortAfterData"></sx-form>
    </div>
    <el-dialog
      title="创建模板"
      v-if="confirmTemplateDialogVisible"
      :visible.sync="confirmTemplateDialogVisible">
      <div style="width:100%;">
        <sx-form :mozhu="confirmAllFish" style="width:100%;"
          @consoleData="confirmData"></sx-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formTest, formTests, fieldTest, fieldTests } from '../api/a/a.js'
// import data from './data.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      // 菜肴
      mozhu: {},
      // 鱼塘
      momo: [],
      gainData: false,
      confirmTemplateDialogVisible: false,
      confirmAllFish: {
        fields: [
          // input
          {
            id: 'id',
            label: 'ID',
            value: '',
            type: 'INPUT',
            validations: [
              // { required: true, message: '请输入组件ID', trigger: 'change' },
              { pattern: '^[a-zA-Z][a-zA-Z0-9]*$', message: '只能输入以英文字母开头的英文或数字', trigger: 'change' }
            ]
          },
          // name
          {
            id: 'name',
            label: '模板名字',
            value: '',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入模板名', trigger: 'change' },
              { pattern: '^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$', message: '不能输入空格或特殊字符', trigger: 'change' }
            ]
          },
          // description
          {
            id: 'description',
            label: '描述',
            value: '',
            type: 'TEXTAREA',
            validations: [
              // { required: true, message: '请输入模板名', trigger: 'change' },
              { pattern: '^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$', message: '不能输入空格或特殊字符', trigger: 'change' }
            ]
          }
        ]
      },
      submitData: {}
    }
  },
  computed: {},
  created () {
    this.firstShow()
  },
  methods: {
    async firstShow () {
      let fms = await formTests() // 菜肴
      if (fms) {
        console.log(fms)
        Object.assign(this.mozhu, fms.data.entity[0])
      }
      let fts = await fieldTests() // 鱼塘
      if (fts) {
        this.momo = [...fts.data.entity]
      }
      // 呈现
      this.gainData = true
      // this.mozhu = fms.data
    },
    // this.$emit('notVerifying', this.mozhuId, this.formModel, , this.relation, this.newFields, idGroup)
    async createFish (what) {
      // 创建鱼
      let ft = await fieldTest(what)
      console.log(ft, '---------')
    },
    async consoleData (mozhuId, formModel, relation, newFields, idGroup, errors, comments) {
      // 一盘会检验味道的 菜
      this.submitData['fields'] = idGroup
      Object.assign(this.submitData, {relation: relation}, {errors: errors}, {comments: comments})
      this.confirmTemplateDialogVisible = true
    },
    async notVerifying (mozhuId, formModel, relation, newFields, idGroup, errors, comments) {
      // 一盘不知道什么味道直接上的 菜
      this.submitData['fields'] = idGroup
      console.log(this.submitData, 'caocaocoacoaocaocoacoao')
      Object.assign(this.submitData, {relation: relation}, {errors: errors}, {comments: comments})
      this.confirmTemplateDialogVisible = true
    },
    async confirmData (mozhuId, formModel, relation, newFields, idGroup, errors, comments) {
      // 服务员记住菜名id 之后 上菜
      Object.assign(this.submitData, formModel)
      console.log(this.submitData, 'success')
      let fm = await formTest(this.submitData)
      console.log(fm)
      this.confirmTemplateDialogVisible = false
    },
    sortAfterData (sortData) {
      console.log(sortData, '--=-=-=-=排序后（删除）-=-=-=')
    }
  }
}
</script>
<style lang="scss" scoped>
.hello {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 80%;
    padding-top:100px;
    padding-bottom:100px;
  }
}
</style>
