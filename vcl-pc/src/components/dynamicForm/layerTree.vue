<template>
  <div class="treeAll">
    <div class="treeContent">
      <el-form ref="sizeForm" :model="sizeForm" label-width="0px" size="mini" style="flex-grow:1">
        <el-form-item style="width:100%" prop="treeName" :rules="[
          { required: true, message: '请输入要创建的名字', trigger: 'change' },
          { pattern: /^[^\n]*\&\&[^\n]*$|^[^\*\&]+$|(^[^\*]+\*\*\d+$)/, message: 'radio下**后作为实际值,并且是整数', trigger: 'change' }]">
          <el-input style="width:100%" clearable v-model.trim='sizeForm.treeName' placeholder="请输入要创建的名字"></el-input>
          <!-- /(^[^(\*)]+$)|(^[^(\*)]+(\*){2}\d+$)/     /^\*{2}\d+$|^[^\*]*$/-->
        </el-form-item>
      </el-form>
      <el-button
        style="flex-grow:0.5"
        slot="append"
        type="text"
        @click="append(false)">新建</el-button>
    </div>
    <el-tree
      @node-click="nodeClick"
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
    this.valueCalculation()
  },
  methods: {
    // tree
    append (data) {
      this.$refs['sizeForm'].validate(async (valid) => {
        if (valid) {
          // 没有/很少**0&&偶尔(1-2次/周)**1&&经常(1-2次/天)**4&&频繁(2次以上/天)**8
          let nimbleArr = []
          nimbleArr = this.sizeForm.treeName.split('&&')
          for (let z of nimbleArr) {
            console.log(z)
            let arr = []
            arr = z.split('**')
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
            const newChild = { value: arr.length === 1 ? this.treeId++ : parseInt(arr[1]), label: z !== '' ? z : '空' }
            console.log(newChild)
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
            // console.log(this.layerTreeData)
          }
        } else {
          console.log('error submit!!')
          return false
        }
        this.$emit('input', this.layerTreeData)
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
      this.$emit('input', this.layerTreeData)
    },
    valueCalculation () {
      let z = []
      let a = _ => {
        if ('children' in _) {
          a(_.children)
        }
        for (let i of _) {
          z.push(i.value)
        }
      }
      a(this.layerTreeData)
      let mz = ''
      if (z.length) {
        mz = Math.max(...z)
      } else {
        mz = 99
      }
      console.log(mz)
      if (Array.isArray(this.layerTreeData)) {
        this.treeId = mz + 1
      }
    },
    showTreeData () {
      console.log(this.layerTreeData)
    },
    nodeClick (a, node, c) {
      console.log(node, c)
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
  /deep/ .el-form-item__content {
    width: 100% !important;
  }
}

</style>
