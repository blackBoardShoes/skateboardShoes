<template>
  <div class="allCalculate">
    <div class="ContentCalculate">
      <!-- <el-button-group>
        <el-button
          style="margin-top: 6px;margin-bottom:6px;"
          size="mini"
          v-for="(item, index) in calculateData"
          :key="index"
          @click="createFormula(item.id, index)"> {{item.label}} </el-button>
      </el-button-group> -->
      <el-select clearable filterable style="width:100%;" @change="createFormula" v-model="a">
        <el-option v-for="(item, index) in calculateData" :key="index" :label="item.label" :value="item.id" >
        </el-option>
      </el-select>
      <br>
      <br>
      <el-button-group>
        <el-button
          size="mini"
          plain
          v-for="(item, index) in calculateNumber"
          :key="index"
          :type="item[1]"
          @click="createFormula(item[0], index)"> {{item[0]}} </el-button>
      </el-button-group>
      <br>
      <br>
      <el-button-group>
        <el-button
          size="mini"
          v-for="(item, index) in calculateMethods"
          :key="index"
          :type="item[1]"
          @click="createFormula(item[0], index)"> {{item[0]}} </el-button>
      </el-button-group>
      &nbsp;
      <el-button
        size="mini"
        @click="cutOut"
        plain circle
        icon="el-icon-close"></el-button>
      <el-button
        size="mini"
        type="danger" @click="clearFormula"
        plain circle>AC</el-button>
      <br><br>
      <span class="calcultatePresent">
        {{formula}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default () {
        return ''
      }
    },
    calculateData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      a: '',
      calculateMethods: [
        ['+', 'primary'],
        ['-', 'primary'],
        ['*', 'primary'],
        ['/', 'primary'],
        ['^', 'primary'],
        ['%', 'primary'],
        ['(', 'warning'],
        [')', 'warning']
      ],
      calculateNumber: [
        ['0', 'default'],
        ['1', 'default'],
        ['2', 'default'],
        ['3', 'default'],
        ['4', 'default'],
        ['5', 'default'],
        ['6', 'default'],
        ['7', 'default'],
        ['8', 'default'],
        ['9', 'default'],
        ['.', 'default']
      ],
      formula: this.value
    }
  },
  computed: {},
  created () {},
  watch: {
    value () {
      this.formula = this.value
    },
    formula () {
      this.$emit('input', this.formula)
    },
    calculateData (value) {
      console.log(value, 'cacacacacacca')
      this.calculateData = value
    }
  },
  methods: {
    createFormula (item, index) {
      let formulaEnd = this.formula.slice(this.formula.length - 1, this.formula.length)
      let pattern = /^[a-zA-Z]+$/
      let numPattern = /^[0-9.]+$/
      let symbolPattern = /^[%\-*+\\^/]$/
      // let bracketPattern = /^[()]$/
      let leftBracketPattern = /^[(]$/
      let rightBracketPattern = /^[)]$/
      let leftAllBracketPattern = /[(]/g
      let rightAllBracketPattern = /[)]/g
      // let arr = this.formula.match(pattern)
      if (symbolPattern.test(item) & symbolPattern.test(formulaEnd)) {
        this.formula = this.formula.slice(0, this.formula.length - 1) + item
      } else {
        if (!formulaEnd) {
          if (numPattern.test(item) | pattern.test(item) | rightAllBracketPattern.test(item)) {
            this.formula = this.formula + item
            // this.formula = '(' + this.formula + item
          } else if (leftBracketPattern.test(item)) {
            this.formula = this.formula + item
          } else if (symbolPattern.test(item)) {
            this.formula = '(0' + this.formula + item
          } else {
            console.log('wocao?')
          }
          return
        }
        if (
          pattern.test(formulaEnd) & symbolPattern.test(item) |
          pattern.test(formulaEnd) & rightBracketPattern.test(item) |
          numPattern.test(formulaEnd) & symbolPattern.test(item) |
          numPattern.test(formulaEnd) & numPattern.test(item) |
          numPattern.test(formulaEnd) & rightBracketPattern.test(item) |
          symbolPattern.test(formulaEnd) & pattern.test(item) |
          symbolPattern.test(formulaEnd) & numPattern.test(item) |
          symbolPattern.test(formulaEnd) & leftBracketPattern.test(item) |
          leftBracketPattern.test(formulaEnd) & leftBracketPattern.test(item) |
          leftBracketPattern.test(formulaEnd) & rightBracketPattern.test(item) |
          leftBracketPattern.test(formulaEnd) & pattern.test(item) |
          leftBracketPattern.test(formulaEnd) & numPattern.test(item) |
          rightBracketPattern.test(formulaEnd) & symbolPattern.test(item)
        ) {
          let leftAll = this.formula.match(leftAllBracketPattern) ? this.formula.match(leftAllBracketPattern).length : []
          let rightAll = this.formula.match(rightAllBracketPattern) ? this.formula.match(rightAllBracketPattern).length : []
          console.log('222', leftAll, rightAll)
          if (rightBracketPattern.test(item)) {
            if (rightAll >= leftAll) {
              this.$message({
                showClose: true,
                message: '公式不允许',
                type: 'warning'
              })
              return
            }
          }
          this.formula = this.formula + item
        } else {
          this.$message({
            showClose: true,
            message: '公式不允许',
            type: 'warning'
          })
        }
      }
    },
    cutOut () {
      let pattern = /[a-zA-Z0-9]+/g
      let formulaEnd = this.formula.slice(this.formula.length - 1, this.formula.length)
      let symbolPattern = /^[%\-*+^./()]$/
      let arr = this.formula.match(pattern)
      if (symbolPattern.test(formulaEnd)) {
        this.formula = this.formula.slice(0, this.formula.length - 1)
      } else {
        if (arr) {
          this.formula = this.formula.slice(0, this.formula.length - arr[arr.length - 1].length)
        }
      }
    },
    clearFormula () {
      this.formula = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.allCalculate {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  .ContentCalculate {
    width:100%;
    .calcultatePresent {
      font-size: 30px;
      font-family: '微软雅黑';
    }
  }
}
</style>
