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
            <i :class="item.icon"></i>
            &nbsp;{{item.label}}
          </div>
          <div class="listItemRight">
            {{item.type}}
            <el-button @click="openRelation(item)" v-if="item.type === 'TABLE'"
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
    openRelation (item) {
      this.needCreatedRelation = item
      this.relationDialogVisible = true
    },
    getRealationData (data, id) {
      for (let i of this.listData) {
        if (i.id === id) {
          Object.assign(i.relation, data)
        }
      }
    },
    newCreateFish () {
      this.$emit('newCreateFish', true)
    },
    async createFish (mozhuId, formModel, relation, newFields, idGroup) {
      console.log(mozhuId, formModel, relation, newFields, idGroup)
      // formModel['calculate'] = formModel['createCalculate'] ? formModel['createCalculate'] : ''
      // formModel['children'] = [...formModel['tree']].length ? [...formModel['tree']] : []
      // formModel['values'] = [...formModel['layerTree']].length ? [...formModel['layerTree']] : []
      // let what = this.conversion(formModel)
      // if ('edit' in this.fishEdit) {
      //   this.repositoryData.splice(this.fishEdit.index, 1, what)
      // } else {
      //   this.repositoryData.push(what)
      // }
      // this.$emit('createFish', what)
      // this.dialogVisible = false
      // console.timeEnd('createFish --- ')
    },
    editFish (row, index) {
      // if (row['type'] === 'TABLE') {
      //   this.fishData['type'] = 'CREATETABLE'
      // } else if (row['type'] === 'CALCULATE') {
      //   this.fishData['type'] = 'CREATECALCULATE'
      //   this.fishData['createCalculate'] = this.fishData['calculate']
      // }
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
          font-size: 16px;
          color: $minorTextColor;
        }
      }
    }
  }
}
</style>
