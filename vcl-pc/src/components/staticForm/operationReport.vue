<template>
  <div class="operationAll">
    <el-form
      ref="contentModel" :model="contentModel" :disabled="disabled"
      class="operationContent" label-position="left" label-width="80px" size="small">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <div slot="title" class="titleClass">
            <div>术中采取方式 </div>
            <div>手术方式:ERCP+EST</div>
          </div>
          <el-form-item prop="operationCheckBox" label-width="0px">
            <el-checkbox-group v-model="contentModel['operationCheckBox']">
              <el-checkbox v-for="(it, ii) in formData['operationCheckBox']" :key="ii" :label="it.value" >{{it.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item name="2">
          <div slot="title" class="titleClass">
            <div>术中特殊治疗</div>
            <div>特殊治疗:活检+FNA</div>
          </div>
          <div class="twoContentTop">
            <div style="display: flex;">
              <el-form-item label="报告医师 :" prop="operationSelect">
                <el-select clearable filterable v-model="contentModel.operationSelect">
                  <el-option v-for="(it, ii) in formData['operationSelect']" :key="ii" :label="it.label" :value="it.value" ></el-option>
                </el-select>
              </el-form-item>
              &nbsp;&nbsp;&nbsp;
              <el-form-item label="报告日期 :" prop="operationDateTime">
                <el-date-picker
                  v-model="contentModel.operationDateTime"
                  value-format="yyyy-MM-dd HH:hh:mm:ss"
                  type="datetime"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </div>
            <div>
              <el-button type="primary" size="small">获取图像</el-button>
              <el-button type="primary" size="small">报告预览</el-button>
              <el-button type="primary" size="small">打印报告</el-button>
            </div>
          </div>
          <div class="twoContentContain">
            <div class="twoContentContainEdit">
              <!-- {{contentModel}} -->
              <div v-for="(row, i) in contentModel.operationCheckBox" :key="i" class="editContain">
                <div v-for="(item, index) in content[row]" :key="index">
                  <!--  && contentModel[item.id] -->
                  <div v-if="item['type']" style="height: 26px;">
                    <el-form-item
                      v-if="item.vIf ? contentModel[item.vIf.id] === item.vIf.value : true"
                      :label-width="item.labelWidth ? item.labelWidth : '0px'"
                      :label="item.label"
                      :prop="item.id"
                      :rules="item.validations">
                      <div style="display: flex">
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
              <br>
            </div>
            <div class="imgGroup">
              <img src="">
              <img src="">
              <img src="">
              <img src="">
              <img src="">
              <img src="">
            </div>
          </div>
          <div class="twoContentBottom">
            <el-form-item label="麻醉方式 :" prop="operationSelectMz" style="flex-grow:1;">
              <el-select clearable filterable v-model="contentModel.operationSelectMz" style="width:90%;">
                <el-option v-for="(it, ii) in formData['operationSelectMz']" :key="ii" :label="it.label" :value="it.value" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检查诊断 :" prop="operationSelectJc" style="flex-grow:1;">
              <el-select clearable filterable v-model="contentModel.operationSelectJc" style="width:90%;">
                <el-option v-for="(it, ii) in formData['operationSelectJc']" :key="ii" :label="it.label" :value="it.value" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活检部位 :" prop="operationSelectHj" style="flex-grow:1;">
              <el-select clearable filterable v-model="contentModel.operationSelectHj" style="width:90%;">
                <el-option v-for="(it, ii) in formData['operationSelectHj']" :key="ii" :label="it.label" :value="it.value" ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <div style="height:660px;width:100%">
      <imgView :imgArr="imgArr"></imgView>
    </div>
  </div>
</template>

<script>
import imgView from '../../components/imgView/imgView.vue'
export default {
  components: {
    imgView
  },
  props: {
    disabled: {
      type: Boolean
    },
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      activeNames: ['1', '2'],
      imgArr: [
        {
          source: require('../../../src/assets/images/xbx.jpg'),
          thumbnail: require('../../../src/assets/images/xbx.jpg'),
          checked: false,
          information: '镜检照片1镜检照片1镜检照片1镜检照片1镜检照片1'
        }
      ],
      contentModel: {},
      formData: {
        operationCheckBox: [
          { value: '进镜', label: '进镜' },
          { value: '观察乳头', label: '观察乳头' },
          { value: '支架', label: '支架' },
          { value: '蛔虫', label: '蛔虫' },
          { value: '插管', label: '插管' },
          { value: '造影', label: '造影' },
          { value: '滞网', label: '滞网' },
          { value: '再次观察有出血', label: '再次观察有出血' },
          { value: '预防胰腺炎方式', label: '预防胰腺炎方式' }
        ],
        operationSelect: [
          { value: 'ERCP1', label: 'ESR(网篮取石)' }
        ],
        operationSelectMz: [
          { value: 'ERCP1', label: 'ESR(网篮取石)' }
        ],
        operationSelectJc: [
          { value: 'ERCP1', label: 'ESR(网篮取石)' }
        ],
        operationSelectHj: [
          { value: 'ERCP1', label: 'ESR(网篮取石)' }
        ]
      },
      text: '',
      textObj: {
        进镜: `胆总管
          {{"id":"choledocho","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          ，直径
          {{"id": "dia","type": "INPUT","validations": [{ "required": "true", "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "小数或整数" }]}}
          mm，伴
          {{"id":"choledochoNarrowLocation","type": "SELECT","values":[{"label": "肝门部胆管", "value": "肝门部胆管"},{"label": "胆管中段", "value": "胆管中段"},{"label": "胆管下端", "value": "胆管下端"},{"label": "胆管下段", "value": "胆管下段"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          狭窄，
          狭窄长度
          {{"id": "narrowLength","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]+([.]{1}[0-9]+){0,1}$", "message": "小数或整数" }]}}
          mm，
          肝内胆管
          {{"id":"intrahepaticBileDuct","type": "SELECT","values":[{"label": "扩张", "value": "扩张"},{"label": "不扩张", "value": "不扩张"},{"label": "未显影", "value": "未显影"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          。胆总管内
          {{"id":"choledocholithiasis","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          见结石负影，
          {{"vIf": {"id":"choledocholithiasis", "value": "可"},"label":"结石数目","labelWidth": "70px","unit": "枚，","id": "calculusAmount","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[1-9]{0,1}$|^10$", "message": "小数或整数" }]}}
          {{"vIf": {"id":"choledocholithiasis", "value": "可"},"label":"最大结石直径","labelWidth": "100px","unit": "mm，","id": "maxCalculusDia","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]{0,2}([.]{1}[0-9]+){0,1}$|^[1-2][0-9]{0,2}([.]{1}[0-9]+){0,1}$|^300$", "message": "小数或整数0-300" }]}}
          肝内胆管
          {{"id":"hepatolithiasis","type": "SELECT","values":[{"label": "可", "value": "可"},{"label": "未", "value": "未"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          见结石负影，
          {{"vIf": {"id":"hepatolithiasis", "value": "可"},"label":"结石位于","labelWidth": "70px","id":"calculusLocation","type": "SELECT","values":[{"label": "左", "value": "左"},{"label": "右", "value": "右"},{"label": "全肝内", "value": "全肝内"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          {{"vIf": {"id":"hepatolithiasis", "value": "可"},"label":"结石数目","labelWidth": "70px","id": "calculusAmount","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[1-9]{0,1}$|^10$", "message": "小数或整数" }]}}
          {{"vIf": {"id":"hepatolithiasis", "value": "可"},"labelWidth": "130px","unit": "mm，","label": "枚，最大结石直径","id": "maxCalculusDia","type": "INPUT","validations": [{ "required": true, "message": "请输入", "trigger": "change" },{ "pattern": "^[0-9]{0,2}([.]{1}[0-9]+){0,1}$|^[1-2][0-9]{0,2}([.]{1}[0-9]+){0,1}$|^300$", "message": "小数或整数0-300" }]}}
          {{"id":"contrastMediaLeakage","type": "SELECT","values":[{"label": "有", "value": "有"},{"label": "无", "value": "无"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
          造影剂外漏
          {{"vIf": {"id":"contrastMediaLeakage", "value": "有"},"label":"，部位","labelWidth": "55px","unit": "胆管。","id":"leakageLocation","type": "SELECT","values":[{"label": "肝内", "value": "肝内"},{"label": "上段", "value": "上段"},{"label": "中段", "value": "中段"},{"label": "下段", "value": "下段"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }]}}
        `,
        观察乳头: `ccccccads`
      },
      content: {}
    }
  },
  watch: {
    contentModel: {
      handler (val, oldVal) {
        this.$emit('input', this.contentModel)
      },
      deep: true
    }
  },
  async created () {
    this.$set(this.contentModel, 'operationCheckBox', ['插管', '进镜', '观察乳头'])
    await this.init()
    this.contentModel = Object.assign(this.contentModel, this.value)
  },
  methods: {
    async init () {
      for (let i in this.textObj) {
        this.$set(this.content, i, await this.returnTextarea(this.textObj[i]).content)
        let contentModel = this.returnTextarea(this.textObj[i]).contentModel
        for (let z in contentModel) {
          this.$set(this.contentModel, z, contentModel[z])
        }
      }
      console.log(this.contentModel, 'this.contentModel')
    },
    returnTextarea (string) {
      let content = string ? string.match(/\{\{.*?\}\}|[^{}]{0,6}/g) : []
      let contentModel = {}
      for (let z in content) {
        if (/\{\{.*?\}\}/g.test(content[z])) {
          content[z] = content[z].substring(1, content[z].length - 1)
          content[z] = JSON.parse(content[z])
          switch (content[z].type) {
            case 'INPUT':
            case 'SELECT':
            case 'RADIO':
              if (!(content[z].id in contentModel)) {
                this.$set(contentModel, content[z].id, '')
              }
              break
            case 'DATE':
              if (!(content[z].id in contentModel)) {
                this.$set(contentModel, content[z].id, null)
              }
              break
          }
        }
      }
      return { content: content, contentModel: contentModel }
    },
    resetForm () {
      this.$refs['contentModel'].resetFields()
    },
    handleChange (val) {
      // console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';

$full: 100%;
$marginW: 15px;
$marginContentW: 25px;
.operationAll {
  width: $full;
  height: $full;
  // overflow: hidden;
  .operationContent {
    width: $full;
    /deep/ .el-collapse-item__header{
      padding-left: $marginW;
      background: $groupColor;
      font-weight: bold;
      font-size: 15px;
    }
    /deep/ .el-collapse-item__content {
      padding: $marginContentW;
    }
    .titleClass {
      width:95%;
      display:flex;
      justify-content: space-between;
    }
    .twoContentTop {
      width: $full;
      display: flex;
      justify-content: space-between;
    }
    .twoContentContain {
      width: $full;
      min-height: 300px;
      .twoContentContainEdit {
        border: 1px solid $lightBorderColor;
      }
      .imgGroup {
        width: $full;
        display: flex;
        height: 140px;
        justify-content: space-between;
        margin-top: $marginW;
        margin-bottom: $marginW;
        img {
          width: 140px;
          height: 140px;
        }
      }
    }
    .twoContentBottom {
      width: $full;
      display: flex;
      justify-content: space-between;
    }
  }
  .el-checkbox {
    min-width: 170px;
    margin: 5px;
    // margin-left: 15px;
    margin-right: 25px;
  }
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
