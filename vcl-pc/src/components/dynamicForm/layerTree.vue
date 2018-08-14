<template>
  <div class="treeAll">
    <div class="treeContent">
      <el-form ref="sizeForm" :model="sizeForm" label-width="0px" size="mini" style="flex-grow:1">
        <el-form-item style="width:100%" prop="treeName" :rules="[
          { required: true, message: '请输入要创建的名字', trigger: 'change' },
          { pattern: /(^[^(\*)]+$)|(^[^(\*)]+(\*){2}\d+$)/, message: 'radio下**后作为实际值,并且是整数', trigger: 'change' }]">
          <el-input style="width:100%" clearable v-model='sizeForm.treeName' placeholder="请输入要创建的名字"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        style="flex-grow:0.5"
        slot="append"
        type="text"
        @click="append(false)">新建</el-button>
    </div>
    <el-tree
      :data="layerTreeData"
      :allow-drop="allowDrop"
      node-key="value"
      draggable
      default-expand-all
      :expand-on-click-node="false">
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }">
        <div style="display:flex;">
          <el-tooltip class="item" effect="dark" :content="node.label" placement="bottom-start">
            <span style="flex-grow:0.5;width:85px;text-overflow:ellipsis;overflow:hidden; ">{{ node.label }}</span>
          </el-tooltip>
          <span style="flex-grow:0.9;margin-left:8px;">
            <el-button
              style="color:#FF455B"
              type="text"
              size="mini"
              @click="_ => remove(node, data)">
              删除
            </el-button>
          </span>
        </div>
      </span>
    </el-tree>
    <!-- <el-button
      type="text"
      size="mini"
      @click="showTreeData">
      showTreeData
    </el-button> -->
  </div>
</template>

<script>
export default {
  // props: {
  //   treeData: {
  //     type: Array
  //   }
  // },
  props: {
    value: {
      type: Array
    }
  },
  data () {
    return {
      layerTreeData: this.value,
      treeId: 100,
      sizeForm: {
        treeName: ''
      }
    }
  },
  watch: {
    value () {
      this.layerTreeData = [...this.value]
    }
  },
  created () {
    console.log(this.layerTreeData, '拿到的数据')
    this.treeId = this.treeId + this.layerTreeData.length
  },
  methods: {
    // tree
    append (data) {
      this.$refs['sizeForm'].validate(async (valid) => {
        if (valid) {
          let arr = []
          arr = this.sizeForm.treeName.split('**')
          for (let i of this.layerTreeData) {
            if (i.value === parseInt(arr[1])) {
              this.$message({
                showClose: true,
                message: '不能有重复值',
                type: 'warning'
              })
              return
            }
          }
          const newChild = { value: arr.length === 1 ? this.treeId++ : parseInt(arr[1]), label: this.sizeForm.treeName ? this.sizeForm.treeName : '空' }
          if (data) {
            if (!data.children) {
              await this.$set(data, 'children', [])
            }
            data.children.push(newChild)
          } else {
            if (Array.isArray(this.layerTreeData)) {
              this.layerTreeData.push(newChild)
            } else {
              console.log('不是数组')
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    allowDrop (draggingNode, dropNode, type) {
      return type === 'next' | type === 'prev'
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.value === data.value)
      children.splice(index, 1)
    },
    showTreeData () {
      console.log(this.layerTreeData)
    }
  }
}
</script>

<style lang="scss" scoped>
.treeAll {
  .treeContent {
    width:  100%;
    display:  flex;
    align-items:  flex-start;
  }
  .custom-tree-node {
    width:  90%;
  }
}

</style>
