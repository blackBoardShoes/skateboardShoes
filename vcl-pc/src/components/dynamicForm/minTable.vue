<template>
  <el-table
    class="minTable"
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
    <el-table-column type="expand" v-if="expand" class="demo-table-expand">
      <template slot-scope="props">
        <el-form label-position="left" inline>
          <el-form-item :label="z" v-for="(i, z) in (props.row.records ? props.row.records : [])" :key="z">
            <span>{{ i }}</span>
          </el-form-item>
        </el-form>
      </template>
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
      :fixed="item.fixed"
      :width="item.width">
      <template slot-scope="scope">
        <el-button
          v-if="item.option && x.hidden ? filterBtn(scope.row, x, scope.column, scope.row[item.prop], scope.$index) : true"
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
    expand: {
      type: Boolean,
      default () {
        return false
      }
    },
    height: {
      type: null,
      default () {
        return '660'
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
        return _ => {}
      }
    },
    filterBtn: {
      type: Function,
      default () {
        return _ => {}
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

<style lang="scss">
.minTable {
  /deep/ .demo-table-expand {
    font-size: 0;
  }
  /deep/ .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  /deep/ .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
