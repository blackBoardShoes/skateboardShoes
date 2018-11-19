<template>
  <div class="formAll">
    <div class="formContent">
      <div class="formContentTop" v-if="fewStepsTF">
        <div class="formTop">
          <div class="formTopLeft">
            <div class="formTopLeftLeft">
              <!-- @blur="lookupFormInput" -->
              <el-input
                @keyup.enter.native="lookupChange"
                size="small"
                placeholder="检索表单"
                v-model="lookupData"
                clearable
                prefix-icon="el-icon-search"></el-input>
            </div>
            <div class="formTopLeftRight">
                阶段筛选: &nbsp;&nbsp;&nbsp;&nbsp;
                <el-checkbox-group
                  v-model="stagelookupData">
                  <el-checkbox v-for="(item, index) in stageLookUpArr" :label="item" :key="index" style="margin:0px 5px">{{item}}</el-checkbox>
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
              class="formCardContentCard"
              v-if="lookupChange(item) & filterItem(item)"
              @templateEdit="templateEdit"
              @templateDelete="templateDelete"
              v-for="(item, index) in cardArr" :key="index" :cardObj='item' :index="index"></sx-form-card>
            <!-- <div v-if="cardArrComplement.length"
              style="width: 24%; border: 0.5px solid transparent"
              v-for="(x, i) in cardArrComplement" :key="cardArr.length + i"></div> -->
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
                style="width:100%"
                v-model.trim="formModel[item.id]" v-if="item.type === 'INPUT'"
                :placeholder="item.placeholder"></el-input>
              <el-select style="width:100%" v-model="formModel[item.id]" v-if="item.type === 'SELECT'" :placeholder="item.placeholder">
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
                placement="bottom-start"
                width="500"
                trigger="hover">
                  <el-radio-group v-model="formModel[item.id]" style="margin: 8px;">
                    <el-radio :label="item.value" v-for="(item, index) in iconArr" :key="index" style="width: 100px;margin: 10px;">
                      <i :class="item.value" style="font-size: 18px"></i> {{item.label}}
                    </el-radio>
                  </el-radio-group>
                <el-button slot="reference" :icon="formModel[item.id] ? formModel[item.id] : 'el-icon-plus'" circle></el-button>
              </el-popover>
              <el-input-number v-if="item.type === 'INPUTNUMBER'" :min="0" v-model="formModel[item.id]"></el-input-number>
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
          <!-- <el-transfer
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
          </el-transfer> -->
          <el-row type="flex" justify="space-between" style="width:100%">
            <el-col :span="10" style="display:flex;justify-content: center">
              <sx-min-tree
                ref="minTreeOne"
                :title="'字段库'"
                :mark="'leftChecked'"
                v-model="leftData" showCheckbox style="width: 100%;max-width:400px;"
                @handleCheckChange="handleCheckChange"></sx-min-tree>
            </el-col>
            <el-col :span="4" style="display:flex;align-items:center;height:100%;justify-content: center;">
              <div style="display: flex;flex-grow: 0.1;flex-direction: column;align-self: center;justify-content: center;">
                <div>
                  <el-button
                    :disabled="Boolean(!rightChecked.length)"
                    type="primary"
                    style="width:100%;" @click="deleteField" icon="el-icon-arrow-left">
                    删除字段</el-button>
                </div>
                <div style="margin-top: 15px;">
                  <el-button
                    :disabled="Boolean(!leftChecked.length)"
                    type="primary"
                    style="width:100%;" @click="addField" icon="el-icon-arrow-right">
                    增加字段</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="10" style="display:flex;justify-content: center">
              <sx-min-tree
                ref="minTreeTwo"
                :title="'当前表'"
                :mark="'rightChecked'"
                v-model="rightData" draggable
                showCheckbox style="width: 100%;max-width:400px" @handleCheckChange="handleCheckChange">
                <div slot="bottom" class="createContentBottom">
                  <el-button @click="openRelation" size="mini">关联关系</el-button>
                  <el-button @click="openCoordinate" size="mini">排版</el-button>
                  <el-button @click="openPreview" size="mini">预览</el-button>
                </div>
              </sx-min-tree>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 关联关系-->
    <el-dialog
      title="关联关系"
      append-to-body
      v-if="relationDialogVisible"
      :visible.sync="relationDialogVisible">
      <div style="width:100%;">
        <sx-relation-factory
          :needCreatedRelation="needCreatedRelation"
          @getRealationData="getRealationData">
          </sx-relation-factory>
      </div>
    </el-dialog>
    <!-- 排版-->
    <el-dialog
      title="排版"
      append-to-body
      v-if="coordinateDialogVisible"
      :visible.sync="coordinateDialogVisible">
      <div style="width:100%;">
        <sx-coordinate-factory
        :needCreatedCoordinate="needCreatedCoordinate"
        @getCoordinateData="getCoordinateData"></sx-coordinate-factory>
      </div>
    </el-dialog>
    <!-- 预览-->
    <el-dialog
      width="1000px"
      title="预览"
      append-to-body
      v-if="previewDialogVisible"
      :visible.sync="previewDialogVisible">
      <div style="width:100%;">
        <sx-min-form ref="thatFormPreview" v-model="previewFishData" :mozhu="previewFormModel"></sx-min-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import sxFormCard from '@/components/allCard/formCard'
