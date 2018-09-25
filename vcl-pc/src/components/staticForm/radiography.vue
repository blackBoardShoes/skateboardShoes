<template>
  <div class='all'>
    <el-form size="mini"
      :model="contentModel" ref="contentModel"
      label-width="120px">
      <el-form-item label="是否造影" prop="radiographyOrNot" >
        <el-radio-group v-model="contentModel.radiographyOrNot">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="造影管道" prop="radiographyPipeline">
        <el-radio-group v-model="contentModel.radiographyPipeline">
          <el-radio label="鼻胆管"></el-radio>
          <el-radio label="鼻胰管"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="造影时间" >
        <div style="display: flex;justify-content: space-around">
          术后
          <el-input v-model="contentModel.radiographyPipeline" style="width:90%"></el-input>
          天
        </div>
      </el-form-item>
      <el-form-item label="鼻胆管造影结果">
        <div class="editContain">
          <div v-for="(item, index) in content" :key="index">
            <div v-if="item['type']" style="height: 26px;">
              <el-form-item
                :prop="item.id"
                :rules="item.validations">
                <el-input :style="{ width: 40 + contentModel[item.id].toString().length * 6 + 'px !important', height: '100%' }" v-if="item['type'] === 'INPUT'" v-model="contentModel[item.id]"></el-input>
                <el-select :style="{ width: 40 + contentModel[item.id].toString().length * 6 + 'px !important', height: '100%' }" v-if="item['type'] === 'SELECT'" v-model="contentModel[item.id]" placeholder="">
                  <el-option
                    v-for="option in item.values"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value">
                  </el-option>
                </el-select>
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

    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler (value) {
        this.contentModel = Object.assign({}, value)
      }
    }
  },
  data () {
    return {
      text: `
        鼻胆管造影结果
        胆总管（扩张/不扩张[select]）
        {{"id":"nasobiliaryDrainageUnobstructed","type": "RADIO","values":[{"label": "是"},{"label": "否"}],"validations":[{ "required": true, "message": "请选择", "trigger": "change" }],"label": "鼻胆管通畅"}}
        ，直径（ ）mm[double]（0＜范围≤），伴（肝门部胆管/胆管中段/胆管下端/胆管下段[select]）狭窄，
        {{"id": "input","type": "INPUT","validations": [{ "required": true, "message": "liveRADIO", "trigger": "change" }],"label": "label"}}
        狭窄长度（ ）mm[double]（0＜范围≤），
        <div style="color: red;dispaly:inline-block"> 514</div>
        肝内胆管（扩张/不扩张/未显影）rselect]。
        胆总管内（可/未[select]）见结石负影，（如果前面选择“可”），
        结石数目：（ ）枚，最大结石直径（ ）mm[double]（0＜范围≤）；
        肝内胆管（可/未[select]）见结石负影，（如果全面选择“可”），结石位于（左/右/全肝内[select]）
        结石数目：（ ）枚，最大结石直径（ ）mm[double]（0＜范围≤）；（是/否[select]）有造影剂外漏，部位（肝内/上段/中段/下段[select]）胆管。
        草草草
        {{"id": "input","type": "INPUT","validations": [{ "required": true, "message": "liveRADIO", "trigger": "change" }],"label": "label"}}
        asdassaassad,ca asdasdas1
      `,
      content: [],
      contentModel: this.value
    }
  },
  async created () {
    this.init()
  },
  mounted () {},
  methods: {
    init () {
      this.content = this.text ? this.text.match(/\{\{.*?\}\}|[^{}]{0,7}/g) : []
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
    }
  }
}
</script>
<style lang='scss' scoped>
.all {
  height: 100%;
  display: flex;
  .editContain {
    border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /deep/ .el-input__inner {
      background-color: transparent;
      border-radius: 0;
      font-size: 16px;
      padding: 0px !important;
      margin:0px !important;
      border:none;
      width:100%;
      height:100% !important;
      color: #117FD1;
      border-bottom:1px solid #117FD1;
      text-align: center;
      // &:hover{
      //   border-color: #b4bccc;
      // }
      // &:focus{
      //   border-color: #409EFF;
      //   outline: 0;
      // }
    }
  }
}
</style>
