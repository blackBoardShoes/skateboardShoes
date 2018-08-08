<template>
  <div class="operationAll">
    <el-form
      ref="formModel" :model="formModel" :disabled="disabled"
      class="operationContent" label-position="left" label-width="80px" size="small">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <div slot="title" class="titleClass">
            <div>术中采取方式 </div>
            <div>手术方式:ERCP+EST</div>
          </div>
          <el-form-item prop="operationCheckBox" label-width="0px">
            <el-checkbox-group v-model="formModel['operationCheckBox']">
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
                <el-select clearable filterable v-model="formModel.operationSelect">
                  <el-option v-for="(it, ii) in formData['operationSelect']" :key="ii" :label="it.label" :value="it.value" ></el-option>
                </el-select>
              </el-form-item>
              &nbsp;&nbsp;&nbsp;
              <el-form-item label="报告日期 :" prop="operationDateTime">
                <el-date-picker
                  v-model="formModel.operationDateTime"
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
              {{formModel}}<br>
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
              <el-select clearable filterable v-model="formModel.operationSelectMz" style="width:90%;">
                <el-option v-for="(it, ii) in formData['operationSelectMz']" :key="ii" :label="it.label" :value="it.value" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检查诊断 :" prop="operationSelectJc" style="flex-grow:1;">
              <el-select clearable filterable v-model="formModel.operationSelectJc" style="width:90%;">
                <el-option v-for="(it, ii) in formData['operationSelectJc']" :key="ii" :label="it.label" :value="it.value" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活检部位 :" prop="operationSelectHj" style="flex-grow:1;">
              <el-select clearable filterable v-model="formModel.operationSelectHj" style="width:90%;">
                <el-option v-for="(it, ii) in formData['operationSelectHj']" :key="ii" :label="it.label" :value="it.value" ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <imgView></imgView>
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
    }
  },
  data () {
    return {
      activeNames: ['1', '2'],
      formModel: {
        operationCheckBox: [],
        operationSelect: [],
        operationSelectMz: [],
        operationSelectJc: [],
        operationSelectHj: [],
        operationDateTime: ''
      },
      formData: {
        operationCheckBox: [
          { value: 'ERCP', label: 'ERCP' },
          { value: 'EST(乳头括约肌切开)', label: 'EST(乳头括约肌切开)' },
          { value: 'value12', label: 'EPBD(球囊扩张)' },
          { value: 'value13', label: 'ENBD(鼻胆管置入)' },
          { value: 'ERCP1', label: 'ESR(网篮取石)' },
          { value: 'ERCP2', label: '球囊取石' },
          { value: 'ERCP3', label: '支架拔除' },
          { value: 'ERCP4', label: '胆道蛔虫取出' },
          { value: 'ERCP5', label: 'ENPD(鼻胰管置入)' },
          { value: 'ERCP42', label: 'ERBD(胆道支架置入' },
          { value: 'ERCP211', label: 'ERPD(胰管支架置入)' },
          { value: 'ERCP1123', label: 'EBME (金属支架置入)' }
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
      }
    }
  },
  watch: {
    formModel: {
      handler (val, oldVal) {
        this.$emit('input', this.formModel)
      },
      deep: true
    }
  },
  methods: {
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
  overflow: hidden;
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
}
</style>
