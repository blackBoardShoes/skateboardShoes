<template>
  <div class="formAll">
    <div class="formContent">
      <div class="formContentTop" v-if="fewStepsTF">
        <div class="formTop">
          <div class="formTopLeft">
            <div class="formTopLeftLeft">
              <el-input
                size="small"
                placeholder="检索表单"
                v-model="lookupFormInput"
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
            <el-button type="primary" icon="el-icon-plus" @click="addForm">新增表单</el-button>
          </div>
        </div>
        <div class="formCard">
          <formCard
            @templateEdit="templateEdit"
            v-for="(item, index) in cardArr" :key="index" :cardObj='item' :index="index"></formCard>
          <div v-if="cardArrComplement.length"
            style="width: 24%; border: 0.5px solid transparent"
            v-for="(x, i) in cardArrComplement" :key="cardArr.length + i"></div>
        </div>
      </div>
      <div class="createFormContent"  v-if="!fewStepsTF">
        <div class="createTop">
          <el-button type="info" icon="el-icon-back" @click="editAddBack">返回</el-button>
          <el-button type="primary" icon="el-icon-document" @click="editAddForm">保存修改</el-button>
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
        <segmenting-line>
          <div slot="prepend" class="centerCenter">
            <i class="el-icon-setting centerCenterIcon"></i>&nbsp;字段设置
          </div>
        </segmenting-line>
        <br>
        <div class="createContent">
          <!-- transferModel -->
          <el-transfer
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
            <div class="transfer-footer"></div>
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
        <relation-factory
          :needCreatedRelation="needCreatedRelation"
          @getRealationData="getRealationData">
          </relation-factory>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import formCard from '@/components/allCard/formCard'
import segmentingLine from '@/components/segmentingLine'
import relationFactory from '@/components/dynamicForm/relationFactory'
import data from '@/components/dynamicForm/data.js'
export default {
  components: {
    formCard,
    relationFactory,
    segmentingLine
  },
  data () {
    return {
      mozhu: data,
      relationDialogVisible: false,
      needCreatedRelation: {},
      fewStepsTF: false,
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
      lookupFormInput: '',
      stagelookupData: ['术前', '术中', '术后', '随访'],
      stageLookUpArr: ['术前', '术中', '术后', '随访'],
      // transferModel: [],
      transferData: [],
      formModel: {},
      // relation: {},
      renderFunc (h, option) {
        return <span>&nbsp; <i class={ option.icon }></i> &nbsp; { option.label }</span>
      }
    }
  },
  created () {
    this.firstShow()
    this.init()
  },
  methods: {
    firstShow () {
      // 补位
      for (let i = 0; i < (4 - this.cardArr.length % 4); i++) {
        this.cardArrComplement.push({i: i})
      }
      // transferData
      this.transferData = [...this.mozhu.fields]
      for (let i in this.mozhu.fields) {
        this.transferData[i]['key'] = this.mozhu.fields[i].id
        // this.$set(this.transferData[i], 'key', this.mozhu.fields[i].id)
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
    // two
    transferHandleChange (value, direction, movedKeys) {
      console.log(value)
    },
    openRelation () {
      let newFields = []
      this.formModel['fields'] = this.formModel['fields'] ? this.formModel['fields'] : []
      this.formModel['relation'] = this.formModel['relation'] ? this.formModel['relation'] : {}
      for (let i of this.formModel['fields']) {
        for (let j of this.mozhu.fields) {
          if (j.id === i) {
            newFields.push(j)
          }
        }
      }
      this.needCreatedRelation = {
        id: this.mozhu.id,
        relation: this.formModel['relation'],
        sub_fields: newFields
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
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
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
        display: flex;
        justify-content: center;
        height: 50%;
        .el-transfer {
          height: $full;
          width: $full;
          display: flex;
          align-items: center;
          // el-checkbox-group el-transfer-panel__list is-filterable
          /deep/ .el-transfer-panel, /deep/ .el-transfer-panel__body, /deep/ .el-transfer-panel__list.is-filterable {
            height: $full;
            overflow: auto;
            flex-grow: 1;
          }
          /deep/ .el-transfer-panel {
            overflow: hidden;
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
