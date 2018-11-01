<template>
  <div class='all'>
    <el-form
      size="mini"
      :rules="rules"
      :model="contentModel" ref="contentModel"
      label-width="120px">
      <el-form-item label="是否造影" prop="radiographyOrNot" >
        <el-radio-group v-model="contentModel.radiographyOrNot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="造影管道" prop="radiographyPipeline" v-if="contentModel.radiographyOrNot">
        <el-radio-group v-model="contentModel.radiographyPipeline">
          <el-radio :label="1">鼻胆管</el-radio>
          <el-radio :label="2">鼻胰管</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="造影时间"  prop="imagingTime" v-if="contentModel.radiographyPipeline">
        <div style="display: flex;justify-content: space-between">
          术后
          <el-input v-model="contentModel.imagingTime" style="width:90%"></el-input>
          天
        </div>
      </el-form-item>
      <el-form-item label="造影结果" prop="imagingResult" v-if="contentModel.radiographyPipeline">
        <div class="editContain">
          <div v-for="(item, index) in content" :key="index">
            <div v-if="item['type']" style="height: 26px;">
              <el-form-item
                v-if="item.vIf ? contentModel[item.vIf.id] === item.vIf.value : true"
                :label-width="item.labelWidth"
                :label="item.label"
                :prop="item.id"
                :rules="item.validations">
                <div style="display: flex">
                  <!-- @change.native="changeRules" -->
                  <el-select
                    :style="{ width: 40 + contentModel[item.id].toString().length * 7 + 'px !important', height: '100%' }" v-if="item['type'] === 'SELECT'" v-model="contentModel[item.id]" placeholder="">
                    <el-option
                      v-for="option in item.values"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value">
                    </el-option>
                  </el-select>
                  <el-input :style="{ width: 55 + contentModel[item.id].toString().length * 6 + 'px !important', height: '100%' }"
                    v-if="item['type'] === 'INPUT'" v-model="contentModel[item.id]"></el-input>
                  <div style="max-width: 50px;text-align:center" v-if="item.unit">
                    {{item.unit}}
                  </div>
                </div>
                <el-date-picker
                  :style="{ width: 40 + contentModel[item.id].toString().length * 6 + 'px !important', height: '100%' }"
                  v-if="item['type'] === 'DATE'"
                  v-model="contentModel[item.id]"
                  type="date"
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                  placeholder="">
                </el-date-picker>
                <el-radio-group
                  style="min-width: 100px"
                  v-if="item['type'] === 'RADIO'"
                  v-model="contentModel[item.id]">
                  <el-radio
                    v-for="option in item.values"
                    :key="option.value"
                    :label="option.label"></el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <span v-else>{{item}}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="是否通畅" prop="unobstructed"  v-if="contentModel.radiographyPipeline&contentModel.radiographyOrNot">
        <el-radio-group v-model="contentModel.unobstructed">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否冲洗" prop="irrigation"  v-if="contentModel.radiographyPipeline&contentModel.radiographyOrNot">
        <el-radio-group v-model="contentModel.irrigation">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否在位" prop="incumbent"  v-if="contentModel.radiographyPipeline&contentModel.radiographyOrNot">
        <el-radio-group v-model="contentModel.incumbent">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="拔除时间" prop="removeTime"  v-if="contentModel.radiographyPipeline&contentModel.radiographyOrNot">
        <div style="display:flex">
          <div style="width: 50px;">
            术后
          </div>
          <el-input v-model="contentModel.removeTime" style="width:90%"></el-input>
          <div style="width: 50px;text-align:center">
            天
          </div>
        </div>
      </el-form-item>
    </el-form>
    <!-- {{contentModel}} -->
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default () {
        return {
          radiographyOrNot: '',
          radiographyPipeline: '',
          imagingTime: '',
          unobstructed: '',
          irrigation: '',
          incumbent: '',
          removeTime: ''
        }
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler (value) {
        this.contentModel = Object.assign({}, value)
      }
    },
    'contentModel.radiographyOrNot' (val) {
      let arr = ['radiographyPipeline', 'imagingTime', 'unobstructed', 'irrigation', 'incumbent', 'removeTime']
      for (let i of arr) {
        this.contentModel[i] = ''
      }
    },
    'contentModel.radiographyPipeline' (val) {
      console.log(val)
      if (val === 1) {
        this.text = this.dText
      } else {
        this.text = this.yText
      }
      this.init()
    }
  },
  data () {
    return {
      text: '',
      dText: `
        胆总管
        {{"id":"choledocho","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        ，直径
        {{"id": "dia","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "1-10" }]}}
        mm，伴
        {{"id":"choledochoNarrowLocation","type": "SELECT","values":[{"label": "肝门部胆管", "value": "肝门部胆管"},{"label": "胆管中段", "value": "胆管中段"},{"label": "胆管下端", "value": "胆管下端"},{"label": "胆管下段", "value": "胆管下段"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        狭窄，
        狭窄长度
        {{"id": "narrowLength","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "1-10" }]}}
        mm，
        肝内胆管
        {{"id":"intrahepaticBileDuct","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"},{"label": "未显影", "value": "未显影"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        。胆总管内
        {{"id":"choledocholithiasis","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        见结石负影，
        {{"vIf": {"id":"choledocholithiasis", "value": "可"},"label":"结石数目","labelWidth": "70px","unit": "枚，","id": "calculusAmount1","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[1-9]{0,1}$|^10$", "message": "1-10" }]}}
        {{"vIf": {"id":"choledocholithiasis", "value": "可"},"label":"最大结石直径","labelWidth": "100px","unit": "mm，","id": "maxCalculusDia1","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]{0,2}([.]{1}[0-9]+){0,1}$|^[1-2][0-9]{0,2}([.]{1}[0-9]+){0,1}$|^300$", "message": "小数或整数0-300" }]}}
        肝内胆管
        {{"id":"hepatolithiasis","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        见结石负影，
        {{"vIf": {"id":"hepatolithiasis", "value": "可"},"label":"结石位于","labelWidth": "70px","id":"calculusLocation","type": "SELECT","values":[{"label": "左", "value": "左"},{"label": "右", "value": "右"},{"label": "全肝内", "value": "全肝内"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        {{"vIf": {"id":"hepatolithiasis", "value": "可"},"label":"结石数目","labelWidth": "70px","id": "calculusAmount2","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[1-9]{0,1}$|^10$", "message": "1-10" }]}}
        {{"vIf": {"id":"hepatolithiasis", "value": "可"},"labelWidth": "130px","unit": "mm，","label": "枚，最大结石直径","id": "maxCalculusDia2","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]{0,2}([.]{1}[0-9]+){0,1}$|^[1-2][0-9]{0,2}([.]{1}[0-9]+){0,1}$|^300$", "message": "小数或整数0-300" }]}}
        {{"id":"contrastMediaLeakage","type": "SELECT","values":[{"label": "有", "value": "有"},{"label": "无", "value": "无"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        造影剂外漏
        {{"vIf": {"id":"contrastMediaLeakage", "value": "有"},"label":"，部位","labelWidth": "55px","unit": "胆管。","id":"leakageLocation","type": "SELECT","values":[{"label": "肝内", "value": "肝内"},{"label": "上段", "value": "上段"},{"label": "中段", "value": "中段"},{"label": "下段", "value": "下段"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
      `,
      yText: `
        主胰管
        {{"id":"wirsung","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        ，直径
        {{"id": "dia","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "1-10" }]}}
        mm，
        伴胰
        {{"id":"wirsungNarrowLocation","type": "SELECT","values":[{"label": "头", "value": "头"},{"label": "颈", "value": "颈"},{"label": "体", "value": "体"},{"label": "体", "value": "尾"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        部狭窄，
        狭窄长度
        {{"id": "narrowLength","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "1-10" }]}}
        mm。
        胰管内
        {{"id":"pancreatolithiasis","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        见结石负影，
        {{"vIf": {"id":"pancreatolithiasis", "value": "可"},"label":"结石数目","unit": "枚，","labelWidth": "70px","id": "calculusAmount3","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "1-10" }]}}
        {{"vIf": {"id":"pancreatolithiasis", "value": "可"},"label":"最大结石直径","labelWidth": "100px","unit": "mm，","id": "maxCalculusDia3","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]{0,2}([.]{1}[0-9]+){0,1}$|^[1-2][0-9]{0,2}([.]{1}[0-9]+){0,1}$|^300$", "message": "小数或整数0-300" }]}}
        {{"id":"contrastMediaLeakage","type": "SELECT","values":[{"label": "有", "value": "有"},{"label": "无", "value": "无"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        造影剂外漏
        {{"vIf": {"id":"contrastMediaLeakage", "value": "有"},"labelWidth": "55px","label":"，部位","unit": "胰管。","id":"nasopancreaticTubeleakageLocation","type": "SELECT","values":[{"label": "头", "value": "头"},{"label": "颈", "value": "颈"},{"label": "体", "value": "体"},{"label": "体", "value": "尾"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
      `,
      relation: {
        // a
        calculusAmount1: {
          target: 'choledocholithiasis',
          value: '可'
        },
        maxCalculusDia1: {
          target: 'choledocholithiasis',
          value: '可'
        },
        calculusLocation: {
          target: 'hepatolithiasis',
          value: '可'
        },
        calculusAmount2: {
          target: 'hepatolithiasis',
          value: '可'
        },
        maxCalculusDia2: {
          target: 'hepatolithiasis',
          value: '可'
        },
        leakageLocation: {
          target: 'contrastMediaLeakage',
          value: '有'
        },
        // b
        calculusAmount3: {
          target: 'pancreatolithiasis',
          value: '可'
        },
        maxCalculusDia3: {
          target: 'pancreatolithiasis',
          value: '可'
        },
        nasopancreaticTubeleakageLocation: {
          target: 'contrastMediaLeakage',
          value: '有'
        }
      },
      content: [],
      contentModel: Object.assign({}, this.value),
      rules: {
        cholangiographyTime: [
          { required: true, message: '请输入', trigger: 'change' },
          { pattern: '^[0-9]$|^[1-2][0-9]$|^30$', message: '0-30' }
        ]
      }
    }
  },
  async created () {
    let staticId = ['radiographyOrNot', 'radiographyPipeline', 'imagingTime', 'unobstructed', 'irrigation', 'incumbent', 'removeTime']
    for (let i of staticId) {
      if (!this.contentModel[i]) {
        this.$set(this.contentModel, i, '')
      }
    }
    this.init()
  },
  mounted () {},
  methods: {
    init () {
      this.content = this.text ? this.text.match(/\{\{.*?\}\}|[^{}]{0,6}/g) : []
      // this.content = this.text.match(/\{\{.*?\}\}|[\w\s]+/g) ? this.text.match(/\{\{.*?\}\}|[\w,，。.]+/g) : []
      for (let z in this.content) {
        if (/\{\{.*?\}\}/g.test(this.content[z])) {
          this.content[z] = this.content[z].substring(1, this.content[z].length - 1)
          this.content[z] = JSON.parse(this.content[z])
          switch (this.content[z].type) {
            case 'INPUT':
            case 'SELECT':
            case 'RADIO':
              if (!(this.content[z].id in this.contentModel)) {
                this.$set(this.contentModel, this.content[z].id, '')
              }
              break
            case 'DATE':
              if (!(this.content[z].id in this.contentModel)) {
                this.$set(this.contentModel, this.content[z].id, null)
              }
              break
          }
        }
      }
      console.log(this.contentModel)
      console.log(this.content)
    },
    clearData () {
      this.$refs['contentModel'].resetFields()
    },
    saveData () {
      let newFormModels = Object.assign({}, this.contentModel)
      // let formModels = Object.assign({}, this.formModel)
      for (let i in this.relation) {
        if (newFormModels[this.relation[i].target] !== this.relation[i].value) {
          newFormModels[i] = ''
        }
      }
      this.$emit('input', newFormModels)
    }
  }
}
</script>
<style lang='scss' scoped>
.all {
  height: 100%;
  display: flex;
  flex-direction: column;
  .editContain {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    line-height: 40px;
    /deep/ .el-form-item__label {
      color: black;
    }
    /deep/ .el-form-item__label:before{
      content: '';
      margin-right: 0px;
    }
    /deep/ .el-input__inner {
      background-color: transparent;
      border-radius: 0;
      font-size: 14px;
      padding: 0px !important;
      margin:0px !important;
      border-top: none;
      border-left: none;
      border-right: none;
      width:100%;
      height:100% !important;
      // color: #117FD1;
      // border-bottom:1px solid #117FD1;
      text-align: center;
      // &:hover{
      //   border-color: #b4bccc;
      // }
      // &:focus{
      //   border-color: #409EFF;
      //   outline: 0;
      // }
    }
    /deep/ .el-select__caret{
      display:none;
    }
  }
}
</style>
