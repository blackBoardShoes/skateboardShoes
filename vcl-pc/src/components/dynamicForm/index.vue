<template>
  <div class="formAll">
    <div class="formContent">
      <div
        class="formContentLeft"
        :style="{ 'width': !add ? '100%' : '70%' }">
        <el-form
          :label-width="labelWidth"
          :label-position="labelPosition"
          :disabled="disabled"
          ref='formModel' :model='formModel' size='mini'>
          <!-- 菜肴展示 -->
          <!-- <draggable v-model="newFields"> -->
            <!-- :rules="items.validations" -->
            <div
              v-if="tf(items)"
              v-for="(items, index) in newFields"
              :key="index" style="display:flex;align-items:flex-start">
              <div class="iconErrorClass" @click="deleteError(items)" v-if="disabled">
                <i class="el-icon-error"  v-if="iconTf(items)"></i>
              </div>
              <el-form-item
                style="width: 100%"
                :rules="items.validations"
                :prop="items.id"
                :label="items.label"
                @dblclick.native="evaluate(items, index)"
                >
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
                <div v-if="items.type === 'CREATECALCULATE'" >
                  <sx-calculate v-model="formModel['createCalculate']" :calculateData="calculateData"></sx-calculate>
                </div>
                <div v-if="items.type === 'TABLE'">
                  <sx-table ref="sxtable" :tableData="items" @getData="getData"></sx-table>
                </div>
                <div v-if="items.type === 'TREE'">
                  <sx-tree v-model="formModel['tree']"></sx-tree>
                </div>
                <div v-if="items.type === 'LAYERTREE'">
                  <sx-layer-tree v-model="formModel['layerTree']"></sx-layer-tree>
                </div>
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
                  <!-- <el-button @click="editFormRow(items, index)">editFormRow</el-button> -->
                  <el-button type="danger" @click="deleteFormRow(items, index)">删除当前行</el-button>
                </el-button-group>
              </el-form-item>
            </div>
          <!-- </draggable> -->
          <!-- {{formModel}}<br><br> -->
          <!-- 菜肴反馈 -->
        </el-form>
        <div class="formContentLeftControl">
          <!-- <el-button v-if="sort" @click="sortAfterData">sortAfterData</el-button> -->
          <el-button v-if="cancel" @click="cancelData" type="info">取消</el-button>
          <el-button v-if="sort" @click="openRelation(false)">关联关系</el-button>
          <el-button @click="consoleData" type="primary">确定</el-button>
          <el-button v-if="sort" @click="notVerifying" type="primary" plain>无验证确定</el-button>
          <!-- <el-button @click="resetData">resetData</el-button> -->
        </div>
      </div>
      <!-- 鱼塘展示 -->
      <div class="formTemplateElement" v-if="add">
        <el-row v-for="(items, index) in repositoryData" :key="index" class="formTemplateElementRow">
          <el-button
            @click="addElement(items, index)"
            plain round>{{items.type + ' - ' + items.label}}</el-button>
          <el-button
            @click="editElement(items, index, true)"
            circle type="warning" size="mini" icon="el-icon-edit"></el-button>
          <el-button
            @click="deleteElement(items, index)"
            circle type="danger" size="mini" icon="el-icon-delete"></el-button>
          <el-button @click="openRelation(items)" v-if="items.type === 'TABLE'"
            circle type="primary" size="mini" icon="el-icon-setting"></el-button>
        </el-row>
        <br>
        <!-- 钓了条what鱼 -->
        <el-button class="createElementRow" @click="openCreateFish" size="medium">创建标签</el-button>
        <br><br>
        <!-- <el-checkbox-group v-model="tabelCheckboxGroup">
          <el-checkbox-button v-for="(row, i) in repositoryData" :label="row.label" :key="i">{{row.label}}</el-checkbox-button>
        </el-checkbox-group> -->
      </div>
    </div>
    <el-dialog
      title="标签"
      v-if="dialogVisible"
      :visible.sync="dialogVisible">
      <div style="width:100%;">
        <sx-form
          v-if="dialogVisible" :momo="repositoryData"
          :mozhu="allFish" :formModel="fishData" @consoleData="createFish"></sx-form>
      </div>
    </el-dialog>
    <el-dialog
      title="关联关系"
      v-if="relationDialogVisible"
      :visible.sync="relationDialogVisible">
      <div style="width:100%;">
        <relation-factory
          :needCreatedRelation="needCreatedRelation"
          @getRealationData="getRealationData">
          </relation-factory>
      </div>
    </el-dialog>
    <el-dialog
      :modal="false"
      :visible.sync="evaluateDialogVisible"
      width="21%">
      <div slot="title">
        <i class="el-icon-error" style="color: #FF455B"></i>
        <span style="font-weight: bold">错误原因</span>
      </div>
      <sx-form
        :labelPosition="'top'"
        :labelWidth="'0px'"
        cancel
        @cancelData="evaluateDialogVisible = false"
        v-if="evaluateDialogVisible" :mozhu="allEvaluate"
        :formModel="evaluateData" @consoleData="createEvaluate"></sx-form>
    </el-dialog>
  </div>
