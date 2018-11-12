<template>
  <div class="formAll">
    <div class="formContent">
      <div class="formContentLeft">
        <!-- :label-width="labelWidth" -->
        <!-- :label-width="labelWidth" -->
        <el-form
          onkeydown="if(event.keyCode==13){return false}"
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
              :class="(items.type === 'RADIO' && (!items.values)) ? 'abnormal' : noLabel ? 'noLabel' : 'normal'"
              :style="{display: 'flex', alignItems: 'flexStart', width: coordinate[items.id] ? coordinate[items.id] + '%' : '100%'}"
              :key="index">
              <!--  v-if="disabled" -->
              <div
                v-if="leftAndRightShow"
                class="iconErrorClass" @click="deleteError(items)">
                <i class="el-icon-error"  v-if="iconTf(items)"></i>
              </div>
              <!-- v-if="leftAndRightShow" -->
              <div
                style="width: 40px;text-align:center;margin-top: 6px;">
                <el-popover
                  v-if="question[items.id]"
                  placement="right"
                  :title="question[items.id].title ? question[items.id].title : '术语解释'"
                  width="500"
                  trigger="click">
                  <!-- {{question[items.id].paraphrase}} -->
                  <el-input
                    :rows="5"
                    style="width: 100%;"
                    type="textarea"
                    v-model='question[items.id].paraphrase'></el-input>
                    <br><br>
                  <!-- <div class="viewerWrapper" v-if="question[items.id] && question[items.id].images.length" >
                    <div v-viewer="options" class="images " style="display:flex;flex-direction: column">
                      <template v-for="(imgItem, imgIndex) in question[items.id].images">
                        <img :src="imgItem" :key="imgIndex" style="display: none;">
                      </template>
                    </div>
                  </div> -->
                  <div class="allImages" v-if="question[items.id] && question[items.id].images && question[items.id].images.length">
                    <img  class="images" v-for="(imgItem, imgIndex) in question[items.id].images" :src="imgItem" :key="imgIndex">
                  </div>
                  <i class="el-icon-question" slot="reference" style="font-size: 16px;cursor:pointer"></i>
                </el-popover>
              </div>
              <el-form-item
                v-if="tf(items)"
                :style="{width: '100%'}"
                :rules="closeRules ? [] : items.validations"
                :prop="items.id"
                :label="items.label"
                @dblclick.native="evaluate(items, index)">
                <div style="display: flex;">
                  <!-- @change.native="changeRules" -->
                  <el-input
                    :disabled="disabled" :placeholder="items.placeholder ? items.placeholder : '请输入'" clearable
                    v-if="items.type === 'INPUT' | items.type === 'INT' | items.type === 'DOUBLE'" v-model.trim='formModel[items.id]'></el-input>
                  <!-- <el-input :disabled="items.disabled" :placeholder="items.placeholder" clearable v-if="items.type === 'INT'" v-model.trim='formModel[items.id]'></el-input> -->
                  <!-- <el-input :disabled="items.disabled" :placeholder="items.placeholder" clearable v-if="items.type === 'DOUBLE'" v-model.trim='formModel[items.id]'></el-input> -->
                  <el-input
                    :disabled="items.disabled"
                    :placeholder="items.placeholder"
                    v-if="items.type === 'TEXTAREA'" type="textarea"
                    v-model='formModel[items.id]'></el-input>
                  <el-radio-group :disabled="items.disabled" class="radioAndCheckbox" v-model="formModel[items.id]" v-if="items.type === 'RADIO'">
                    <el-radio v-for="(it, ii) in items.values" :key="ii" :label="it.value">{{(it.label.split('**'))[0]}}</el-radio>
                  </el-radio-group>
                  <el-radio-group :disabled="items.disabled" class="radioAndCheckbox" v-model="formModel[items.id]" v-if="items.type === 'RADIOTEXT'"
                    style="display:flex;flex-wrap:wrap;width: 100%">
                    <el-radio
                      v-for="(it, ii) in items.values" :key="ii" :label="it.label"
                      style="display:flex">
                      <!-- {{
                        (items.values.length - 1) !== ii ? (it.label.split('**'))[0] : ''
                      }} -->
                      {{
                        (it.label.split('**'))[0]
                      }}
                      <!-- v-if="(items.values.length - 1) === ii" -->
                    </el-radio>
                    <el-input
                      style="width: 100%"
                      placeholder="请输入"
                      v-model.trim='formModel[items.id]'></el-input>
                  </el-radio-group>
                  <el-checkbox-group :disabled="items.disabled" class="radioAndCheckbox" v-model="formModel[items.id]" v-if="items.type === 'CHECKBOX'">
                    <el-checkbox v-for="(it, ii) in items.values" :key="ii" :label="it.value" >{{it.label}}</el-checkbox>
                  </el-checkbox-group>
                  <el-checkbox-group :disabled="items.disabled" class="radioAndCheckbox" v-model="formModel[items.id]" v-if="items.type === 'CHECKBOXTEXT'"
                  style="display:flex;flex-wrap:wrap;width: 100%">
                    <el-checkbox v-for="(it, ii) in items.values" :key="ii" :label="it.label" >
                      <div>
                        {{it.label}}
                      </div>
                    </el-checkbox>
                      <!-- v-if="(items.values.length - 1) === ii" -->
                    <el-input
                      style="width: 100%"
                      placeholder="请输入"
                      v-model.trim='formModel[items.id][30]'></el-input>
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
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    style="width:100%;"
                    v-if="items.type === 'DATE'"
                    v-model="formModel[items.id]"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                  <el-date-picker
                    :disabled="items.disabled"
                    clearable
                    value-format="yyyy-MM-dd HH:mm:ss"
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
                    :options="items.children ? items.children : []"
                    v-model="formModel[items.id]">
                  </el-cascader>
                  <div v-if="items.type === 'CALCULATE'" >
                    <div>
                      {{formModel[items.id] ? formModel[items.id] : 0}}&nbsp;&nbsp;&nbsp;
                      <el-button v-if="!disabled" @click="onEval(items)">计算</el-button>
                    </div>
                  </div>
                  <div v-if="items.type === 'TABLE'">
                    <sx-table
                      :disabled="disabled"
                      v-model="formModel[items.id]" ref="sxtable" :tableData="items ? items : {}" @getData="getData" ></sx-table>
                  </div>

                <!-- 辅助创建 新增 编辑 -->
                <div v-if="items.type === 'CREATECALCULATE'" style="width:100%">
                  <sx-calculate v-model="formModel['createCalculate']" :calculateData="calculateData"></sx-calculate>
                </div>
                <div v-if="items.type === 'TREE'" style="width:100%">
                  <sx-tree v-model="formModel['tree']"></sx-tree>
                </div>
                <div v-if="items.type === 'LAYERTREE'" style="width:100%">
                  <sx-layer-tree v-model="formModel['layerTree']"></sx-layer-tree>
                </div>
                <!-- 辅助创建 新增 编辑  CREATETABLE -> TABLE  table -> CREATETABLE-->
                <div v-if="items.type === 'CREATETABLE'" style="width:100%">
                  <!-- {{formModel['createTable']}} -->
                  <el-select v-model="formModel['createTable']" multiple clearable filterable style="width: 100%">
                    <el-option
                      v-if="it.type !== 'CALCULATE'"
                      v-for="(it, ii) in repositoryData" :key="ii" :label="it.label + ' - ' + it.id" :value="it.id" ></el-option>
                  </el-select>
                  <!-- it.type !== 'TABLE' &  -->
                  <!-- <el-checkbox-group v-model="formModel['createTable']">
                    <el-checkbox-button v-if="row.type !== 'TABLE' &  row.type !== 'CALCULATE'"
                      v-for="(row, i) in repositoryData" :label="row.id" :key="i">{{row.label + ' - ' + row.type}}</el-checkbox-button>
                  </el-checkbox-group> -->
                </div>
                <div v-if="items.type === 'EXAMPLE'" style="width:100%">
                  <span style="font-size: 12px">
                    数&nbsp;值&nbsp;限&nbsp;制: 3***100.66 (即3 &#8804; x &#8804; 100.66)
                    <br>
                    <!-- \d 等价 [0-9] -->
                    <!-- <br> -->
                    <div style="display: flex;">
                      字符数限制:
                      <div>
                        1-5字符长度区间: ^.{1,5}$ (即1 &#8804; x &#8804; 5) &nbsp;&nbsp;&nbsp;<br>
                        固定5字符长度: ^.{5}$
                      </div>
                    </div>
                    注: 数值和字符数限制根据实际情况任选其一即可。
                    <!-- 1到10: ^[1-9]$|^10$ &nbsp;&nbsp;&nbsp; -->
                    <!-- 1到50: ^[1-9]$|^[1-4][0-9]$|^50$ &nbsp;&nbsp;&nbsp; -->
                    <!-- 0到100: ^[0-9]$|^[0-9][0-9]$|^100$  或者  ^\d{0,2}$|^100$ &nbsp;&nbsp;&nbsp; -->
                    <!-- 0到100: ^\d{0,2}$|^100$ &nbsp;&nbsp;&nbsp; -->
                    <!-- 0到120:  ^[0-9]$|^[0-9][0-9]$|^[1][012][0]$ &nbsp;&nbsp;&nbsp; -->
                    <!-- 1到300:  ^[1-9]$|^[0-9][0-9]$|^[12][0-9][0-9]$|^300$ &nbsp;&nbsp;&nbsp; -->
                    <!-- 1到1000:  ^[1-9]$|^[0-9][0-9]$|^[1-9][0-9][0-9]$|^1000$ &nbsp;&nbsp;&nbsp; -->
                    <!-- 0到1000: ^\d{0,3}$|^1000$ &nbsp;&nbsp;&nbsp; -->
                    <!-- 0到1000000: ^\d{0,6}$|^1000000$ &nbsp;&nbsp;&nbsp; -->
                    <!-- 0到120000: ^\d{0,5}$|^[1]{1}[01]{1}\d{4}$|^120000$ -->
                    <!-- <br>
                    两位小数  ^.\d{2}$ &nbsp;&nbsp;&nbsp; 整数和1位或两位小数:  ^\d+$|^\d+\.\d{1,2}$
                    <br>
                    1-5字符长度区间: ^.{1,5}$ &nbsp;&nbsp;&nbsp; 固定5字符长度: ^.{5}$
                    <br> -->
                  </span>
                </div>
                <div v-if="items.type === 'NULLRADIO'" style="width:100%">
                  <span style="font-size: 12px">
                    未加入选项时可作为标题使用<br>
                    例子: 腹部体征 v
                  </span>
                </div>
                <el-button-group v-if="edit" style="margin-top:3px">
                  <el-button type="danger" @click="deleteFormRow(items, index)">删除当前行</el-button>
                </el-button-group>
                  <div style="width: 40px;text-align:center"
                    v-if="leftAndRightShow && !(items.type === 'TEXTAREA' | items.type === 'RADIO' | items.type === 'CHECKBOX')">
                    <!-- v-if="!(items.type === 'RADIO' | items.type === 'RADIOTEXT' | items.type === 'CHECKBOXTEXT' | items.type === 'CHECKBOX' | items.type === 'TEXTAREA')" -->
                    <!--  v-if="items.unit" -->
                    {{items.unit ? items.unit : ''}}
                  </div>
                </div>
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
      width="300px">
      <div slot="title">
        <i class="el-icon-error" style="color: #FF455B"></i>
        <span style="font-weight: bold">错误原因</span>
      </div>
      <sx-min-form
        :leftAndRightShow="false"
        :noLabel="true"
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
// import draggable from 'vuedraggable'
export default {
  components: {
    sxTable,
    sxTree,
    sxLayerTree,
    sxCalculate
    // draggable
  },
  props: {
    inline: {
      type: Boolean,
      default () {
        return false
      }
    },
    leftAndRightShow: {
      type: Boolean,
      default () {
        return true
      }
    },
    noLabel: {
      type: Boolean,
      default () {
        return false
      }
    },
    closeRules: {
      type: Boolean,
      default () {
        return false
      }
    },
    labelPosition: {
      type: String,
      default () {
        return 'left'
      }
    },
    question: {
      type: Object,
      default () {
        return {}
      }
    },
    mozhu: {
      type: Object,
      default () {
        return {}
      }
    },
    mozhuComments: {
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
    },
    isSh: {
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
      // comments: 'comments' in this.mozhu ? Object.assign({}, this.mozhu['comments']) : {},
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
              // {label: '字迹模糊潦草无法分辨', value: '字迹模糊潦草无法分辨'},
              {label: '上下文逻辑关系错误', value: '上下文逻辑关系错误'},
              {label: '未录入', value: '未录入'}
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
      comments: this.mozhuComments,
      formModel: this.value,
      options: {
        inline: true,
        button: true,
        navbar: true,
        title: false,
        toolbar: false,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: false,
        scalable: false,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: 'data-source'
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  watch: {
    mozhuComments: {
      deep: true,
      handler (value) {
        this.comments = {}
        this.comments = Object.assign({}, value)
      }
    },
    value: {
      deep: true,
      handler (value) {
        // this.formModel = {}
        // this.formModel = Object.assign({}, value)
        // this.formModel = {}
        this.init()
        this.formModel = Object.assign(this.formModel, value)
        console.log(this.formModel, 'this.formModelthis.formModelthis.formModel')
      }
    },
    mozhu: {
      deep: true,
      handler () {
        this.newFields = 'fields' in this.mozhu ? [...this.mozhu['fields']] : []
        this.relation = 'relation' in this.mozhu ? Object.assign({}, this.mozhu['relation']) : {}
        this.coordinate = 'coordinate' in this.mozhu ? Object.assign({}, this.mozhu['coordinate']) : {}
        this.errors = 'errors' in this.mozhu ? Object.assign({}, this.mozhu['errors']) : {}
        this.comments = 'comments' in this.mozhu ? Object.assign({}, this.mozhu['comments']) : {}
        this.mozhuId = 'id' in this.mozhu ? this.mozhu['id'] : ''
        // this.formModel = {}
        // this.init()
        this.resetData()
        console.log(this.formModel, 'formModel')
      }
    },
    momo () {
      this.repositoryData = this.momo.length ? [...this.momo] : []
      this.firstShow()
    }
  },
  created () {
    this.init()
    console.log(this.mozhu)
    console.log(this.newFields)
    console.log(this.mozhuComments, 'this.mozhuComments')
    console.log(this.formModel, 'this.formModel')
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
    },
    firstShow () {
      let accordWithCalculateData = ['INT', 'DOUBLE', 'RADIO']
      if (this.repositoryData) {
        this.calculateData = []
        for (let i in this.repositoryData) {
          if (this.repositoryData[i].type === 'TABLE') {
            this.repositoryData[i]['createTable'] = []
            for (let j of this.repositoryData[i].subFields) {
              this.repositoryData[i]['createTable'].push(j.id)
            }
          }
          if (accordWithCalculateData.includes(this.repositoryData[i].type)) {
            this.calculateData.push(this.repositoryData[i])
          }
        }
      }
    },
    // create and assign (init) -> fromModel
    async init () {
      for (let i of this.newFields) {
        // this.$set(this.rules, i.id, i.validations)
        switch (i.type) {
          case 'CHECKBOX':
          case 'CHECKBOXTEXT':
          case 'CASCADER':
          case 'TABLE':
          case 'TREE':
          case 'LAYERTREE':
          case 'CREATETABLE':
          case 'SELECTMUTIPLE':
          // case 'SELECT':
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
                if (this.formModel[i.id] === 0) {
                  this.$set(this.formModel, i.id, 0)
                } else {
                  this.$set(this.formModel, i.id, '')
                }
              }
            }
            break
        }
        // this.$emit('input', this.formModel)
        let type = i.type
        let required = Boolean(i.required)
        if (i['validations']) {
          for (let z in i['validations']) {
            if ('pattern' in i['validations'][z]) {
              // console.log(i['validations'][z]['pattern'].toString().includes('***'), "i['validations'][z]['pattern'].toString().includes('***')")
              if (i['validations'][z]['pattern'].toString().includes('***')) {
                let arr = i['validations'][z]['pattern'].split('***')
                let message = i['validations'][z]['message']
                let a = { validator: (rule, value, callback) => {
                  if (required) {
                    if ((Number(arr[0]) <= Number(value)) && (Number(arr[1]) >= Number(value))) {
                      if ((!(/^[0-9]+([.][0-9]+){0,}$/.test(value)))) {
                        callback(new Error('取值范围：' + arr[0] + '-' + arr[1] + '，类型为' + (type === 'INT' ? '整型' : '浮点型')))
                      } else {
                        callback()
                      }
                    } else {
                      if (message === '请按规则填写') {
                        callback(new Error('取值范围：' + arr[0] + '-' + arr[1] + '，类型为' + (type === 'INT' ? '整型' : '浮点型')))
                      } else {
                        callback(new Error(message))
                      }
                    }
                  } else {
                    // callback()
                    if (value && (Number(arr[0]) <= Number(value)) && (Number(arr[1]) >= Number(value))) {
                      if ((!(/^[0-9]+([.][0-9]+){0,}$/.test(value)))) {
                        callback(new Error('取值范围：' + arr[0] + '-' + arr[1] + '，类型为' + (type === 'INT' ? '整型' : '浮点型')))
                      } else {
                        callback()
                      }
                    } else {
                      if (value) {
                        callback(new Error('取值范围：' + arr[0] + '-' + arr[1] + '，类型为' + (type === 'INT' ? '整型' : '浮点型')))
                      } else {
                        callback()
                      }
                    }
                  }
                }}
                i['validations'][z] = a
              }
            }
          }
        } else {
          if (type === 'INT') {
            let a = { validator: (rule, value, callback) => {
              if (value) {
                if (value.includes('.')) {
                  callback(new Error('类型为整数,不可以输入小数'))
                } else if (!(/^\d*$/.test(value))) {
                  callback(new Error('类型为整数,只可以为数字。'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            }}
            i['validations'] = [a]
          } else if (type === 'DOUBLE') {
            let a = { validator: (rule, value, callback) => {
              if ((!(/^[0-9]+([.][0-9]+){0,}$|^\d*$/.test(value)))) {
                callback(new Error('类型为浮点类型'))
              } else {
                callback()
              }
            }}
            i['validations'] = [a]
          }
        }
        if (required && Array.isArray(i['validations'])) {
          if ((i['validations'].length === 1) && ('required' in i['validations'][0])) {
            if (type === 'INT') {
              let a = { validator: (rule, value, callback) => {
                if (/^\d{1,}$/.test(value)) {
                  callback()
                } else {
                  callback(new Error('类型为整数'))
                }
              }}
              i['validations'].push(a)
            } else if (type === 'DOUBLE') {
              let a = { validator: (rule, value, callback) => {
                if ((!(/^[0-9]+([.][0-9]+){0,}$/.test(value)))) {
                  callback(new Error('类型为浮点类型'))
                } else {
                  callback()
                }
              }}
              i['validations'].push(a)
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
        // for (let i of this.newFields) {
        //   if (i.id === this.relation[items.id].target) {
        //     console.log(i.values)
        //   }
        // }
        // let relationArr = []
        // for (let j in this.relation) {
        //   if (this.relation[j].target === this.relation[items.id].target) {
        //     relationArr.push(j)
        //   }
        // }
        // console.log(items.id, relationArr, 'relationArrrelationArrrelationArr')
        // for (let j of relationArr) {
        //   if (this.relation[items.id].target !== j) {
        //     if (typeof this.formModel[j] === 'string') {
        //       this.$set(this.formModel, j, '')
        //     } else {
        //       this.$set(this.formModel, j, '')
        //     }
        //   }
        // }
        // if (!a) {
        //   this.$delete(this.formModel, items.id)
        //   // this.$set(this.formModel, items.id, null)
        // }
      }
      return a
    },
    iconTf (items) {
      // return (Boolean(this.comments[items.id]) & this.disabled)
      return Boolean(this.comments[items.id])
    },
    deleteError (items) {
      // this.errors[items.id] = false
      // this.$set(this.errors, items.id, false)
      // this.comments[items.id] = ''
      // this.$delete(this.errors, items.id)
      if (this.disabled) {
        this.$delete(this.comments, items.id)
        this.$emit('createEvaluate', this.comments)
      }
    },
    // form element all data  -> fromModel
    formatData () {
      let idGroup = []
      for (let i of this.newFields) {
        idGroup.push({id: i.id})
      }
      return idGroup
    },
    formatSubmission () {
      let newFormModels = Object.assign({}, this.formModel)
      // let formModels = Object.assign({}, this.formModel)
      for (let i in this.relation) {
        if (this.relation[i].ruleType === 'EQUAL') {
          if (Array.isArray(this.relation[i].value)) {
            if (!this.relation[i].value.includes(newFormModels[this.relation[i].target])) {
              newFormModels[i] = ''
            }
          } else {
            if (newFormModels[this.relation[i].target] !== this.relation[i].value) {
              newFormModels[i] = ''
            }
          }
        } else {
          if (Array.isArray(this.relation[i].value)) {
            if (this.relation[i].value.includes(newFormModels[this.relation[i].target])) {
              newFormModels[i] = ''
            }
          } else {
            if (newFormModels[this.relation[i].target] === this.relation[i].value) {
              newFormModels[i] = ''
            }
          }
        }
      }
      // for (let o of this.newFields) {
      //   if (o.type === 'INT' | o.type === 'DOUBLE') {
      //     if (newFormModels[o.id] === '') {
      //       newFormModels[o.id] = null
      //     } else {
      //       newFormModels[o.id] = Number(formModels[o.id])
      //     }
      //   }
      // }
      switch (newFormModels.type) {
        case 'SELECT':
        case 'SELECTMUTIPLE':
        case 'RADIO':
        case 'RADIOTEXT':
        case 'CHECKBOX':
        case 'CHECKBOXTEXT':
          // values
          if ('children' in newFormModels) {
            this.$delete(newFormModels, 'children')
          }
          if ('subFields' in newFormModels) {
            this.$delete(newFormModels, 'subFields')
          }
          break
        case 'CASCADER':
          // children
          if ('values' in newFormModels) {
            this.$delete(newFormModels, 'values')
          }
          if ('subFields' in newFormModels) {
            this.$delete(newFormModels, 'subFields')
          }
          break
        case 'TABLE':
          // subFields
          if ('values' in newFormModels) {
            this.$delete(newFormModels, 'values')
          }
          if ('children' in newFormModels) {
            this.$delete(newFormModels, 'children')
          }
          break
        default:
          if ('children' in newFormModels) {
            this.$delete(newFormModels, 'children')
          }
          if ('subFields' in newFormModels) {
            this.$delete(newFormModels, 'subFields')
          }
          if ('values' in newFormModels) {
            this.$delete(newFormModels, 'values')
          }
          break
      }
      return newFormModels
    },
    notVerifying () {
      this.$refs['formModel'].validate(async valid => {
        if (valid) {
          let newFormModels = await this.formatSubmission()
          let idGroup = this.formatData()
          console.log('truetruetruetruetrue')
          this.$emit('notVerifying', this.mozhuId, newFormModels, this.relation, this.newFields, idGroup, this.errors, this.comments, this.coordinate)
        } else {
          this.$message({
            showClose: true,
            message: '请检查数据',
            type: 'info'
          })
        }
      })
    },
    changeRules () {
      this.$refs['formModel'].validate(valid => {
        console.log('error submit!!')
      })
    },
    consoleData () {
      this.$refs['formModel'].validate(async valid => {
        if (valid) {
          let newFormModels = await this.formatSubmission()
          let idGroup = this.formatData()
          console.log('newFormModels', newFormModels, this.formModel)
          this.$emit('consoleData', this.mozhuId, newFormModels, this.relation, this.newFields, idGroup, this.errors, this.comments, this.coordinate)
        } else {
          this.$message({
            showClose: true,
            message: '请检查数据',
            type: 'info'
          })
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
      var reg = /\(|\)|[a-zA-Z]*[a-zA-Z0-9]+|\d+\.\d+|\d+|[a-zA-Z]+|\+|\-|\*|\/|\^|\%/g
      //判断条件
      var CONSTANT = /^\d+\.\d+$|^\d+$/
      var LEFT_BRACKET = /\(/
      var RIGHT_BRACKET = /\)/
      var OPERATOR = /\+|\-|\*|\/|\^|\%/
      var ID = /^[a-zA-Z]+[0-9]*$|^[a-zA-Z]*$/
      var patternList = pattern.match(reg)
      //2个queue
      var values = []
      var operator = []
      console.log(patternList)
      for (var i = 0; i < patternList.length; i++) {
        if (LEFT_BRACKET.test(patternList[i])) {
          continue
        } else if (RIGHT_BRACKET.test(patternList[i])) {
          if (operator.length === 0) return values[0]
          var v1 = values.pop()
          var v2 = values.pop()
          var op = operator.pop()
          var cal_value = null
          switch (op) {
            case '+': cal_value = v1 + v2; break
            case '-': cal_value = v2 - v1; break
            case '*': cal_value = v1 * v2; break
            case '/': cal_value = v2 / v1; break
            case '%': cal_value = v2 % v1; break
            case '^': cal_value = Math.pow(v2, v1); break
            default: throw "something wrong while calculating value 1"
          }
          values.push(cal_value);
        } else if (ID.test(patternList[i])) {
          // if (!(patternList[i] in data)) {
          //   // values.push(0)
          //   this.$message({
          //     showClose: true,
          //     message: '公式缺少id',
          //     type: 'warning'
          //   })
          // }
          // console.log(data[patternList[i]], 'data[patternList[i]]', patternList[i])
          values.push(Number(data[patternList[i]]))
        } else if (CONSTANT.test(patternList[i])) {
          values.push(Number(patternList[i]))
        } else if (OPERATOR.test(patternList[i])) {
          operator.push(patternList[i])
        } else {
          this.$message({
            showClose: true,
            message: '公式存在问题，请检查',
            type: 'warning'
          })
        }
      }
      // console.log(values, 'values')
      return Math.max(...values)
      // return values[0].toString()
      // return values[0].toFixed(2).toString()
      /* eslint-disable */
    },
    evaluate (row, index) {
      if (this.disabled && this.isSh) {
        console.log(row, index)
        this.evaluateRowData = row
        this.evaluateData = this.comments[row.id]
        this.evaluateDialogVisible = true
      }
    },
    createEvaluate (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      // this.errors[this.evaluateRowData.id] = true
      this.comments[this.evaluateRowData.id] = Object.assign(formModel, {label: this.evaluateRowData.label, id: this.evaluateRowData.id})
      this.$emit('createEvaluate', this.comments)
      // this.$set(this.errors, this.evaluateRowData.id, true)
      // this.$set(this.comments, this.evaluateRowData.id, formModel)
      // console.log(this.errors, this.comments)
      this.evaluateDialogVisible = false
    },
    // form element operation (计算)
    checkUpData () {
      let pattern = /[a-zA-Z][a-zA-Z0-9]*/g
      for (let i in this.formModel) {
        for (let j of this.mozhu.fields) {
          if (j.id === i && j.type === 'CALCULATE') {
            let patternAfter = j.calculate.match(pattern) ? j.calculate.match(pattern) : []
            let notHaveLabelArr = []
            let notHaveArr = []
            let b = false
            for (let g of patternAfter) {
              b = false
              for (let z in this.formModel) {
                if (z === g) {
                  b = true
                  break
                }
              }
              if (!b) notHaveArr.push(g)
            }
            if (notHaveArr.length) {
              this.$message({
                showClose: true,
                message: '计算中有字段模板中未添加' + notHaveArr.toString(),
                type: 'warning'
              })
              return false
            } else return true
          }
        }
      }
      return true
    },
    onEval (ev) {
      console.log(this.formModel, ev.calculate, this.checkUpData())
      if (this.checkUpData()) {
        this.$set(this.formModel, ev.id, this.calculate(this.formModel, ev.calculate))
      }
      // this.formModel[ev.id] = this.calculate(this.formModel, ev.values)
      // this.formModel[ev.id] = this.calculate(this.formModel, this.compute[ev.id])  
    },
    cancelData () {
      this.$emit('cancelData', true)
    },
    resetData () {
      this.formModel = {}
      this.init()
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
    async clearData () {
      // this.formModel = {}
      this.formModel = {}
      this.init()
      this.$emit('input', this.formModel)
    },
    againData () {
      this.newFields = this.mozhu['fields']
      // this.init()
      console.log(this.newFields, 'this.newFieldsthis.newFieldsthis.newFields')
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
    width: 25px;
    font-size: 14px;
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
      margin: 3px;
      // margin-left: 15px;
      margin-right: 6px;
    }
    /deep/ .el-form-item, /deep/ .el-form-item--mini {
      display: flex !important;
      flex-wrap: nowrap;
      // justify-content: space-between;
      width: 100%;
      .el-form-item__content {
        // flex-grow: 1;
        width: calc(100% - 138px)
      }
    }
    .normal {
      /deep/ .el-form-item__label {
        // min-width: 138px;
        // max-width: 190px;
        width: 138px;
        // width: 10%;
        white-space:normal;
        word-break:break-all;
        word-wrap:break-word; 
      }
    }
    .abnormal {
      /deep/ .el-form-item__label {
        min-width: 0px;
        width: 100%;
      }
      /deep/ .el-form-item__content {
        width: 0%;
        // flex-grow: 1;
        // width: 100%
      }
    }
    .noLabel {
      /deep/ .el-form-item__label {
        width: 0px;
      }
      /deep/ .el-form-item__content {
        width: 100%;
      }
    }
  }
  

}

</style>
<style lang="scss">
.el-popover {
  .allImages {
    height: 200px;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .images {
      width: 100%;
      margin-bottom: 13px;
    }
  }
  .viewerWrapper {
    height: 200px;
    width: 100%;
    position: relative;
    .viewer {
      height: 100%;
      width: 100%;
      .images {
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 5px;
        .image-wrapper {
          display: inline-block;
          width: calc(33% - 20px);
          margin: 5px 5px 0 5px;
          .image {
            width: 100%;
            cursor: pointer;
            display: inline-block;
          }
        }
      }
    }
    .viewer-container, .viewer-backdrop {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
// .formAll {
//   .formContent {
//     .el-form-item, .el-form-item--mini {
//       display: flex !important;
//       flex-wrap: nowrap;
//       width: 100%;
//       .el-form-item__content {
//         flex-grow: 1;
//       }
//     }
//     .el-form-item__label {
//       min-width: 150px;
//       white-space:normal;
//       word-break:break-all;
//       word-wrap:break-word; 
//     }
//   }
// }
</style>
