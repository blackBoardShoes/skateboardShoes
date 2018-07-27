<template>
  <div class="fieldAll">
    <div class="fieldContent">
      <div style="margin-bottom:5px;">
        <div style="width:100%; text-align: right">
          <el-button
            style="border:0px;border-radius:0px;height:46px;"
            @click="newCreateFish"
            type="primary">新增字段</el-button>
        </div>
        <el-input
          v-model="lookupData"
          clearable
          prefix-icon="el-icon-search"
          placeholder="字段名称"></el-input>
      </div>
      <div class="listContent">
        <div
          @click="editFish(item, index)"
          v-if="lookupChange(item)"
          class="listItem"
          v-for="(item, index) in listData" :key="index">
          <div class="listItemLeft">
            <!-- el-icon-ercp-xxxx -->
            <i :class="iconJudgeChoose(item.type)"></i>
            &nbsp;{{item.label}}
          </div>
          <div class="listItemRight">
            {{item.type}}
            <el-button
              @click.stop="deleteFishElement(item, index)"
              circle type="danger" size="mini" icon="el-icon-delete"></el-button>
            <el-button @click.stop="openRelation(item)" v-if="item.type === 'TABLE'"
              circle type="primary" size="mini" icon="el-icon-setting"></el-button>
          </div>
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
import relationFactory from '@/components/dynamicForm/relationFactory'

export default {
  components: {
    relationFactory
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
      lookupData: '',
      listData: this.value,
      needCreatedRelation: {},
      relationDialogVisible: false
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
    deleteFishElement (item, index) {
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
    editFish (row, index) {
      this.$emit('editFish', row, index)
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
    .listContent {
      width: $full;
      .listItem {
        padding: 10px;
        border-bottom: 0.5px dashed $lightBorderColor;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        .listItemLeft {
          font-size: 16px;
          color: $commonTetxColor;
        }
        .listItemRight {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 105px;
          font-size: 16px;
          color: $minorTextColor;
        }
      }
    }
  }
}
</style>
