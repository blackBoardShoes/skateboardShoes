<template>
  <div class="all">
    <div class="content">
      <div style="text-align:right;width:100%">
        <el-button
          type="text"
          @click="appendRow">新建</el-button>
      </div>
      <div class="contentCascader"
        v-for="(items, index) in formatBefore" :key="index">
        <el-cascader
          style="width:100%"
          size="mini"
          expand-trigger="hover"
          v-model="formatBefore[index]"
          :options="options">
        </el-cascader>
        <el-button
          @click="deleteRow(items, index)"
          type="danger"
          plain size="mini">
          删除
        </el-button>
      </div>
      <br>
      <div style="text-align:center;width:100%">
        <el-button
        @click="sendData">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    needCreatedCoordinate: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      subFields: 'subFields' in this.needCreatedCoordinate ? this.needCreatedCoordinate['subFields'] : [],
      coordinate: 'coordinate' in this.needCreatedCoordinate ? this.needCreatedCoordinate['coordinate'] : {},
      id: 'id' in this.needCreatedCoordinate ? this.needCreatedCoordinate['id'] : '',
      options: [],
      formatBefore: [],
      formatAfter: {}
    }
  },
  created () {
    console.log(this.needCreatedCoordinate, '拿到的数据')
    this.init()
  },
  methods: {
    init () {
      let w = [32, 45, 60]
      for (let i of this.subFields) {
        this.options.push(
          {value: i.id, label: i.label, children: []}
        )
      }
      for (let j of this.options) {
        if (j.children) {
          for (let z of w) {
            j.children.push(
              {value: z, label: z}
            )
          }
        }
      }
      for (let e in this.coordinate) {
        this.formatBefore.push(
          [e, this.coordinate[e]]
        )
      }
    },
    appendRow () {
      this.formatBefore.push([])
      console.log('what')
    },
    deleteRow (items, index) {
      this.formatBefore.splice(index, 1)
    },
    sendData () {
      this.formatAfter = {}
      for (let i of this.formatBefore) {
        this.formatAfter[i[0]] = i[1]
      }
      console.log(this.formatAfter)
      // console.log(this.subFields)
      // newFields = newFields.concat([...this.subFields])
      // newFields = [...new Set(newFields)]
      // console.log(newFields)
      // console.log(this.formatAfter)
      this.$emit('getCoordinateData', this.formatAfter)
    }
  }
}
</script>

<style lang="scss" scoped>
.all {
  .content {
    width: 100%;
    .contentCascader {
      display: flex;
      align-items: flex-start;
      width: 100%;
      margin-top:5px;
      margin-bottom:3px；
    }
  }
}
</style>
