<template>
  <div class="formAll">
    <div class="formContent">
      <div class="formContentLeft">
        <el-form
          :label-width="labelWidth"
          :label-position="labelPosition"
          :disabled="disabled"
          :class="{controlFormClass: inline}"
          style="display: flex; flex-wrap: wrap;justify-content: space-between"
          ref='formModel' :model='formModel' size='mini'>
          <!-- 菜肴展示 -->
          <!--
            style="display: flex; flex-wrap: wrap;justify-content: space-between"
            :style="{display: 'flex', alignItems: 'flexStart', width: items.type === 'INPUT' ? '45%' : '100%'}"
            style="display:flex;align-items:flex-start"
           -->
          <!-- <draggable v-model="newFields"> -->
            <!-- :rules="items.validations" -->
            <div
              v-if="tf(items)"
              v-for="(items, index) in newFields"
              :style="{display: 'flex', alignItems: 'flexStart', width: coordinate[items.id] ? coordinate[items.id] + '%' : '100%'}"
              :key="index">
              <div class="iconErrorClass" @click="deleteError(items)" v-if="disabled">
                <i class="el-icon-error"  v-if="iconTf(items)"></i>
              </div>
              <el-form-item
                :style="{width: '100%'}"
                :rules="items.validations"
                :prop="items.id"
                :label="items.label"
                @dblclick.native="evaluate(items, index)">
                <el-input :disabled="items.disabled" :placeholder="items.placeholder" clearable v-if="items.type === 'INPUT'" v-model.trim='formModel[items.id]'></el-input>
                <el-input :disabled="items.disabled" :placeholder="items.placeholder" clearable v-if="items.type === 'INT'" v-model.number='formModel[items.id]'></el-input>
                <el-input :disabled="items.disabled" :placeholder="items.placeholder" clearable v-if="items.type === 'DOUBLE'" v-model.number='formModel[items.id]'></el-input>
                <el-input :disabled="items.disabled" :placeholder="items.placeholder" v-if="items.type === 'TEXTAREA'" type="textarea"  v-model='formModel[items.id]'></el-input>
                <el-radio-group :disabled="items.disabled" class="radioAndCheckbox" v-model="formModel[items.id]" v-if="items.type === 'RADIO'">
                  <el-radio v-for="(it, ii) in items.values" :key="ii" :label="it.value">{{it.label}}</el-radio>
                </el-radio-group>
                <el-checkbox-group :disabled="items.disabled" class="radioAndCheckbox" v-model="formModel[items.id]" v-if="items.type === 'CHECKBOX'">
                  <el-checkbox v-for="(it, ii) in items.values" :key="ii" :label="it.value" >{{it.label}}</el-checkbox>
                </el-checkbox-group>
                <el-switch :disabled="items.disabled" :active-text="items.activeText" :inactive-text="items.inactiveText" v-if="items.type === 'SWITCH'" v-model="formModel[items.id]" ></el-switch>
                <el-select :disabled="items.disabled" :placeholder="items.placeholder" clearable filterable v-if="items.type === 'SELECT'" v-model="formModel[items.id]" style="width:100%;">
                  <el-option v-for="(it, ii) in items.values" :key="ii" :label="it.label" :value="it.value" ></el-option>
                </el-select>
                <el-select :disabled="items.disabled" :placeholder="items.placeholder" multiple clearable filterable v-if="items.type === 'SELECTMUTIPLE'" v-model="formModel[items.id]" style="width:100%;">
                  <el-option v-for="(it, ii) in items.values" :key="ii" :label="it.label" :value="it.value" ></el-option>
                </el-select>
                <el-date-picker
                  :disabled="items.disabled"
                  clearable
                  style="width:100%;"
                  v-if="items.type === 'DATE'"
                  v-model="formModel[items.id]"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <el-date-picker
                  :disabled="items.disabled"
                  clearable
                  style="width:100%;"
                  v-if="items.type === 'DATETIME'"
                  v-model="formModel[items.id]"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
                <!-- value-format="yyyy-MM-dd/HH:mm:ss" -->
                <el-cascader
                  expand-trigger="hover"
                  :disabled="items.disabled"
                  :placeholder="items.placeholder"
                  clearable filterable
                  style="width:100%;"
                  v-if="items.type === 'CASCADER'"
                  :options="items.children"
                  v-model="formModel[items.id]">
                </el-cascader>
                <div v-if="items.type === 'CALCULATE'" >
                  <div>
                    {{formModel[items.id] ? formModel[items.id] : 0}}&nbsp;&nbsp;&nbsp;
                    <el-button @click="onEval(items)">计算</el-button>
                  </div>
                </div>
                <div v-if="items.type === 'TABLE'" style="width:100%">
                  <sx-table ref="sxtable" :tableData="items" @getData="getData"></sx-table>
                </div>
                <!-- 辅助创建 新增 编辑 -->
                <div v-if="items.type === 'CREATECALCULATE'" >
                  <sx-calculate v-model="formModel['createCalculate']" :calculateData="calculateData"></sx-calculate>
                </div>
                <div v-if="items.type === 'TREE'">
                  <sx-tree v-model="formModel['tree']"></sx-tree>
                </div>
                <div v-if="items.type === 'LAYERTREE'">
                  <sx-layer-tree v-model="formModel['layerTree']"></sx-layer-tree>
                </div>
                <!-- 辅助创建 新增 编辑  CREATETABLE -> TABLE  table -> CREATETABLE-->
                <div v-if="items.type === 'CREATETABLE'">
                  <el-checkbox-group v-model="formModel['createTable']">
                    <el-checkbox-button v-if="row.type !== 'TABLE' &  row.type !== 'CALCULATE'"
                      v-for="(row, i) in repositoryData" :label="row.id" :key="i">{{row.label + ' - ' + row.type}}</el-checkbox-button>
                  </el-checkbox-group>
                </div>
                <div v-if="items.type === 'EXAMPLE'">
                  <span style="font-size: 12px">
                    1到10： ^[1-9]$|^10$ &nbsp;&nbsp;&nbsp; 0到100： ^[0-9][0-9]$|^100$ <br>
                    1-5字符长度区间： ^.{1,5}$ &nbsp;&nbsp;&nbsp; 5字符长度： ^.{5}$
                  </span>
                </div>
                <el-button-group v-if="edit" style="margin-top:3px">
                  <el-button type="danger" @click="deleteFormRow(items, index)">删除当前行</el-button>
                </el-button-group>
              </el-form-item>
            </div>
          <!-- </draggable> -->
          <!-- {{formModel}}<br><br> -->
          <!-- 菜肴反馈 -->
        </el-form>
        <div class="formContentLeftControl">
          <el-button v-if="cancel" @click="cancelData" size="small" type="info">取消</el-button>
          <el-button v-if="verifyingTF" @click="notVerifying" size="small" type="primary" plain>无验证确定</el-button>
          <el-button @click="consoleData" v-if="submitTF" size="small" type="primary">确定</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :modal="false"
      :visible.sync="evaluateDialogVisible"
      width="21%">
      <div slot="title">
        <i class="el-icon-error" style="color: #FF455B"></i>
        <span style="font-weight: bold">错误原因</span>
      </div>
      <sx-min-form
        :labelPosition="'top'"
        :labelWidth="'0px'"
        cancel submitTF
        @cancelData="evaluateDialogVisible = false"
        v-if="evaluateDialogVisible" :mozhu="allEvaluate"
        v-model="evaluateData" @consoleData="createEvaluate"></sx-min-form>
    </el-dialog>
  </div>
