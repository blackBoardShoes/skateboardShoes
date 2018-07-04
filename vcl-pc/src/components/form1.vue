<template>
  <div class="formAll">
    <el-form
      label-width="150px"
      label-position="left"
      ref='formModel' :model='formModel' size='mini'>
      <SortableList lockAxis="y" v-model="newFields">
        <SortableItem v-for="(items, index) in newFields" :key="index" :index="index">
      <el-form-item
        :rules="items.validations"
        :prop="items.id" :label="items.label" v-if="tf(items)">
          <el-input v-if="items.type === 'INPUT'" v-model='formModel[items.id]'></el-input>
          <el-input v-if="items.type === 'INT'" v-model='formModel[items.id]'></el-input>
          <el-input v-if="items.type === 'DOUBLE'" v-model='formModel[items.id]'></el-input>
          <el-input v-if="items.type === 'TEXTAREA'" type="textarea"  v-model='formModel[items.id]'></el-input>
          <el-radio-group v-model="formModel[items.id]" v-if="items.type === 'RADIO'">
            <el-radio v-for="(it, ii) in items.values" :key="ii" :label="it.value">{{it.label}}</el-radio>
          </el-radio-group>
          <el-checkbox-group v-model="formModel[items.id]" v-if="items.type === 'CHECKBOX'">
            <el-checkbox v-for="(it, ii) in items.values" :key="ii" :label="it.value" >{{it.label}}</el-checkbox>
          </el-checkbox-group>
          <el-switch v-if="items.type === 'SWITCH'" v-model="formModel[items.id]" ></el-switch>
          <el-select v-if="items.type === 'SELECT'" v-model="formModel[items.id]" style="width:100%;">
            <el-option v-for="(it, ii) in items.values" :key="ii" :label="it.label" :value="it.value" ></el-option>
          </el-select>
          <el-date-picker
            style="width:100%;"
            v-if="items.type === 'DATE'"
            v-model="formModel[items.id]"
            type="date"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-date-picker
            style="width:100%;"
            v-if="items.type === 'DATETIME'"
            v-model="formModel[items.id]"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        <!-- value-format="yyyy-MM-dd/HH:mm:ss" -->
          <el-cascader
            style="width:100%;"
            v-if="items.type === 'CASCADER'"
            :options="items.values"
            v-model="formModel[items.id]">
          </el-cascader>
          <div v-if="items.type === 'CALCULATE'" >
            <div>
              {{formModel[items.id] ? formModel[items.id] : 0}}&nbsp;&nbsp;&nbsp;
              <el-button @click="onEval(items)">计算</el-button>
            </div>
          </div>
          <div>
            <sx-table ref="sxtable" v-if="items.type === 'TABLE'" :tableData="items" @getData="getData"></sx-table>
          </div>
          <el-button-group v-if="edit">
            <el-button @click="editFormRow(items, index)">editFormRow</el-button>
            <el-button type="danger" @click="deleteFormRow(items, index)">deleteFormRow</el-button>
          </el-button-group>
      </el-form-item>
      </SortableItem>
      {{formModel}}<br><br>
      <el-form-item label-width="0px" style="text-align:center">
        <el-button @click="newlyBuild">newlyBuild</el-button>
        <el-button @click="consoleData">consoleData</el-button>
        <el-button @click="resetData">resetData</el-button>
      </el-form-item>
    </SortableList>
    </el-form>
  </div>
</template>

