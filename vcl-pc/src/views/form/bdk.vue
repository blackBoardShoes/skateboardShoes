<template>
  <div class="formAll">
    <div class="formContent">
      <div class="formContentTop" v-if="fewStepsTF">
        <div class="formTop">
          <div class="formTopLeft">
            <div class="formTopLeftLeft">
              <!-- @blur="lookupFormInput" -->
              <el-input
                @keyup.enter.native="lookupFormInput"
                size="small"
                placeholder="检索表单"
                v-model="lookupFormInputData"
                clearable
                prefix-icon="el-icon-search"></el-input>
            </div>
            <div class="formTopLeftRight">
                阶段筛选: &nbsp;&nbsp;&nbsp;&nbsp;
                <el-checkbox-group
                  class=""
                  v-model="stagelookupData">
                  <el-checkbox v-for="(item, index) in stageLookUpArr" :label="item" :key="index">{{item}}</el-checkbox>
                </el-checkbox-group>
            </div>
          </div>
          <div class="formTopRight">
            <el-button type="primary" @click="addForm">新增表单</el-button>
          </div>
        </div>
        <div class="formCard">
          <div class="formCardContent">
            <sx-form-card
              @templateEdit="templateEdit"
              @templateDelete="templateDelete"
              v-for="(item, index) in cardArr" :key="index" :cardObj='item' :index="index"></sx-form-card>
            <div v-if="cardArrComplement.length"
              style="width: 24%; border: 0.5px solid transparent"
              v-for="(x, i) in cardArrComplement" :key="cardArr.length + i"></div>
          </div>
        </div>
      </div>
      <div class="createFormContent"  v-if="!fewStepsTF">
        <div class="createTop">
          <el-button type="info"  @click="editAddBack">返回</el-button>
          <el-button type="primary"  @click="editAddForm">保存</el-button>
        </div>
        <div class="createTopForm">
          <el-form size="small" ref="formModel" :model="formModel" label-width="90px"
            style="display:flex;flex-wrap:wrap;">
            <el-form-item
              :style="{width: item.width}"
              :prop="item.id"
              :rules="item.validations"
              :label="item.label" v-for="(item, index) in createTopForm" :key="index">
              <el-input
                v-model="formModel[item.id]" v-if="item.type === 'INPUT'"
                :placeholder="item.placeholder"></el-input>
              <el-select v-model="formModel[item.id]" v-if="item.type === 'SELECT'" :placeholder="item.placeholder">
                <el-option
                  v-for="item in item.value"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-popover
                class="iconPopover"
                v-if="item.type === 'ICON'"
                placement="bottom"
                title="表单图标"
                width="260"
                trigger="hover">
                  <el-radio-group v-model="formModel[item.id]">
                    <el-radio :label="item.value" v-for="(item, index) in iconArr" :key="index" style="margin: 10px;">
                      <i :class="item.value" style="font-size: 20px"></i>
                    </el-radio>
                  </el-radio-group>
                <el-button slot="reference" :icon="formModel[item.id] ? formModel[item.id] : 'el-icon-plus'" circle></el-button>
              </el-popover>
            </el-form-item>
          </el-form>
        </div>
        <sx-segmenting-line>
          <div slot="prepend" class="centerCenter">
            <i class="el-icon-setting centerCenterIcon"></i>&nbsp;字段设置
          </div>
        </sx-segmenting-line>
        <br>
        <div class="createContent">
          <!-- transferModel -->
          <el-transfer
            style="height:500px;"
            v-model="formModel['fields']"
            filterable
            :render-content="renderFunc"
            :titles="['字段库', '当前表']"
            :button-texts="[' 删除字段', '添加字段 ']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @change="transferHandleChange"
            :data="transferData">
            <div class="transfer-footer" slot="left-footer"></div>
            <el-button @click="openRelation" class="transfer-footer" slot="right-footer" size="mini">关联关系</el-button>
          </el-transfer>
        </div>
      </div>
    </div>
    <el-dialog
      title="关联关系"
      v-if="relationDialogVisible"
      :visible.sync="relationDialogVisible">
      <div style="width:100%;">
        <sx-relation-factory
          :needCreatedRelation="needCreatedRelation"
          @getRealationData="getRealationData">
          </sx-relation-factory>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import sxFormCard from '@/components/allCard/formCard'