</template>

<script>
import sxTable from './table'
import sxLayerTree from './layerTree'
import sxTree from './tree'
import sxCalculate from './calculate'
import relationFactory from './relationFactory'
// import draggable from 'vuedraggable'
export default {
  components: {
    sxTable,
    sxTree,
    sxLayerTree,
    sxCalculate,
    relationFactory
    // draggable
  },
  props: {
    labelWidth: {
      type: String,
      default () {
        return '130px'
      }
    },
    labelPosition: {
      type: String,
      default () {
        return 'left'
      }
    },
    cancel: {
      type: Boolean,
      default () {
        return false
      }
    },
    mozhu: {
      type: Object,
      default () {
        return {}
      }
    },
    formModel: {
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
    edit: {
      type: Boolean,
      default () {
        return false
      }
    },
    add: {
      type: Boolean,
      default () {
        return false
      }
    },
    sort: {
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
      // compute: 'compute' in this.mozhu ? Object.assign({}, this.mozhu['compute']) : {},
      errors: 'errors' in this.mozhu ? Object.assign({}, this.mozhu['errors']) : {},
      comments: 'comments' in this.mozhu ? Object.assign({}, this.mozhu['comments']) : {},
      mozhuId: 'id' in this.mozhu ? this.mozhu['id'] : '',
      // 拥有各种鱼的鱼塘
      repositoryData: this.momo.length ? [...this.momo] : [],
      allFish: {
        relation: {
          pattern: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          message: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          example: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          required: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'SELECT', 'SELECTMUTIPLE', 'DATE', 'DATETIME', 'RADIO', 'TEXTAREA', 'CHECKBOX', 'CASCADER']
          },
          tree: {
            target: 'type',
            ruleType: 'EQUAL',
            value: 'CASCADER'
          },
          layerTree: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['SELECT', 'SELECTMUTIPLE', 'RADIO', 'CHECKBOX']
          },
          radioAgain: {
            target: 'type',
            ruleType: 'EQUAL',
            value: 'RADIO'
          },
          createCalculate: {
            target: 'type',
            ruleType: 'EQUAL',
            value: 'CREATECALCULATE'
          },
          createTable: {
            target: 'type',
            ruleType: 'EQUAL',
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
              ruleType: 'EQUAL',
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
      calculateData: []
    }
  },
  created () {
    console.time('---form init-------')
    this.init()
  },
  mounted () {
    console.timeEnd('---form init-------')
  },
  methods: {
    firstShow () {
      let accordWithCalculateData = ['INT', 'DOUBLE', 'RADIO']
      if (this.repositoryData) {
        this.calculateData = []
        console.log(this.repositoryData, 'repositoryData-=-=-=-=')
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
          // case 'DOUBLE':
          // case 'INT':
          //   if (!this.formModel[i.id]) {
          //     this.$set(this.formModel, i.id, 0)
          //   }
          //   break
          // case 'CASCADER':
          //   if (!this.formModel[i.id]) {
          //     this.$set(this.formModel, i.id, [])
          //   }
          //   break
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
        // if (i.type === 'DATE' | i.type === 'DATETIME') {
        //   if (typeof this.formModel[i.id] === 'string') {
        //     this.formModel[i.id] = new Date(this.formModel[i.id])
        //   }
        // }
      }
      this.firstShow()
      // for (let j in this.fields) {
      //   if (this.fields[j]['validations']) {
      //     for (let z in this.fields[j]['validations']) {
      //       if ('pattern' in this.fields[j]['validations'][z]) {
      //         this.fields[j]['validations'][z]['pattern'] = new RegExp(this.fields[j]['validations'][z]['pattern'])
      //         // this.$set(this.fields[j]['validations'][z], 'pattern', new RegExp(this.fields[j]['validations'][z]['pattern']))
      //       }
      //     }
      //   }
      // }
    },
    // form element relation (dynamic binding) -> relation
    tf (items) {
      let a = true
      if (this.relation[items.id]) {
        switch (this.relation[items.id].ruleType) {
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
      console.log(items)
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
          // for (let i in what.CREATECALCULATE) {
          //   for (let j of this.repositoryData) {
          //     if (what.createTable[i] === j.label) {
          //       what['subFields'].push(j)
          //     }
          //   }
          // }
          console.log(what, '---------------')
          break
      }
      return what
    },
    // form element all data  -> fromModel
    formatData () {
      let idGroup = []
      for (let i of this.newFields) {
        // if (i['validations']) {
        //   for (let z in i['validations']) {
        //     if ('pattern' in i['validations'][z]) {
        //       i['validations'][z]['pattern'] = i['validations'][z]['pattern'].toString().slice(1, -2)
        //       console.log(i['validations'][z]['pattern'])
        //     }
        //   }
        // }
        idGroup.push({id: i.id})
      }
      return idGroup
    },
    cancelData () {
      this.$emit('cancelData', true)
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
          this.$emit('consoleData', this.mozhuId, this.formModel, this.relation, this.newFields, idGroup, this.errors, this.comments)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    notVerifying () {
      let idGroup = this.formatData()
      this.$emit('notVerifying', this.mozhuId, this.formModel, this.relation, this.newFields, idGroup, this.errors, this.comments)
    },
    // form element operation (drag and drop sort) -> newFields
    sortAfterData () {
      console.log(this.newFields, 'sortAfter--------------')
      this.$emit('sortAfterData', this.formModel)
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
    // form element operation (计算)
    onEval (ev) {
      console.log(this.formModel, ev.calculate)
      this.formModel[ev.id] = this.calculate(this.formModel, ev.calculate)
      // this.formModel[ev.id] = this.calculate(this.formModel, this.compute[ev.id])  
    },
    // form element operation (discarded)
    resetData () {
      // console.log(this.formModel)
      this.$refs['formModel'].resetFields()
    },
    // form element operation (discarded)
    editFormRow (row, index) {
      // console.log(row, index)
      // console.log('new', this.newFields[index])
      // this.whatFields = [...this.editFields]
      // this.dialogVisible = true
    },
    // table element data -> current
    getData (data) {
      console.log(data, '--=-=-=-=-this click, -> this tableData=-=-=')
    },
    // right form element repository
    openCreateFish () {
      this.fishData = {}
      this.fishEdit = {}
      this.dialogVisible = true
      // this.$set(this.treeData1, 0, 1)
      // this.fields.push()
    },
    // createAndEditElementData -> dialog
    //  mozhuId, formModel, relation, newFields, idGroup, errors, comments
    async createFish (mozhuId, formModel, relation, newFields, idGroup) {
      formModel['calculate'] = formModel['createCalculate'] ? formModel['createCalculate'] : ''
      formModel['children'] = [...formModel['tree']].length ? [...formModel['tree']] : []
      formModel['values'] = [...formModel['layerTree']].length ? [...formModel['layerTree']] : []
      let what = this.conversion(formModel)
      if ('edit' in this.fishEdit) {
        this.repositoryData.splice(this.fishEdit.index, 1, what)
      } else {
        this.repositoryData.push(what)
      }
      this.$emit('createFish', what)
      this.dialogVisible = false
      console.timeEnd('createFish --- ')
    },
    // 鱼塘操作
    addElement (row, index) {
      let idGroup = this.formatData()
      if (row.type === 'CALCULATE') {
        // if (!idGroup.length) {
        //   this.$message({
        //     showClose: true,
        //     message: '标签中未检出计算ID请检查',
        //     type: 'warning'
        //   })
        //   return
        // }
        let pattern = /[a-zA-Z][a-zA-Z0-9]*/g
        let patternAfter = row.calculate.match(pattern) ? row.calculate.match(pattern) : []
        let matchingArr = []
        let notHaveArr = []
        let b = false
        for (let i of patternAfter) {
          b = false
          for (let j of idGroup) {
            if (j.id === i) {
              b = true
              break
            }
          }
          if (!b) notHaveArr.push(i)
        }
        console.log(notHaveArr)
        if (!notHaveArr.length) {
          let w = false
          for (let z of idGroup) {
            if (z.id === row.id) {
              w = true
              break
            }
          }
          if (!w) this.newFields.push(row)
          else this.$message({
            showClose: true,
            message: '模板内已添加',
            type: 'warning'
          })
          // this.newFields.push(row)
        } else {
          console.log(notHaveArr)
          this.$message({
            showClose: true,
            message: '计算中有字段模板中未添加' + notHaveArr.toString(),
            type: 'warning'
          })
        }
        console.log(matchingArr)
      } else {
        let b = false
        for (let j of idGroup) {
          if (j.id === row.id) {
            b = true
            break
          }
        }
        if (!b) this.newFields.push(row)
        else this.$message({
          showClose: true,
          message: '模板内已添加',
          type: 'warning'
        })
      }
      this.init()
    },
    editElement (row, index, edit) {
      this.fishEdit = {index: index, edit: edit}
      this.fishData = Object.assign({}, row)
      if (row['type'] === 'TABLE') {
        this.fishData['type'] = 'CREATETABLE'
      } else if (row['type'] === 'CALCULATE') {
        this.fishData['type'] = 'CREATECALCULATE'
        this.fishData['createCalculate'] = this.fishData['calculate']
      }
      this.dialogVisible = true
    },
    deleteElement (row, index) {
      this.$delete(this.repositoryData, index)
    },
    // 菜肴对应relation ------ factory
    async openRelation (items) {
      console.log(items)
      this.whatTF = !!items
      if (items) {
        this.needCreatedRelation = items
      } else {
        console.log(this.mozhu)
        this.needCreatedRelation = {
          id: this.mozhuId,
          relation: this.relation,
          subFields: this.newFields
        }
      }
      // let fts = await fieldTests()
      // console.log(fts)
      this.relationDialogVisible = true
    },
    getRealationData (data, id) {
      console.log(this)
      if (this.whatTF) {
        for (let i of this.repositoryData) {
          if (i.id === id) {
            Object.assign(i.relation, data)
          }
        }
      } else {
        this.relation = {}
        Object.assign(this.relation, data)
      }
      this.relationDialogVisible = false
    },
    // 菜肴评价输入
    evaluate (row, index) {
      if (this.disabled) {
        console.log(row, index)
        this.evaluateRowData = row
        this.evaluateData = this.comments[row.id]
        this.evaluateDialogVisible = true
      }
    },
    // 菜肴评价提交
    createEvaluate (mozhuId, formModel, relation, newFields, idGroup, errors, comments) {
      this.errors[this.evaluateRowData.id] = true
      this.comments[this.evaluateRowData.id] = formModel
      // this.$set(this.errors, this.evaluateRowData.id, true)
      // this.$set(this.comments, this.evaluateRowData.id, formModel)
      console.log(this.errors, this.comments)
      this.evaluateDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.formAll {
  height: 100%;
  width: 100%;
  .iconErrorClass {
    height: 20px;
    margin-top: 3px;
    width: 35px;
    font-size: 20px;
    color: #F56C6C
  }
  .formContent {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .formContentLeft {
      flex-direction: column;
      display: flex;
    }
    .formContentLeftControl {
      width: 100%;
      text-align: center;
    }
    .el-radio, .el-checkbox {
      min-width: 140px;
      margin: 5px;
      // margin-left: 15px;
      margin-right: 25px;
    }
  }
  .formTemplateElement {
    // border: 1px solid lightblue;
    padding: 10px;
    width: 100%;
    height: 100%;
    // max-height: 700px;
    overflow: auto;
    margin-left: 20px;
    min-width: 240px;
    max-width: 30%;
    // display: flex;
    // flex-direction: column;
    .formTemplateElementRow {
      width: 100%;
      margin-top: 5px;
    }
    .createElementRow {
      width: 100%;
    }
    // text-align: center;
  }
  .radioAndCheckbox {
    // width: 100%;
    // background: white;
    // border: 1px solid #D1D1D1;
    // border-radius: 5px; 
  }
}
</style>
