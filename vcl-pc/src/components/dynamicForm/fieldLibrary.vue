<template>
  <div class="fieldAll">
    <div class="fieldContent">
      <div style="margin-bottom:5px;height: 90px;">
        <div style="width:100%; text-align: right;display:flex;align-items:flex-end;height:46px;justify-content: space-between">
          <el-button
            size="small"
            @click="newCreateFish"
            type="primary">新增字段</el-button>
          <div>
            <el-popover
              placement="bottom-start"
              width="300"
              trigger="click">
              <el-button
                size="small"
                slot="reference"
                >筛选</el-button>
              <el-checkbox-group v-model="checkList">
                <el-checkbox style="width:100px;margin: 10px 20px;"
                  :label="x" v-for="(x, i) in checkListData" :key="i">{{oneToOneText(x)}}</el-checkbox>
              </el-checkbox-group>
              <div style="width:100%;text-align:right">
                <el-button @click="clearCheckList" size="small">清空</el-button>
                <el-button @click="resetCheckList" type="primary" plain size="small" style="margin: 10px 20px;">重置</el-button>
              </div>
            </el-popover>
            <!-- <el-badge :value="badgeValue" class="item">
              <el-button
                size="small"
                @click="saveAllFish"
                type="primary">保存</el-button>
            </el-badge> -->
          </div>
        </div>
        <el-input
          v-model="lookupData"
          clearable
          prefix-icon="el-icon-search"
          placeholder="字段名称"></el-input>
      </div>
      <div class="listContentBottom">
        <div class="listContent">
          <!-- , listItemBg: !item.isFinished -->
          <div
            @click="editFish(item, index)"
            v-if="lookupChange(item) & filterItem(item)"
            :class="{listItem: true, checkedClass: checkedClass === index}"
            v-for="(item, index) in listData" :key="index">
            <div class="listItemLeft">
              <!-- el-icon-ercp-xxxx -->
              <el-tooltip class="item" effect="dark" :content="item.label" placement="left">
                <i :class="iconJudgeChoose(item.type)"></i>
              </el-tooltip>
              <div class="listItemLeftText">&nbsp;{{item.label}}</div>
            </div>
            <div class="listItemRight">
              <el-tooltip class="item" effect="dark" :content="oneToOneText(item.type)" placement="left">
                <div class="listItemRightText">{{oneToOneText(item.type)}}</div>
              </el-tooltip>
              <el-button @click.stop="openRelation(item)" v-if="item.type === 'TABLE'"
                circle type="primary" size="mini" icon="el-icon-setting"></el-button>
              <el-button
                @click.stop="deleteFish(item, index)"
                circle type="danger" size="mini" icon="el-icon-delete"></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="关联关系"
      append-to-body
      modal-append-to-body
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
import sxRelationFactory from '@/components/dynamicForm/relationFactory'