import sxSegmentingLine from '@/components/segmentingLine'
import sxRelationFactory from '@/components/dynamicForm/relationFactory'
import data from '@/components/dynamicForm/data.js'
export default {
  components: {
    sxFormCard,
    sxRelationFactory,
    sxSegmentingLine
  },
  data () {
    return {
      mozhu: data,
      relationDialogVisible: false,
      needCreatedRelation: {},
      fewStepsTF: true,
      cardArr: [
        {
          num: '111',
          state: '术中',
          icon: 'el-icon-goods',
          name: 'ERCP取石结果'
        },
        {
          num: '111',
          state: '术后',
          icon: 'el-icon-edit',
          name: 'ERCP取石结果'
        },
        {
          // num: '111',
          state: '术前',
          icon: 'el-icon-goods',
          name: 'ERCP取石结果'
        }
      ],
      cardIndex: 0,
      editOrAdd: false,
      iconArr: [
        {
          label: 'cao',
          value: 'el-icon-edit'
        },
        {
          label: 'cao',
          value: 'el-icon-edit'
        },
        {
          label: 'cao1',
          value: 'el-icon-share'
        },
        {
          label: 'cao2',
          value: 'el-icon-delete'
        },
        {
          label: 'cao3',
          value: 'el-icon-success'
        }
      ],
      createTopForm: [
        {
          id: 'id',
          label: 'ID',
          width: '30%',
          type: 'INPUT',
          validations: [
            { required: true, message: '请输入组件ID', trigger: 'change' },
            { pattern: '^[a-zA-Z][a-zA-Z0-9]+$', message: '以英文字母开头的英文或数字(两位以上)', trigger: 'change' }
          ]
        },
        {
          id: 'name',
          label: '表单名称',
          placeholder: '术前诊断结果',
          type: 'INPUT',
          validations: [
            { required: true, message: '请输入表单名称', trigger: 'change' }
            // { pattern: '^[a-zA-Z][a-zA-Z0-9]*$', message: '只能输入以英文字母开头的英文或数字', trigger: 'change' }
          ]
        },
        {
          id: 'state',
          value: [
            {
              value: '术前',
              label: '术前'
            },
            {
              value: '术中',
              label: '术中'
            },
            {
              value: '术后',
              label: '术后'
            }
          ],
          label: '所属阶段',
          placeholder: '请选择所属阶段',
          type: 'SELECT',
          validations: [
            { required: true, message: '请选择所属阶段', trigger: 'change' }
          ]
        },
        {
          id: 'icon',
          label: '表单图标',
          type: 'ICON',
          width: '190px',
          validations: [
            { required: true, message: '请选择表单图标', trigger: 'change' }
          ]
        },
        {
          id: 'introduction',
          label: '表单简介',
          placeholder: '表单的简要说明',
          type: 'INPUT',
          width: '67.5%'
        }
      ],
      cardArrComplement: [],
      lookupFormInputData: '',
      stagelookupData: ['术前', '术中', '术后', '随访'],
      stageLookUpArr: ['术前', '术中', '术后', '随访'],
      // transferModel: [],
      transferData: [],
      formModel: {}
      // relation: {}
    }
  },
  created () {
    this.firstShow()
    this.init()
  },
  methods: {
    firstShow () {
      // transferData
      this.transferData = [...this.mozhu.fields]
      for (let i in this.mozhu.fields) {
        this.transferData[i]['key'] = this.mozhu.fields[i].id
        // this.$set(this.transferData[i], 'key', this.mozhu.fields[i].id)
      }
      this.cardComplementShow()
    },
    cardComplementShow () {
      // 补位 card
      for (let i = 0; i < (4 - this.cardArr.length % 4); i++) {
        this.cardArrComplement.push({i: i})
      }
    },
    init () {
      this.$set(this.formModel, 'relation', {})
      this.$set(this.formModel, 'fields', [])
      // this.$set(this.formModel, 'fields', this.formModel['fields'] ? this.formModel['fields'] : [])
      // this.$set(this.formModel, 'relation', this.formModel['relation'] ? this.formModel['relation'] : {})
      for (let i of this.createTopForm) {
        this.$set(this.formModel, i.id, '')
      }
    },
    // one
    templateEdit (value, index) {
      console.log(value)
      this.formModel = Object.assign({}, value)
      this.cardIndex = index
      this.editOrAdd = true
      this.fewStepsTF = false
    },
    templateDelete (value, index) {
      this.cardArr.splice(index, 1)
      this.cardComplementShow()
    },
    // two
    iconJudgeChoose (type) {
      let icon = ''
      switch (type) {
        case 'INPUT':
          icon = 'el-icon-info'
          break
        case 'INT':
          icon = 'el-icon-error'
          break
        case 'DOUBLE':
          icon = 'el-icon-success'
          break
        case 'TEXTAREA':
          icon = 'el-icon-warning'
          break
        case 'RADIO':
          icon = 'el-icon-question'
          break
        case 'CHECKBOX':
          icon = 'el-icon-back'
          break
        case 'SWITCH':
          icon = 'el-icon-arrow-left'
          break
        case 'SELECT':
          icon = 'el-icon-arrow-down'
          break
        case 'SELECTMUTIPLE':
          icon = 'el-icon-remove'
          break
        case 'DATE':
          icon = 'el-icon-circle-plus'
          break
        case 'DATETIME':
          icon = 'el-icon-rank'
          break
        case 'CASCADER':
          icon = 'el-icon-location'
          break
        case 'CALCULATE':
          icon = 'el-icon-menu'
          break
        case 'TABLE':
          icon = 'el-icon-edit'
          break
        default:
          icon = 'el-icon-info'
          break
      }
      return icon
    },
    renderFunc (h, option) {
      let iconClass = this.iconJudgeChoose(option.type)
      return <span>&nbsp; <i class={ iconClass }></i> &nbsp; { option.label }</span>
    },
    lookupFormInput () {
      console.log('lookupFormInput')
    },
    transferHandleChange (value, direction, movedKeys) {
      console.log(value)
    },
    openRelation () {
      let newFields = []
      this.formModel['fields'] = this.formModel['fields'] ? this.formModel['fields'] : []
      this.formModel['relation'] = this.formModel['relation'] ? this.formModel['relation'] : {}
      for (let i of this.formModel['fields']) {
        for (let j of this.mozhu['fields']) {
          if (j.id === i) {
            newFields.push(j)
          }
        }
      }
      this.needCreatedRelation = {
        id: this.mozhu.id,
        relation: this.formModel['relation'],
        subFields: newFields
      }
      // this.needCreatedRelation = this.mozhu
      this.relationDialogVisible = true
    },
    getRealationData (data, id) {
      this.formModel['relation'] = Object.assign({}, data)
      // this.relation = Object.assign({}, data)
      // console.log(data, id)
      this.relationDialogVisible = false
    },
    addForm () {
      this.init()
      this.editOrAdd = false
      this.fewStepsTF = false
    },
    editAddBack () {
      console.log(this.formModel)
      console.log(this.cardArr)
      this.fewStepsTF = true
    },
    editAddForm () {
      this.$refs['formModel'].validate(valid => {
        if (valid) {
          if (this.checkUpData()) {
            if (this.editOrAdd) {
              this.cardArr[this.cardIndex] = this.formModel
            } else {
              this.cardArr.push(this.formModel)
            }
            this.fewStepsTF = true
          }
        } else {
          return false
        }
      })
    },
    checkUpData () {
      let pattern = /[a-zA-Z][a-zA-Z0-9]*/g
      for (let i of this.formModel.fields) {
        for (let j of this.mozhu.fields) {
          if (j.id === i & j.type === 'CALCULATE') {
            let patternAfter = j.values.match(pattern) ? j.values.match(pattern) : []
            let notHaveLabelArr = []
            let notHaveArr = []
            let b = false
            for (let g of patternAfter) {
              b = false
              for (let z of this.formModel['fields']) {
                if (z === g) {
                  b = true
                  break
                }
              }
              if (!b) notHaveArr.push(g)
            }
            for (let s of this.mozhu['fields']) {
              for (let o of notHaveArr) {
                if (s.id === o) {
                  notHaveLabelArr.push(s.label)
                }
              }
            }
            if (notHaveArr.length) {
              this.$message({
                showClose: true,
                message: '计算中有字段模板中未添加' + notHaveLabelArr.toString(),
                type: 'warning'
              })
              return false
            } else return true
          }
        }
      }
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/variable';
$full:100%;
$contentW: 95%;
$topH: 100px;
$bottomH: 200px;
.formAll {
  width: $full;
  display: flex;
  justify-content: center;
  .formContent {
    display: flex;
    // flex-wrap: wrap;
    flex-direction: column;
    width: $contentW;
    .formContentTop {
      width: $full;
      height: $full;
      display: flex;
      flex-direction: column;
      .formTop {
        width: $full;
        height: $topH;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .formTopLeft {
          flex-grow: 1;
          display: flex;
          align-items: center;
        }
        .formTopLeftLeft {
          width: 30%;
        }
        .formTopLeftRight {
          margin-left: 20px;
          font-size: 14px;
          display: flex;
          flex-wrap: nowrap;
          background: $groupColor;
          align-items: center;
          padding: 6px;
          padding-left: 11px;
          padding-right: 11px;
        }
      }
      .formCard {
        // height: $full;
        flex-grow: 1;
        overflow: auto;
        padding: 10px;
        .formCardContent {
          width: 100%;
          padding-bottom: $bottomH;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      }
    }
    .createFormContent {
      width: $full;
      height: $full;
      .createTop {
        width: $full;
        height: $topH;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      // .createTopForm {}
      .createContent {
        width: $full;
        .el-transfer {
          width: $full;
          display: flex;
          align-items: center;
          /deep/ .el-transfer-panel {
            flex-grow: 1;
            height: 450px;
          }
          /deep/ .el-transfer-panel__body {
            height: 450px;
          }
          /deep/ .el-transfer-panel__list.is-filterable {
            height: calc(450px - 140px);
          }
        }
      }
      .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
      }
    }
    .centerCenter {
      display: flex;
      align-items: center;
      padding-top:10px;
      padding-bottom:10px;
      .centerCenterIcon {
        font-size: 26px;
      }
    }
  }
}
</style>
<style lang="scss">
.el-transfer-panel {
  width: 250px;
}

.el-transfer-panel__body {
  height: 500px;
}

.el-transfer-panel__list.is-filterable {
  height: 468px;
}
</style>
