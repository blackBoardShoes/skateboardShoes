<template>
  <div class="treeAll">
    <div class="treeContent">
      <el-form ref="sizeForm" :model="sizeForm" label-width="0px" size="mini" style="flex-grow:1">
        <el-form-item style="width:100%" prop="treeName" :rules="[{ required: true, message: '请输入要创建的名字', trigger: 'change' }]">
          <el-input style="width:100%" clearable v-model.trim='sizeForm.treeName' placeholder="请输入要创建的名字"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        style="flex-grow:0.5"
        slot="append"
        type="text"
        @click="append(false)">新建</el-button>
    </div>
    <el-tree
      :data="treeData"
      node-key="value"
      draggable
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div style="display:flex;">
          <el-tooltip class="item" effect="dark" :content="node.label" placement="bottom-start">
            <span style="flex-grow:0.5;width:85px;text-overflow:ellipsis;overflow:hidden; ">{{ node.label }}</span>
          </el-tooltip>
          <span style="flex-grow:0.9;margin-left:8px;">
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => append(data)">
                新增
              </el-button>
              <el-button
                style="color:#FF455B"
                type="text"
                size="mini"
                @click="() => remove(node, data)">
                删除
              </el-button>
            </span>
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
  watch: {
    value () {
      this.treeData = [...this.value]
    }
  },
  data () {
    return {
      treeData: this.value,
      treeId: 100,
      sizeForm: {
        treeName: ''
      }
    }
  },
  created () {
    this.valueCalculation()
    console.log(this.treeData, '拿到的数据, =-=-=-=-=-')
  },
  methods: {
    // tree
    append (data) {
      this.$refs['sizeForm'].validate(async (valid) => {
        if (valid) {
          let nimbleArr = []
          nimbleArr = this.sizeForm.treeName.split('&&')
          for (let z of nimbleArr) {
            const newChild = { value: this.treeId++, label: z !== '' ? z : '空' }
            console.log(newChild)
            if (data) {
              if (!data.children) {
                await this.$set(data, 'children', [])
              }
              data.children.push(newChild)
            } else {
              if (Array.isArray(this.treeData)) {
                this.treeData.push(newChild)
              } else {
                console.log('不是数组')
              }
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
        this.$emit('input', this.treeData)
      })
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.value === data.value)
      children.splice(index, 1)
      this.valueCalculation()
      this.$emit('input', this.treeData)
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
      a(this.treeData)
      let mz = ''
      if (z.length) {
        mz = Math.max(...z)
      } else {
        mz = 99
      }
      console.log(mz)
      if (Array.isArray(this.treeData)) {
        this.treeId = mz + 1
      }
    },
    showTreeData () {
      console.log(this.treeData)
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