export default {
  components: {
    sxRelationFactory
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    value () {
      this.listData = this.value
    }
  },
  data () {
    return {
      checkedClass: null,
      lookupData: '',
      listData: this.value,
      needCreatedRelation: {},
      relationDialogVisible: false,
      oneToOne: [
        {label: '选择器', value: 'SELECT'},
        {label: '文本标签', value: 'TEXTAREA'},
        {label: '多选选择器', value: 'SELECTMUTIPLE'},
        {label: '日期时间选择器', value: 'DATETIME'},
        {label: '计算', value: 'CALCULATE'},
        {label: '单选框', value: 'RADIO'},
        {label: '表格', value: 'TABLE'},
        {label: '日期选择器', value: 'DATE'},
        {label: '整数类型输入框', value: 'INT'},
        {label: '多选框', value: 'CHECKBOX'},
        {label: '输入框', value: 'INPUT'},
        {label: '级联选择器', value: 'CASCADER'},
        {label: '文本单选框', value: 'RADIOTEXT'},
        {label: '文本多选框', value: 'CHECKBOXTEXT'},
        {label: '浮点类型输入框', value: 'DOUBLE'}
      ],
      defaultCheckList: ['INT', 'DOUBLE', 'TEXTAREA', 'RADIO', 'RADIOTEXT', 'CHECKBOX', 'CHECKBOXTEXT', 'SELECT', 'SELECTMUTIPLE', 'DATE', 'DATETIME', 'CASCADER', 'INPUT', 'TABLE', 'CALCULATE'],
      checkList: ['INT', 'DOUBLE', 'TEXTAREA', 'RADIO', 'RADIOTEXT', 'CHECKBOX', 'CHECKBOXTEXT', 'SELECT', 'SELECTMUTIPLE', 'DATE', 'DATETIME', 'CASCADER', 'INPUT', 'TABLE', 'CALCULATE'],
      checkListData: ['INT', 'DOUBLE', 'TEXTAREA', 'RADIO', 'RADIOTEXT', 'CHECKBOX', 'CHECKBOXTEXT', 'SELECT', 'SELECTMUTIPLE', 'DATE', 'DATETIME', 'CASCADER', 'INPUT', 'TABLE', 'CALCULATE']
    }
  },
  computed: {
    badgeValue () {
      let z = 0
      for (let i of this.listData) {
        if (!i.isFinished) {
          z++
        }
      }
      return z
    }
  },
  methods: {
    clearCheckList () {
      this.checkList = []
    },
    resetCheckList () {
      this.checkList = this.defaultCheckList
    },
    lookupChange (item) {
      // let z = ''
      // for (let i of item['subFields']) {
      //   z = z + Object.values(i).toString()
      // }
      // console.log(z)
      // return (z + Object.values(item).toString()).includes(this.lookupData)
      return Object.values(item).toString().includes(this.lookupData)
    },
    filterItem (item) {
      return this.checkList.includes(item.type)
    },
    oneToOneText (type) {
      for (let i of this.oneToOne) {
        if (type === i.value) return i.label
      }
    },
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
    deleteFish (item, index) {
      this.$emit('deleteFish', item, index)
      // this.$delete(this.listData, index)
    },
    openRelation (item) {
      this.needCreatedRelation = item
      this.relationDialogVisible = true
    },
    getRealationData (data, id) {
      for (let i of this.listData) {
        if (i.id === id) {
          this.$set(i, 'relation', data)
          this.$emit('getRealationData', i)
        }
      }
      this.relationDialogVisible = false
    },
    newCreateFish () {
      this.$emit('newCreateFish', true)
    },
    resetData () {
      this.checkedClass = null
    },
    editFish (row, index) {
      this.checkedClass = index
      this.$emit('editFish', row, index)
    },
    saveAllFish () {
      this.$emit('saveAllFish', this.listData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
// $minorTextColor: #9DA0A3;
// $placeHolderColor: #C0C4CC;
// $lightTextColor: #F3F3F3;
$full: 100%;
$bottomH: 200px;
.fieldAll {
  width: $full;
  height: $full;
  .fieldContent {
    width: $full;
    height: $full;
    background: $groupColor;
    /deep/ .el-input .el-input__inner{
      border-radius: 0px;
      border: 0px;
    }
    .listContentBottom {
      overflow: auto;
      width: $full;
      height: calc(100% - 100px);
      .listContent {
        margin-bottom: $bottomH;
        width: $full;
        background: white;
        .listItemBg {
          background: $mainBackgroundColor !important;
        }
        .listItem {
          padding: 10px;
          border-bottom: 0.5px dashed $lightBorderColor;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          .listItemLeft {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: $commonTetxColor;
            .listItemLeftText {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 110px;
            }
          }
          .listItemRight {
            .listItemRightText {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 70px;
            }
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-grow: 1;
            font-size: 14px;
            color: $minorTextColor;
          }
        }
        .checkedClass {
          background: $linearGradient;
        }
      }
    }
  }
}
</style>
