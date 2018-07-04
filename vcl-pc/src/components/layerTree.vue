<template>
  <div class="treeAll">
    <div style="width:100%;display:flex;align-items:flex-start">
      <el-form ref="sizeForm" :model="sizeForm" label-width="0px" size="mini" style="width:100%">
        <el-form-item style="width:100%" prop="treeName" :rules="[
          { required: true, message: '请输入要创建的名字', trigger: 'change' },
          { pattern: /(^[^(\*)]+$)|(^[^(\*)]+(\*){2}\d+$)/, message: 'radio下**后作为实际值,并且是整数', trigger: 'change' }]">
          <el-input style="width:100%" clearable v-model='sizeForm.treeName' placeholder="请输入要创建的名字"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        slot="append"
        type="text"
        @click="append(false)">新建</el-button>
    </div>
    <el-tree
      :data="layerTreeData"
      node-key="value"
      draggable
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-button
      type="text"
      size="mini"
      @click="showTreeData">
      showTreeData
    </el-button>
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
  created () {
    this.treeId = this.treeId + this.layerTreeData.length
    console.log(this.layerTreeData, '拿到的数据')
  },
  methods: {
    // tree
    append (data) {
      let arr = []
      this.$refs['sizeForm'].validate(async (valid) => {
        if (valid) {
          arr = this.sizeForm.treeName.split('**')
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

</style>
