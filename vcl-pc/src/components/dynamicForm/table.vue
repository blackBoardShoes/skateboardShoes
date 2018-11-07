<template>
  <div class="tableAll">
    <el-table
      style="width: 100%;"
      show-overflow-tooltip
      :data="tableValues">
      <!-- <el-table-column
        align="center"
        type="index"
        min-width="50">
      </el-table-column> -->
      <el-table-column
        min-width="110"
        show-overflow-tooltip
        align="center"
        v-for="(item, index) in subFields"
        :key="index"
        :prop="item.id"
        :formatter="formatter"
        :label="item.label">
        <!-- <template slot-scope="scope">
          {{scope.row[item.id]}}
        </template> -->
      </el-table-column>
      <el-table-column
        v-if="showOperation"
        align="center"
        fixed="right"
        label="操作"
        width="110">
        <template slot-scope="scope">
          <div style="font-size:12px;color:#117FD1;display:inline-block;cursor:pointer;margin-right:5px"
          @click="editClick(scope.row, scope.$index, subFields)">
          {{disabled ? '查看' : '编辑'}}
          </div>
          <el-button
          v-if="!disabled"
            @click="deleteClick(scope.row, scope.$index, subFields)" size="small"
            style="border: none;background:transparent;padding:0; color: #FF455B">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin-top:15px;" size="small" @click="addRow" v-if="showBtn">新增</el-button>
    <!-- <el-button style="margin-top:15px;" size="small" @click="getData">getData</el-button> -->
    <el-dialog
      width="80%"
      append-to-body
      modal-append-to-body
      :visible.sync="dialogVisible">
      <!-- :mozhu="mozhu" -->
      <sx-min-form :disabled="disabled" submitTF v-if="dialogVisible" :mozhu="mozhu"  v-model="formModel" @consoleData="consoleData"></sx-min-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    tableData: {
      type: Object,
      default () {
        return {
          values: [],
          subFields: [],
          relation: {}
        }
      }
    },
    showOperation: {
      type: Boolean,
      default () {
        return true
      }
    },
    showBtn: {
      type: Boolean,
      default () {
        return true
      }
    },
    disabled: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler () {
        this.subFields = [...this.tableData['subFields']]
      }
    },
    value: {
      deep: true,
      handler () {
        this.tableValues = [...this.value]
        // console.log(this.value)
      }
    }
    // tableData (value) {
    //   this.subFields = [...this.tableData['subFields']]
    //   this.tableValues = [...this.tableData['values']]
    // }
  },
  created () {
    console.time('--table init--')
    console.log(this.tableData, this.value, 'table J S')
    this.init()
  },
  mounted () {
    console.timeEnd('--table init--')
  },
  data () {
    return {
      subFields: 'subFields' in this.tableData ? [...this.tableData['subFields']] : [],
      tableValues: this.value ? [...this.value] : [],
      dialogVisible: false,
      mozhu: {
        id: '',
        fields: [],
        relation: {},
        compute: {}
      },
      fields: [],
      // 传from 数据
      formModel: {},
      // table需要的数据
      formLabel: {},
      addEdit: {index: 0, add: 0}
    }
  },
  methods: {
    init () {
      for (let i of this.subFields) {
        this.formLabel[i.id] = { type: i.type, values: i.values, children: i.children ? i.children : [] }
      }
    },
    formatter (row, column, cellValue, index) {
      // console.log(row[column.property])
      if (!row[column.property]) {
        return '/'
      } else {
        let z = ''
        if (this.formLabel[column.property]) {
          switch (this.formLabel[column.property]['type']) {
            case 'TABLE':
              console.log(this.formLabel[column.property])
              // for (let i of row[column.property]) {
              //   for (let j in i) {
              //     z = z + this.formLabel[column.property][j]
              //   }
              //   z = z + ' & '
              // }
              z = '表格数据过于复杂,请点编辑或查看进行查看'
              break
            case 'CHECKBOX':
              if (Array.isArray(this.formLabel[column.property]['values'])) {
                for (let i of this.formLabel[column.property]['values']) {
                  // console.log(i.value, row[column.property], '-----------------------checkBox')
                  for (let j in row[column.property]) {
                    console.log(row[column.property][j])
                    if (row[column.property][j] === i.value) {
                      z = z + i.label + '/'
                    }
                  }
                }
              }
              break
            case 'CHECKBOXTEXT':
              for (let i in row[column.property]) {
                if (row[column.property][i]) {
                  if ((row[column.property].length - 1) === parseInt(i)) {
                    z = z + row[column.property][i]
                  } else {
                    z = z + row[column.property][i] + '/'
                  }
                }
              }
              break
            case 'CASCADER':
              var forFn = arr => {
                for (let i of row[column.property]) {
                  for (let j in arr) {
                    if (arr[j].value === i) {
                      if ('children' in arr[j]) {
                        z = z + arr[j].label + '-'
                        forFn(arr[j].children)
                      } else {
                        z = z + arr[j].label
                      }
                    }
                  }
                }
              }
              forFn(this.formLabel[column.property]['children'])
              break
            case 'RADIO':
            case 'SELECT':
              if (Array.isArray(this.formLabel[column.property]['values'])) {
                for (let i of this.formLabel[column.property]['values']) {
                  if (row[column.property] === i.value) {
                    z = i.label
                  }
                }
              }
              break
            case 'DATE':
              let date = new Date(row[column.property])
              if (row[column.property]) z = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()).toString()
              else z = '否'
              break
            case 'DATETIME':
              let dateTime = new Date(row[column.property])
              if (row[column.property]) {
                z = (dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate() + ' ' + dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds()).toString()
              } else z = '否'
              break
            case 'SWITCH':
              // console.log(row[column.property], '==========')
              if (row[column.property]) {
                z = '是'
              } else z = '否'
              break
            default :
              z = row[column.property]
              break
          }
          // for (let i of this.formLabel[column.property]) {
          //   if (row[column.property] === i.value) {
          //     z = z + i.label
          //   }
          // }
          return z
        } else {
          return row[column.property]
        }
      }
    },
    consoleData (mozhuId, formModel, relation, compute, newFields, idGroup) {
      if (this.addEdit.add) {
        this.tableValues.push(formModel)
      } else {
        this.$set(this.tableValues, this.addEdit.index, formModel)
      }
      this.$emit('input', this.tableValues)
      this.dialogVisible = false
    },
    deleteClick (row, index, fieldsData) {
      // this.fields = fieldsData
      // this.formModel = {}
      // this.dialogVisible = true
      this.tableValues.splice(index, 1)
      this.$emit('input', this.tableValues)
      // this.tableData['values'].splice(index, 1)
    },
    editClick (row, index, fieldsData) {
      console.log(row, index, fieldsData)
      this.addEdit.add = 0
      this.addEdit.index = index
      // console.log(row, index, fieldsData)
      // this.fields = fieldsData
      this.mozhu['relation'] = this.tableData['relation']
      this.mozhu['fields'] = fieldsData
      for (let i in row) {
        if (this.formLabel[i]) {
          if (this.formLabel[i].type === 'DATE' | this.formLabel[i].type === 'DATETIME') {
            row[i] = new Date(row[i])
          }
        }
      }
      this.formModel = row
      this.dialogVisible = true
    },
    addRow () {
      this.addEdit.add = 1
      // this.fields = this.tableData['subFields']
      this.mozhu['relation'] = this.tableData['relation']
      this.mozhu['fields'] = this.tableData['subFields']
      this.formModel = {}
      this.dialogVisible = true
    },
    getData () {
      // console.log(this.tableValues)
      this.$emit('getData', this.tableValues)
    }
  }
}
</script>

<style lang="scss" scoped>
.tableAll {
  width: 520px;
  // max-width: 520px;
  // min-width: 650px;
}
</style>