</template>

<script>
import sxTable from './table'
import sxLayerTree from './layerTree'
import sxTree from './tree'
import sxCalculate from './calculate'
import draggable from 'vuedraggable'
export default {
  components: {
    sxTable,
    sxTree,
    sxLayerTree,
    sxCalculate,
    draggable
  },
  props: {
    inline: {
      type: Boolean,
      default () {
        return false
      }
    },
    labelWidth: {
      type: String,
      default () {
        return '120px'
      }
    },
    labelPosition: {
      type: String,
      default () {
        return 'left'
      }
    },
    mozhu: {
      type: Object,
      default () {
        return {}
      }
    },
    momo: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    edit: {
      type: Boolean,
      default () {
        return false
      }
    },
    cancel: {
      type: Boolean,
      default () {
        return false
      }
    },
    verifyingTF: {
      type: Boolean,
      default () {
        return false
      }
    },
    submitTF: {
      type: Boolean,
      default () {
        return false
      }
    },
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      newFields: 'fields' in this.mozhu ? [...this.mozhu['fields']] : [],
      relation: 'relation' in this.mozhu ? Object.assign({}, this.mozhu['relation']) : {},
      coordinate: 'coordinate' in this.mozhu ? Object.assign({}, this.mozhu['coordinate']) : {},
      errors: 'errors' in this.mozhu ? Object.assign({}, this.mozhu['errors']) : {},
      comments: 'comments' in this.mozhu ? Object.assign({}, this.mozhu['comments']) : {},
      mozhuId: 'id' in this.mozhu ? this.mozhu['id'] : '',
      // 拥有各种鱼的鱼塘
      repositoryData: this.momo.length ? [...this.momo] : [],
      allEvaluate: {
        fields: [
          {
            id: 'type',
            label: '',
            value: '',
            type: 'RADIO',
            values: [
              {label: '字迹模糊潦草无法分辨', value: 'one'},
              {label: '上下文逻辑关系错误', value: 'two'},
              {label: '原始资料缺失无法校验', value: 'three'}
            ]
          },
          {
            id: 'otherType',
            label: '',
            value: '',
            placeholder: '其他原因',
            type: 'TEXTAREA'
          }
        ]
      },
      evaluateDialogVisible: false,
      evaluateData: {},
      evaluateRowData: {},
      fishData: {},
      fishEdit: false,
      tabelCheckboxGroup: [],
      dialogVisible: false,
      relationDialogVisible: false,
      needCreatedRelation: {},
      whatTF: false,
      calculateData: [],
      formModel: this.value
    }
  },
  watch: {
    value () {
      this.formModel = Object.assign({}, this.value)
    },
    mozhu () {
      this.newFields = 'fields' in this.mozhu ? [...this.mozhu['fields']] : []
      this.relation = 'relation' in this.mozhu ? Object.assign({}, this.mozhu['relation']) : {}
      this.coordinate = 'coordinate' in this.mozhu ? Object.assign({}, this.mozhu['coordinate']) : {}
      this.errors = 'errors' in this.mozhu ? Object.assign({}, this.mozhu['errors']) : {}
      this.comments = 'comments' in this.mozhu ? Object.assign({}, this.mozhu['comments']) : {}
      this.mozhuId = 'id' in this.mozhu ? this.mozhu['id'] : ''
    },
    momo () {
      this.repositoryData = this.momo.length ? [...this.momo] : []
      this.firstShow()
    }
  },
  created () {
    this.init()
  },
  methods: {
    firstShow () {
      let accordWithCalculateData = ['INT', 'DOUBLE', 'RADIO']
      if (this.repositoryData) {
        this.calculateData = []
        for (let i in this.repositoryData) {
          if (this.repositoryData[i].type === 'TABLE') {
            this.repositoryData[i]['createTable'] = []
            for (let j of this.repositoryData[i].subFields) {
              this.repositoryData[i]['createTable'].push(j.label)
            }
          }
          if (accordWithCalculateData.includes(this.repositoryData[i].type)) {
            this.calculateData.push(this.repositoryData[i])
          }
        }
      }
    },
    // create and assign (init) -> fromModel
    init () {
      for (let i of this.newFields) {
        // this.$set(this.rules, i.id, i.validations)
        switch (i.type) {
          case 'CHECKBOX':
          case 'CASCADER':
          case 'TREE':
          case 'LAYERTREE':
          case 'CREATETABLE':
          case 'SELECTMUTIPLE':
            if (!this.formModel[i.id]) {
              if ('value' in i) {
                this.$set(this.formModel, i.id, [...i.value])
              } else {
                this.$set(this.formModel, i.id, [])
              }
            }
            break
          case 'DATE':
          case 'DATETIME':
            if (!this.formModel[i.id]) {
              if ('value' in i) {
                this.$set(this.formModel, i.id, new Date(i.value))
              } else {
                this.$set(this.formModel, i.id, null)
              }
            }
            break
          case 'SWITCH':
            if (!this.formModel[i.id]) {
              if ('value' in i) {
                this.$set(this.formModel, i.id, i.value)
              } else {
                this.$set(this.formModel, i.id, false)
              }
            }
            break
          default :
            if (!this.formModel[i.id]) {
              if ('value' in i) {
                this.$set(this.formModel, i.id, i.value)
              } else {
                this.$set(this.formModel, i.id, '')
              }
            }
            break
        }
        if (i['validations']) {
          for (let z in i['validations']) {
            if ('pattern' in i['validations'][z]) {
              i['validations'][z]['pattern'] = new RegExp(i['validations'][z]['pattern'], 'g')
              console.log(i['validations'][z]['pattern'])
              // this.$set(this.fields[j]['validations'][z], 'pattern', new RegExp(this.fields[j]['validations'][z]['pattern']))
            }
          }
        }
      }
      this.firstShow()
    },
    // form element relation (dynamic binding) -> relation
    tf (items) {
      let a = true
      if (this.relation[items.id]) {
        switch (this.relation[items.id].rule_type) {
          case 'EQUAL':
            // a = this.formModel[this.relation[items.id].target] === this.relation[items.id].value
            if (typeof this.relation[items.id].value === 'object') {
              a = this.relation[items.id].value.includes(this.formModel[this.relation[items.id].target])
            } else {
              a = this.formModel[this.relation[items.id].target] === this.relation[items.id].value
            }
            break
          case 'GT':
            a = this.formModel[this.relation[items.id].target] > this.relation[items.id].value
            break
          case 'GTOE':
            a = this.formModel[this.relation[items.id].target] >= this.relation[items.id].value
            break
          case 'LE':
            a = this.formModel[this.relation[items.id].target] < this.relation[items.id].value
            break
          case 'LEOE':
            a = this.formModel[this.relation[items.id].target] <= this.relation[items.id].value
            break
          case 'NOTEQUAL':
            a = this.formModel[this.relation[items.id].target] !== this.relation[items.id].value
            break
          default:
            a = false
            break
        }
        // if (!a) {
        //   this.$delete(this.formModel, items.id)
        //   // this.$set(this.formModel, items.id, null)
        // }
      }
      return a
    },
    iconTf (items) {
      return (this.errors[items.id] & this.disabled)
    },
    deleteError (items) {
      // this.errors[items.id] = false
      // this.$set(this.errors, items.id, false)
      // this.comments[items.id] = ''
      this.$delete(this.errors, items.id)
      this.$delete(this.comments, items.id)
    },
    // form conversion rules
    // { "type": "INPUT", "id": "", "label": "", "pattern": "", "message": "", "required": "" }
    conversion (what = {}) {
      what['validations'] = []
      switch (what.type) {
        case 'INPUT':
        case 'INT':
        case 'DOUBLE':
        case 'SELECT':
        case 'DATE':
        case 'DATETIME':
        case 'RADIO':
        case 'TEXTAREA':
        case 'CHECKBOX':
        case 'CASCADER':
        case 'SELECTMUTIPLE':
          if (what['required']) {
            what['validations'].push(
              { required: (Boolean(what['required'])), message: '请输入或选择' + what['label'], trigger: 'change' }
            )
          }
          if (what.type === 'INPUT' | what.type === 'INT' | what.type === 'DOUBLE' | what.type === 'TEXTAREA') {
            if (what['pattern']) {
              // what['validations'] = []
              // if (what['pattern'].includes('/^') | what['pattern'].includes('$/')) {
              //   what['pattern'].replace('/^', '^')
              // }
              what['validations'].push(
                { pattern: what['pattern'], message: what['message'] ? what['message'] : '请按规则填写', trigger: 'change' }
              )
            }
          }
          break
        case 'CREATETABLE':
          what.type = 'TABLE'
          what['subFields'] = []
          for (let i in what.createTable) {
            for (let j of this.repositoryData) {
              if (what.createTable[i] === j.label) {
                what['subFields'].push(j)
              }
            }
          }
          break
        case 'CREATECALCULATE':
          what.type = 'CALCULATE'
          break
      }
      return what
    },
    // form element all data  -> fromModel
    formatData () {
      let idGroup = []
      for (let i of this.newFields) {
        idGroup.push({id: i.id})
      }
      return idGroup
    },
    notVerifying () {
      let idGroup = this.formatData()
      this.$emit('notVerifying', this.mozhuId, this.formModel, this.relation, this.newFields, idGroup, this.errors, this.comments, this.coordinate)
    },
    consoleData () {
      this.$nextTick(() => {
        if (this.$refs['sxtable']) {
          for (let i of this.$refs['sxtable']) {
            this.formModel[i.tableData['id']] = i.tableValues
          }
        }
      })
      this.$refs['formModel'].validate(valid => {
        if (valid) {
          let idGroup = this.formatData()
          this.$emit('consoleData', this.mozhuId, this.formModel, this.relation, this.newFields, idGroup, this.errors, this.comments, this.coordinate)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // form element operation
    deleteFormRow (row, index) {
      this.newFields.splice(index, 1)
      this.$delete(this.formModel, row.id)
      console.log(row, index)
    },
    // 与eval操作类似 字符串 + - * / % ^
    calculate (data, pattern) {
      /* eslint-disable */
      //split用
      var reg = /\(|\)|\d+\.\d+|\d+|[a-zA-Z]+|\+|\-|\*|\/|\^|\%/g
      //判断条件
      var CONSTANT = /\d+\.\d+|\d+/
      var LEFT_BRACKET = /\(/
      var RIGHT_BRACKET = /\)/
      var OPERATOR = /\+|\-|\*|\/|\^|\%/
      var ID = /[a-zA-Z][a-zA-Z0-9]+/
      var patternList = pattern.match(reg)
      //2个queue
      var values = []
      var operator = []

      for (var i = 0; i < patternList.length; i++){
        if (LEFT_BRACKET.test(patternList[i])) {
          continue;
        } else if (RIGHT_BRACKET.test(patternList[i])) {
          if (operator.length === 0) return values[0]
          var v1 = values.pop();
          var v2 = values.pop();
          var op = operator.pop();
          var cal_value = null;
          switch (op) {
            case "+": { cal_value = v1 + v2; } break;
            case "-": { cal_value = v2 - v1; } break;
            case "*": { cal_value = v1 * v2; } break;
            case "/": { cal_value = v2 / v1; } break;
            case "%": { cal_value = v2 % v1; } break;
            case "^": { cal_value = Math.pow(v2, v1); } break;
            default: throw "something wrong while calculating value 1";
          }
          values.push(cal_value);
        } else if (CONSTANT.test(patternList[i])) {
          values.push(Number(patternList[i]));
        } else if (OPERATOR.test(patternList[i])) {
          operator.push(patternList[i])
        } else if (ID.test(patternList[i])) {
          if (data[patternList[i]] == null)
            values.push(0)
            // throw "the data is empty: " + patternList[i];
          values.push(Number(data[patternList[i]]));
        } else {
          this.$message({
            showClose: true,
            message: '公式存在问题，请检查',
            type: 'warning'
          })
        }
          // throw 'something wrong while calculating value 2'
      }
      return values[0].toString()
      /* eslint-disable */
    },
    evaluate (row, index) {
      if (this.disabled) {
        console.log(row, index)
        this.evaluateRowData = row
        this.evaluateData = this.comments[row.id]
        this.evaluateDialogVisible = true
      }
    },
    createEvaluate (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      this.errors[this.evaluateRowData.id] = true
      this.comments[this.evaluateRowData.id] = formModel
      // this.$set(this.errors, this.evaluateRowData.id, true)
      // this.$set(this.comments, this.evaluateRowData.id, formModel)
      console.log(this.errors, this.comments)
      this.evaluateDialogVisible = false
    },
    // form element operation (计算)
    onEval (ev) {
      console.log(this.formModel, ev.values)
      this.$set(this.formModel, ev.id, this.calculate(this.formModel, ev.values))
      // this.formModel[ev.id] = this.calculate(this.formModel, ev.values)
      // this.formModel[ev.id] = this.calculate(this.formModel, this.compute[ev.id])  
    },
    cancelData () {
      this.$emit('cancelData', true)
    },
    resetData () {
      this.$refs['formModel'].resetFields()
      if ('createCalculate' in this.formModel) {
        this.$set(this.formModel, 'createCalculate', '')
        // this.formModel['createCalculate'] = ''
      }
      if ('tree' in this.formModel) {
        this.$set(this.formModel, 'tree', [])
        // this.formModel['tree'] = []
      }
      if ('layerTree' in this.formModel) {
        this.$set(this.formModel, 'layerTree', [])
        // this.formModel['layerTree'] = []
      }
      if ('createTable' in this.formModel) {
        this.$set(this.formModel, 'createTable', [])
        // this.formModel['createTable'] = []
      }
    },
    againData () {
      this.newFields = this.mozhu['fields']
    },
    // table element data -> current
    getData (data) {
      console.log(data, '--=-=-=-=-this click, -> this tableData=-=-=')
    }
  }
}
</script>

<style lang="scss" scoped>
$full: 100%;
.formAll {
  height: $full;
  width: $full;
  .iconErrorClass {
    height: 20px;
    margin-top: 3px;
    width: 35px;
    font-size: 20px;
    color: #F56C6C
  }
  .formContent {
    height: $full;
    width: $full;
    display: flex;
    justify-content: space-between;
    .formContentLeft {
      height: $full;
      width: $full;
      .controlFormClass {
        height: $full;
        width: $full;
        display: flex;
        flex-wrap: wrap;
      }
    //   flex-direction: column;
    //   display: flex;
    }
    .formContentLeftControl {
      width: $full;
      text-align: center;
    }
    .el-radio, .el-checkbox {
      // min-width: 140px;
      margin: 5px;
      // margin-left: 15px;
      margin-right: 25px;
    }
  }
  /deep/ .el-form-item__label {
    white-space:normal;
    word-break:break-all;
    word-wrap:break-word; 
  }
}
</style>