<script>
import { ContainerMixin, ElementMixin } from 'vue-slicksort'
import sxTable from './table'
const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `
}

const SortableItem = {
  mixins: [ElementMixin],
  template: `
    <li class="list-item"><slot /></li>
  `
}
export default {
  components: {
    SortableItem,
    SortableList,
    sxTable
  },
  props: {
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    formModel: {
      type: Object,
      default () {
        return {}
      }
    },
    edit: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      newFields: []
    }
  },
  created () {
    this.newFields = [...this.fields]
    console.time('---form start-------')
    this.init()
    // console.log(this.fields)
    // console.log(this.formModel)
    console.timeEnd('---form start-------')
  },
  methods: {
    init () {
      for (let i of this.fields) {
        switch (i.type) {
          case 'CHECKBOX':
            if (!this.formModel[i.id]) {
              this.$set(this.formModel, i.id, [])
            }
            break
          // case 'DOUBLE':
          // case 'INT':
          //   if (!this.formModel[i.id]) {
          //     this.$set(this.formModel, i.id, 0)
          //   }
          //   break
          case 'CASCADER':
            if (!this.formModel[i.id]) {
              this.$set(this.formModel, i.id, [])
            }
            break
          case 'DATE':
          case 'DATETIME':
            if (!this.formModel[i.id]) {
              this.$set(this.formModel, i.id, null)
            }
            break
          case 'SWITCH':
            if (!this.formModel[i.id]) {
              this.$set(this.formModel, i.id, false)
            }
            break
          default :
            if (!this.formModel[i.id]) {
              this.$set(this.formModel, i.id, '')
            }
            break
        }
        if (i['validations']) {
          for (let z in i['validations']) {
            if ('pattern' in i['validations'][z]) {
              i['validations'][z]['pattern'] = new RegExp(i['validations'][z]['pattern'])
              // this.$set(this.fields[j]['validations'][z], 'pattern', new RegExp(this.fields[j]['validations'][z]['pattern']))
            }
          }
        }
        if (i.type === 'DATE' | i.type === 'DATETIME') {
          if (typeof this.formModel[i.id] === 'string') {
            this.formModel[i.id] = new Date(this.formModel[i.id])
          }
        }
      }
      // for (let j in this.fields) {
      //   if (this.fields[j]['validations']) {
      //     for (let z in this.fields[j]['validations']) {
      //       if ('pattern' in this.fields[j]['validations'][z]) {
      //         this.fields[j]['validations'][z]['pattern'] = new RegExp(this.fields[j]['validations'][z]['pattern'])
      //         // this.$set(this.fields[j]['validations'][z], 'pattern', new RegExp(this.fields[j]['validations'][z]['pattern']))
      //       }
      //     }
      //   }
      // }
    },
    tf (items) {
      let a = true
      if (items.rules) {
        switch (items.rules['rule_type']) {
          case 'EQUAL':
            a = this.formModel[items.rules.id] === items.rules.value
            break
          case 'GT':
            a = this.formModel[items.rules.id] > items.rules.value
            break
          case 'GTOE':
            a = this.formModel[items.rules.id] >= items.rules.value
            break
          case 'LE':
            a = this.formModel[items.rules.id] < items.rules.value
            break
          case 'LEOE':
            a = this.formModel[items.rules.id] <= items.rules.value
            break
          case 'NOTEQUAL':
            a = this.formModel[items.rules.id] !== items.rules.value
            break
          default:
            a = false
            break
        }
      }
      return a
    },
    editFormRow (row, index) {
      console.log(row, index)
    },
    deleteFormRow (row, index) {
      this.fields.splice(index, 1)
      console.log(row, index)
    },
    resetData () {
      // console.log(this.formModel)
      this.$refs['formModel'].resetFields()
    },
    consoleData () {
      console.log(this.formModel, '------show')
      this.$refs['formModel'].validate(valid => {
        if (valid) {
          this.$nextTick(() => {
            if (this.$refs['sxtable']) {
              // console.log(this.$refs['sxtable'], '----')
              for (let i of this.$refs['sxtable']) {
                this.formModel[i.tableData['id']] = i.tableData['values']
              }
            }
          })
          this.$emit('consoleData', this.formModel)
          console.log(this.formModel, '------SUCCESS------点击页面DATA')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    newlyBuild () {
      // this.fields.push()
    },
    onEval (ev) {
      console.log(ev.value)
      this.formModel[ev.id] = this.calculate(this.formModel, ev.value)
    },
    calculate (data, pattern) {
      /* eslint-disable */
      //split用
      var reg = /\(|\)|\d+\.\d+|\d+|[a-zA-Z]+|\+|\-|\*|\/|\^|\%/g
      //判断条件
      var CONSTANT = /\d+\.\d+|\d+/
      var LEFT_BRACKET = /\(/
      var RIGHT_BRACKET = /\)/
      var OPERATOR = /\+|\-|\*|\/|\^|\%/
      var ID = /[a-zA-Z]+/
      var patternList = pattern.match(reg)
      //2个queue
      var values = [];
      var operator = [];

      for (var i = 0; i < patternList.length; i++){
        if (LEFT_BRACKET.test(patternList[i])) {
          continue;
        } else if (RIGHT_BRACKET.test(patternList[i])) {
          var v1 = values.pop();
          var v2 = values.pop();
          var op = operator.pop();
          var cal_value = null;
          switch (op) {
            case "+": { cal_value = v1 + v2; } break;
            case "-": { cal_value = v2 - v1; } break;
            case "*": { cal_value = v1 * v2; } break;
            case "/": { cal_value = v2 / v1; } break;
            case "%": { cal_value = v2 % v1; } break;
            case "^": { cal_value = Math.pow(v2, v1); } break;
            default: throw "something wrong while calculating value 1";
          }
          values.push(cal_value);
        } else if (CONSTANT.test(patternList[i])) {
          values.push(Number(patternList[i]));
        } else if (OPERATOR.test(patternList[i])) {
          operator.push(patternList[i])
        } else if (ID.test(patternList[i])) {
          if (data[patternList[i]] == null)
            throw "the data is empty: " + patternList[i];
          values.push(Number(data[patternList[i]]));
        } else 
          throw 'something wrong while calculating value 2'
      }
      return values[0].toString()
      /* eslint-disable */
    },
    getData (data) {
      console.log(data, '--=-=-=-=-this click, -> this tableData=-=-=')
    }
  }
}
</script>

<style lang="scss" scoped>
.formAll {
  .el-radio {
    min-width: 130px;
    margin: 5px;
    margin-left: 15px;
    margin-right: 15px;
  }
  .el-checkbox {
    min-width: 130px;
  }
}
</style>
