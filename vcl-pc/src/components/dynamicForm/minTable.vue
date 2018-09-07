<template>
  <el-table
    :data="tableData"
    :height="height"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      v-if="hasIndex"
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      show-overflow-tooltip
      align="center"
      v-for="(item, index) in mozhu"
      :key="index + Math.random()"
      :prop="item.prop"
      :label="item.label"
      :sortable="item.sortable"
      :filters="item.filters"
      :filter-method="filterHandler"
      filter-placement="bottom-end"
      :width="item.width">
      <template slot-scope="scope">
        <el-button
          v-if="item.option"
          v-for="(x, key) in item.contain"
          :key="key"
          :type="x.type ? x.type : 'text'"
          :size="x.size ? x.size : 'mini'"
          :style="x.style"
          @click="operateClick(scope.row, scope.$index, x)">{{x.label}}</el-button>
          <div v-if="!item.option">
            {{
              formatter(scope.row, scope.column, scope.row[item.prop], scope.$index)
            }}
          </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    height: {
      type: null,
      default () {
        return 325
      }
    },
    hasIndex: {
      type: Boolean,
      default () {
        return false
      }
    },
    mozhu: {
      type: Array,
      default () {
        return []
      }
    },
    filterHandler: {
      type: Function,
      default () {
        return () => {}
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    formatter (row, column, cellValue, index) {
      if (!row[column.property]) {
        return '/'
      } else {
        return row[column.property]
      }
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    },
    operateClick (row, index, x) {
      this.$emit('operateClick', row, index, x)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
