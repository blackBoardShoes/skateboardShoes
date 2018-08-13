<template>
  <div class="fieldAll">
    <div class="fieldContent">
      <div style="margin-bottom:5px;">
        <div style="width:100%; text-align: right;display:flex;align-items:flex-end;height:46px;justify-content: space-between">
          <el-button
            size="small"
            style="border:0px;border-radius:0px;"
            @click="newCreateFish"
            type="primary">新增字段</el-button>
          <div style="margin-right:18px">
            <el-button
              size="small"
              style="border:0px;border-radius:0px;"
              @click="newCreateFish"
              type="primary">筛选</el-button>
              <el-badge :value="badgeValue" class="item">
                <el-button
                  size="small"
                  style="border:0px;border-radius:0px;"
                  @click="saveAllFish"
                  icon="el-icon-tickets"
                  type="info">保存</el-button>
              </el-badge>
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
          <div
            @click="editFish(item, index)"
            v-if="lookupChange(item)"
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
              <el-tooltip class="item" effect="dark" :content="item.type" placement="left">
                <div class="listItemRightText">{{item.type}}</div>
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
  data () {
    return {
      checkedClass: null,
      lookupData: '',
      listData: this.value,
      needCreatedRelation: {},
      relationDialogVisible: false,
      badgeValue: '12'
    }
  },
  methods: {
    lookupChange (item) {
      return Object.values(item).toString().includes(this.lookupData)
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
          icon = 'ercp-icon-component--radio'
          break
        case 'CHECKBOX':
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
      this.$delete(this.listData, index)
    },
    openRelation (item) {
      this.needCreatedRelation = item
      this.relationDialogVisible = true
    },
    getRealationData (data, id) {
      for (let i of this.listData) {
        if (i.id === id) {
          this.$set(i, 'relation', data)
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
      // height: $full;
      .listContent {
        margin-bottom: $bottomH;
        width: $full;
        background: white;
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
            font-size: 16px;
            color: $commonTetxColor;
            .listItemLeftText {
              text-overflow: ellipsis;
              overflow: hidden;
              width: 130px;
            }
          }
          .listItemRight {
            .listItemRightText {
              text-overflow: ellipsis;
              overflow: hidden;
              width: 90px;
            }
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 110px;
            font-size: 16px;
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