import sxSegmentingLine from '@/components/segmentingLine'
import sxRelationFactory from '@/components/dynamicForm/relationFactory'
import sxCoordinateFactory from '../../components/dynamicForm/coordinateFactory'
import sxMinTree from '@/components/dynamicForm/minTree'
// import data from '@/components/dynamicForm/data.js'
import { fieldAllFields } from '../../api/form/zdk.js'
import { fieldAllForms, addFormPost, editFormPut, formDelete } from '../../api/form/bdk.js'

export default {
  components: {
    sxFormCard,
    sxRelationFactory,
    sxCoordinateFactory,
    sxSegmentingLine,
    sxMinTree
  },
  data () {
    return {
      mozhu: {},
      relationDialogVisible: false,
      previewDialogVisible: false,
      coordinateDialogVisible: false,
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
          label: '麻醉',
          value: 'ercp-icon-medicine-anaesthesia'
        },
        {
          label: '腹部',
          value: 'ercp-icon-medicine-belly'
        },
        {
          label: '取消预约',
          value: 'ercp-icon-medicine-cancel'
        },
        {
          label: '插管',
          value: 'ercp-icon-medicine-cannula'
        },
        {
          label: '并发症',
          value: 'ercp-icon-medicine-complication'
        },
        {
          label: '切开',
          value: 'ercp-icon-medicine-cut'
        },
        {
          label: '诊断',
          value: 'ercp-icon-medicine-diagnosis'
        },
        {
          label: '饮食',
          value: 'ercp-icon-medicine-diet'
        },
        {
          label: '出院评估',
          value: 'ercp-icon-medicine-discharge'
        },
        {
          label: '憩室',
          value: 'ercp-icon-medicine-diverticulum'
        },
        {
          label: '引流',
          value: 'ercp-icon-medicine-drainage'
        },
        {
          label: '饮酒',
          value: 'ercp-icon-medicine-drinking'
        },
        {
          label: '药品',
          value: 'ercp-icon-medicine-drug'
        },
        {
          label: '手术评估',
          value: 'ercp-icon-medicine-estimate'
        },
        {
          label: '扩张',
          value: 'ercp-icon-medicine-expand'
        },
        {
          label: '随访',
          value: 'ercp-icon-medicine-followup'
        },
        {
          label: '胆管',
          value: 'ercp-icon-medicine-gallbladder'
        },
        {
          label: '导丝',
          value: 'ercp-icon-medicine-guidewire'
        },
        {
          label: '医院',
          value: 'ercp-icon-medicine-hospital'
        },
        {
          label: '炎症',
          value: 'ercp-icon-medicine-inflammation'
        },
        {
          label: '输液',
          value: 'ercp-icon-medicine-infusion'
        },
        {
          label: '实验检查',
          value: 'ercp-icon-medicine-laboratory'
        },
        {
          label: '取石',
          value: 'ercp-icon-medicine-lithotomy'
        },
        {
          label: '手术',
          value: 'ercp-icon-medicine-operation'
        },
        {
          label: '肠胰',
          value: 'ercp-icon-medicine-pancreas'
        },
        {
          label: '既往史',
          value: 'ercp-icon-medicine-passhistory'
        },
        {
          label: '五联症',
          value: 'ercp-icon-medicine-pentalogy'
        },
        {
          label: '影像学',
          value: 'ercp-icon-medicine-photograph'
        },
        {
          label: '体格',
          value: 'ercp-icon-medicine-physique'
        },
        {
          label: '造影',
          value: 'ercp-icon-medicine-radiography'
        },
        {
          label: '手术报告',
          value: 'ercp-icon-medicine-report'
        },
        {
          label: '预约',
          value: 'ercp-icon-medicine-reservation'
        },
        {
          label: '床位',
          value: 'ercp-icon-medicine-sickbed'
        },
        {
          label: '一般情况',
          value: 'ercp-icon-medicine-situation'
        },
        {
          label: '胃脏',
          value: 'ercp-icon-medicine-stomach'
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
          // placeholder: '术前诊断结果',
          type: 'INPUT',
          validations: [
            { required: true, message: '请输入表单名称', trigger: 'change' }
            // { pattern: '^[a-zA-Z][a-zA-Z0-9]*$', message: '只能输入以英文字母开头的英文或数字', trigger: 'change' }
          ]
        },
        {
          width: '23%',
          id: 'phase',
          value: [
            {
              value: '住院基本情况',
              label: '住院基本情况'
            },
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
            },
            {
              value: '出院综合评估',
              label: '出院综合评估'
            },
            {
              value: '随访',
              label: '随访'
            }
          ],
          label: '所属阶段',
          // placeholder: '请选择所属阶段',
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
          id: 'description',
          label: '表单简介',
          // placeholder: '表单的简要说明',
          type: 'INPUT',
          width: '60.5%'
        },
        {
          id: 'sortIndex',
          label: '排序索引',
          // placeholder: '数字越小越小优先级越大,0代表优先级最高,默认为0',
          type: 'INPUTNUMBER',
          width: '190px'
        }
      ],
      lookupData: '',
      stagelookupData: ['住院基本情况', '术前', '术中', '术后', '出院综合评估', '随访'],
      stageLookUpArr: ['住院基本情况', '术前', '术中', '术后', '出院综合评估', '随访'],
      // transferModel: [],
      // transferData: [],
      formModel: {},
      previewFormModel: {},
      leftChecked: [],
      rightChecked: [],
      leftData: [],
      rightData: [],
      previewFishData: {}
      // relation: {}
    }
  },
  created () {
    console.log(this.leftChecked, '---------')
    this.firstShow()
    this.show()
  },
  methods: {
    async show () {
      let data = {
        formsData: await fieldAllForms()
      }
      this.cardArr = data.formsData ? data.formsData.data.entity : []
      console.log(this.cardArr, 'this.cardArr')
    },
    async firstShow () {
      let fieldsData = await fieldAllFields()
      console.log(fieldsData)
      if (fieldsData) {
        this.mozhu = fieldsData.data.entity
      }
      // this.mozhu = data.fieldsData ? data.fieldsData.data.entity : {}
    },
    init () {
      this.$set(this.formModel, 'relation', {})
      this.$set(this.formModel, 'coordinate', {})
      this.$set(this.formModel, 'fields', [])
      this.leftData = [...this.mozhu]
      this.rightData = []
      this.leftChecked = []
      this.rightChecked = []
      console.log(this.formModel)
      // this.$set(this.formModel, 'fields', this.formModel['fields'] ? this.formModel['fields'] : [])
      // this.$set(this.formModel, 'relation', this.formModel['relation'] ? this.formModel['relation'] : {})
      for (let i of this.createTopForm) {
        if (i.type === 'INPUTNUMBER') {
          this.$set(this.formModel, i.id, this.cardArr.length)
        } else {
          this.$set(this.formModel, i.id, '')
        }
      }
    },
    // one
    templateEdit (value, index) {
      this.init()
      this.formModel = Object.assign({}, value)
      console.log(this.formModel, '-----')
      console.log(this.mozhu, '---11111111--')
      if (this.formModel.fields) {
        this.rightData = [...this.formModel.fields]
        // this.leftData = [...this.mozhu]
        this.leftData = []
        let leftDataFilter = [...this.mozhu]
        for (let i in leftDataFilter) {
          for (let j of this.rightData) {
            if (leftDataFilter[i].id === j.id) {
              // this.leftData.push(j)
              leftDataFilter[i] = false
              // this.$delete(this.leftData, i)
            }
          }
        }
        for (let z of leftDataFilter) {
          if (z) {
            this.leftData.push(z)
          }
        }
      } else {
        this.rightData = []
        this.leftData = [...this.mozhu]
      }
      this.cardIndex = index
      this.editOrAdd = true
      this.fewStepsTF = false
    },
    async templateDelete (value, index) {
      this.$confirm('此操作将删除表单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        let fd = await formDelete(value.id)
        if (fd) {
          this.cardArr.splice(index, 1)
        }
        // this.show()
      }).catch(_ => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
      // this.cardArr.splice(index, 1)
      // this.cardComplementShow()
    },
    addForm () {
      this.init()
      this.editOrAdd = false
      this.fewStepsTF = false
    },
    // two
    iconJudgeChoose (type) {
      let icon = ''
      switch (type) {
        case 'INPUT':
          icon = 'ercp-icon-component-input'
          break
        case 'INT':
          icon = 'ercp-icon-component-integer'
          break
        case 'DOUBLE':
          icon = 'ercp-icon-component-integer'
          break
        case 'TEXTAREA':
          icon = 'ercp-icon-component-textarea'
          break
        case 'RADIO':
        case 'RADIOTEXT':
          icon = 'ercp-icon-component--radio'
          break
        case 'CHECKBOX':
        case 'CHECKBOXTEXT':
          icon = 'ercp-icon-component-check'
          break
        case 'SELECT':
          icon = 'ercp-icon-component-checklist'
          break
        case 'SELECTMUTIPLE':
          icon = 'ercp-icon-component-checklist'
          break
        case 'DATE':
          icon = 'ercp-icon-component-date'
          break
        case 'DATETIME':
          icon = 'ercp-icon-component-time'
          break
        case 'CASCADER':
          icon = 'ercp-icon-component-cascade'
          break
        case 'CALCULATE':
          icon = 'ercp-icon-component-compute'
          break
        case 'TABLE':
          icon = 'ercp-icon-component-table'
          break
        default:
          icon = 'el-icon-info'
          break
      }
      return icon
    },
    lookupChange (item) {
      console.log(item)
      if (item['isStatic']) {
        return false
      } else {
        return Object.values(item).toString().includes(this.lookupData)
      }
    },
    filterItem (item) {
      return this.stagelookupData.includes(item.phase)
    },
    handleCheckChange (getCheckedNodes, getCheckedKeys, mark) {
      if (mark === 'leftChecked') {
        this.leftChecked = getCheckedNodes
      } else {
        this.rightChecked = getCheckedNodes
      }
    },
    deleteField () {
      this.leftData = this.leftData.concat([...this.rightChecked])
      for (let i in this.rightData) {
        for (let j in this.rightChecked) {
          if (this.rightData[i].id === this.rightChecked[j].id) {
            this.$delete(this.rightData, i)
          }
        }
      }
      this.rightChecked = []
      this.$refs.minTreeTwo.clearCheckAll()
    },
    addField () {
      this.rightData = this.rightData.concat([...this.leftChecked])
      for (let i in this.leftData) {
        for (let j in this.leftChecked) {
          if (this.leftData[i].id === this.leftChecked[j].id) {
            this.$delete(this.leftData, i)
          }
        }
      }
      this.leftChecked = []
      this.$refs.minTreeOne.clearCheckAll()
    },
    renderFunc (h, option) {
      let iconClass = this.iconJudgeChoose(option.type)
      return <span>&nbsp; <i class={ iconClass }></i> &nbsp; { option.label }</span>
    },
    transferHandleChange (value, direction, movedKeys) {
      console.log(value)
    },
    openRelation () {
      // let newFields = []
      this.$set(this.formModel, 'fields', [...this.rightData])
      // this.formModel['fields'] = this.formModel['fields'] ? this.formModel['fields'] : []
      this.formModel['relation'] = this.formModel['relation'] ? this.formModel['relation'] : {}
      // for (let i of this.formModel['fields']) {
      //   for (let j of this.mozhu) {
      //     if (j.id === i.id) {
      //       newFields.push(j)
      //     }
      //   }
      // }
      this.needCreatedRelation = {
        id: this.formModel['id'],
        relation: this.formModel['relation'],
        subFields: this.formModel['fields']
      }
      this.relationDialogVisible = true
    },
    getRealationData (data, id) {
      this.formModel['relation'] = Object.assign({}, data)
      this.relationDialogVisible = false
    },
    openCoordinate () {
      this.$set(this.formModel, 'fields', [...this.rightData])
      this.needCreatedCoordinate = {
        coordinate: this.formModel['coordinate'],
        subFields: this.formModel['fields']
      }
      this.coordinateDialogVisible = true
    },
    getCoordinateData (data, modelData) {
      this.formModel['coordinate'] = Object.assign({}, data)
      // this.$set(this.formModel, 'fields', [...modelData])
      this.coordinateDialogVisible = false
    },
    openPreview () {
      console.log(this.rightData)
      this.previewFishData = {}
      this.previewFormModel = Object.assign({}, this.formModel)
      this.$set(this.previewFormModel, 'fields', [...this.rightData])
      this.previewDialogVisible = true
    },
    editAddBack () {
      console.log(this.formModel)
      console.log(this.cardArr)
      this.fewStepsTF = true
    },
    editAddForm () {
      this.$refs['formModel'].validate(async valid => {
        if (valid) {
          let idArr = []
          for (let i of this.rightData) {
            idArr.push({id: i.id})
          }
          this.$set(this.formModel, 'fields', idArr)
          if (this.checkUpData()) {
            let e = ''
            if (this.editOrAdd) {
              e = await editFormPut(this.formModel)
              // this.cardArr[this.cardIndex] = this.formModel
            } else {
              e = await addFormPost(this.formModel)
              // this.cardArr.push(this.formModel)
            }
            if (e) {
              this.fewStepsTF = true
              await this.show()
            }
          }
        } else {
          return false
        }
      })
    },
    checkUpData () {
      let pattern = /[a-zA-Z][a-zA-Z0-9]*/g
      for (let i of this.formModel.fields) {
        for (let j of this.mozhu) {
          if (j.id === i.id & j.type === 'CALCULATE') {
            let patternAfter = j.calculate.match(pattern) ? j.calculate.match(pattern) : []
            let notHaveLabelArr = []
            let notHaveArr = []
            let b = false
            for (let g of patternAfter) {
              b = false
              for (let z of this.formModel['fields']) {
                if (z.id === g) {
                  b = true
                  break
                }
              }
              if (!b) notHaveArr.push(g)
            }
            for (let s of this.mozhu) {
              for (let o of notHaveArr) {
                if (s.id === o) {
                  notHaveLabelArr.push(s.label)
                }
              }
            }
            if (notHaveArr.length) {
              this.$message({
                showClose: true,
                message: '计算中有字段模板中未添加 ' + notHaveLabelArr.toString(),
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
          flex-wrap: wrap;
          .formCardContentCard {
            margin-right: 4px;
            margin-left: 4px;
          }
        }
      }
    }
    .createFormContent {
      width: $full;
      height: $full;
      .createContentBottom {
        height: 30px;
        padding: 10px;
        padding-left: 15px;
        border-top: 1px solid $lightBorderColor;
      }
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
        // justify-content: space-around;
        justify-content: space-between;
        // .el-transfer {
        //   width: $full;
        //   display: flex;
        //   align-items: center;
        //   /deep/ .el-transfer-panel {
        //     flex-grow: 1;
        //     height: 450px;
        //   }
        //   /deep/ .el-transfer-panel__body {
        //     height: 450px;
        //   }
        //   /deep/ .el-transfer-panel__list.is-filterable {
        //     height: calc(450px - 140px);
        //   }
        // }
      }
      // .transfer-footer {
      //   margin-left: 20px;
      //   padding: 6px 5px;
      // }
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
