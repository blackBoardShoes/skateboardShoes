<template>
  <div class="treeAll">
    <div class="treeTop">
      <div style="margin-left: 25px;display:flex;align-items:center">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"></el-checkbox>&nbsp;
        {{title}}
      </div>
      <div style="margin-right: 25px;font-weight: 400">
        {{minTreeData.length}}
      </div>
    </div>
    <br>
    <div style="width: 90.2%; display:flex">
      <el-input
        clearable
        placeholder="输入关键字进行过滤"
        v-model.trim="filterText">
      </el-input>
        <el-popover
        placement="bottom-start"
        width="300"
        trigger="click">
        <el-button
          slot="reference"
          >筛选</el-button>
        <el-checkbox-group v-model="checkList">
          <el-checkbox style="width:100px;margin-left: 20px;margin-right: 20px;"
            :label="x" v-for="(x, i) in checkListData" :key="i">{{oneToOneText(x)}}</el-checkbox>
        </el-checkbox-group>
      </el-popover>
    </div>
    <br>
    <div class="treeContent">
      <el-tree
        check-on-click-node
        :props="defaultProps"
        v-bind="$props"
        node-key="id"
        :data="minTreeData"
        :allow-drop="allowDrop"
        ref="minTreeData"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @check-change="handleCheckChange">
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }">
          <div>
            &nbsp;&nbsp;<i :class="iconJudgeChoose(data.type)"></i>
            &nbsp;&nbsp;{{ node.label }}
          </div>
        </span>
      </el-tree>
    </div>
    <div style="width: 100%;">
      <slot name="bottom">
        <div class="bottomDiv"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mark: {
      type: String,
      default () {
        return ''
      }
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    draggable: {
      type: Boolean,
      default () {
        return false
      }
    },
    showCheckbox: {
      type: Boolean,
      default () {
        return false
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      isIndeterminate: false,
      checkAll: false,
      filterText: '',
      minTreeData: this.value,
      defaultProps: {
        children: 'childrens',
        label: 'label'
      },
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
        {label: '浮点类型输入框', value: 'DOUBLE'}
      ],
      checkList: ['INT', 'DOUBLE', 'TEXTAREA', 'RADIO', 'CHECKBOX', 'SELECT', 'SELECTMUTIPLE', 'DATE', 'DATETIME', 'CASCADER', 'INPUT', 'TABLE', 'CALCULATE'],
      checkListData: ['INT', 'DOUBLE', 'TEXTAREA', 'RADIO', 'CHECKBOX', 'SELECT', 'SELECTMUTIPLE', 'DATE', 'DATETIME', 'CASCADER', 'INPUT', 'TABLE', 'CALCULATE']
    }
  },
  watch: {
    filterText (val) {
      this.$refs.minTreeData.filter(val)
    },
    checkList (val) {
      let arr = []
      if (Array.isArray(val)) {
        for (let i of this.value) {
          if (val.includes(i.type)) {
            arr.push(i)
          }
        }
      }
      this.minTreeData = arr
    },
    value: {
      // deep: true,
      handler (value) {
        this.minTreeData = value
      }
    }
    // minTreeData: {
    //   handler (val, oldVal) {
    //     this.$emit('input', this.minTreeData)
    //   },
    //   deep: true
    // }
  },
  created () {
    // console.log(this.minTreeData, 'minTreeData,-=-=-=-=-=-=')
  },
  methods: {
    oneToOneText (type) {
      for (let i of this.oneToOne) {
        if (type === i.value) return i.label
      }
    },
    handleCheckAllChange (val) {
      let arr = []
      for (let i of this.minTreeData) {
        if (this.filterNode(this.filterText, i)) {
          arr.push(i)
        }
      }
      // console.log(arr)
      this.$refs.minTreeData.setCheckedNodes(val ? arr : [])
      this.isIndeterminate = false
    },
    filterNode (value, data) {
      // console.log(value, data)
      if (!value) return true
      return Object.values(data).toString().toLowerCase().indexOf(value.toLowerCase()) !== -1
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
    allowDrop (draggingNode, dropNode, type) {
      return type === 'next' | type === 'prev'
    },
    handleCheckChange (data, checked, indeterminate) {
      let getCheckedNodes = this.$refs.minTreeData.getCheckedNodes()
      let getCheckedKeys = this.$refs.minTreeData.getCheckedKeys()
      let checkedCount = getCheckedNodes.length
      this.checkAll = checkedCount === this.minTreeData.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.minTreeData.length
      this.$emit('handleCheckChange', getCheckedNodes, getCheckedKeys, this.mark)
    },
    clearCheckAll () {
      this.checkAll = false
      this.isIndeterminate = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';

.treeAll {
  // border: $lightBorderColor solid 1px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .treeTop {
    background: $groupColor;
    width:  100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
  }
  .treeContent {
    border-top: 1px solid $lightBorderColor;
    height: 350px;
    overflow: auto;
    background:white;
    width:100%;
  }
  .custom-tree-node {
    width:  90%;
  }
  /deep/ .el-tree-node__content {
    height: 35px;
  }
}

</style>
