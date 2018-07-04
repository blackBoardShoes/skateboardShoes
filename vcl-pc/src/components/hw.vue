 <template>
  <div class='all'>
    <div class='content'>
      <el-form ref='form' :model='form' :rules="rules" size='mini'>
        <div v-for="(items, index) in fields" :key="index">
          <el-form-item :prop="items.id" :label="items.title" v-if="tf(items)">
            <el-input v-if="items.type === 'INPUT'" v-model='form[items.id]'></el-input>
            <el-input type="textarea" v-if="items.type === 'TEXTAREA'" v-model='form[items.id]'></el-input>
            <el-radio-group v-model="form[items.id]" v-if="items.type === 'RADIO'">
              <el-radio v-for="(it, ii) in items.values" :key="ii" :label="it.value">{{it.label}}</el-radio>
            </el-radio-group>
            <el-checkbox-group v-model="form[items.id]" v-if="items.type === 'CHECKBOX'">
              <el-checkbox v-for="(it, ii) in items.values" :key="ii" :label="it.value" >{{it.label}}</el-checkbox>
            </el-checkbox-group>
            <el-switch v-if="items.type === 'SWITCH'" v-model="form[items.id]" ></el-switch>
            <el-select v-if="items.type === 'SELECT'" v-model="form[items.id]" style="width: 100%;">
              <el-option v-for="(it, ii) in items.values" :key="ii" :label="it.label" :value="it.value"></el-option>
            </el-select>
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              v-if="items.type === 'DATE'" type="date"
              placeholder="选择日期" v-model="form[items.id]" style="width: 100%;" ></el-date-picker>
            <el-cascader
              v-if="items.type === 'CASCADER'"
              :options="items.values"
              v-model="form[items.id]">
            </el-cascader>
            <div v-if="items.type === 'CALCULATE'" >
              <div>{{form[items.id]}}<el-button @click="onEval(items)">计算</el-button></div>
            </div>
          </el-form-item>
          <!-- <el-table
            :data="tableData"
            style='width: 100%'
            v-if="items.type === 'TABLE'" >
            <el-table-column
              align='center'
              v-for="(sonItems, sonIndex) in items['sub_fields']"
              :key='sonIndex'
              :label='sonItems.title'>
              <template slot-scope='scope'>
                <el-form-item  :prop="scope.$index + sonItems.id">
                  <div v-if="sonItems.type === 'INPUT'">
                    <el-input v-model='form[scope.$index + sonItems.id]'></el-input>
                  </div>
                  <div v-if="sonItems.type === 'TEXTAREA'">
                    <el-input type="textarea" v-model='form[scope.$index + sonItems.id]'></el-input>
                  </div>
                  <div v-if="sonItems.type === 'RADIO'">
                    <el-radio-group v-model='form[scope.$index + sonItems.id]'>
                      <el-radio v-for="(it, ii) in sonItems.values" :key="ii" :label="it.value">{{it.label}}</el-radio>
                    </el-radio-group>
                  </div>
                  <div v-if="sonItems.type === 'SELECT'">
                    <el-select v-model='form[scope.$index + sonItems.id]' style="width: 100%;">
                      <el-option v-for="(it, ii) in sonItems.values" :key="ii" :label="it.label" :value="it.value"></el-option>
                    </el-select>
                  </div>
                  <div v-if="sonItems.type === 'CHECKBOX'">
                    <el-checkbox-group v-model="form[scope.$index + sonItems.id]">
                      <el-checkbox v-for="(it, ii) in sonItems.values" :key="ii" :label="it.value" >{{it.label}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div v-if="sonItems.type === 'CASCADER'">
                    <el-cascader :options="sonItems.values" v-model="form[scope.$index + sonItems.id]"></el-cascader>
                  </div>
                  <div v-if="sonItems.type === 'SWITCH'">
                    <el-switch v-model="form[scope.$index + sonItems.id]" ></el-switch>
                  </div>
                  <div v-if="sonItems.type === 'DATE'">
                    <el-date-picker
                      type="date"
                      format="yyyy 年 MM 月 dd 日" placeholder="选择日期"
                      v-model='form[scope.$index + sonItems.id]' style="width: 100%;"></el-date-picker>
                  </div>
                  <span v-show="false">{{form[items.id][scope.$index][sonItems.id] = (form[scope.$index + sonItems.id])}}</span>
                  {{form[items.id][scope.$index][sonItems.id]}}<br>
                  {{form[scope.$index + sonItems.id]}}
                </el-form-item>
              </template>
            </el-table-column>
          </el-table> -->
          <sx-table v-if="items.type === 'TABLE'" :tableData="items"></sx-table>
        </div>
          {{form}}
          <br>
          <br>
          <br>
          <br>
      </el-form>
      <el-button @click="addRow">addRow</el-button>
      <el-button @click="edit">edit</el-button>
      <el-button @click="aaa">reset</el-button>
      <el-button @click="bbb">2222</el-button>
      <el-button @click="createRadio">createRadio</el-button>
      <br>
          <br>
          <br>
          <br>
    </div>
  </div>
</template>

<script>
import '../assets/icons/ts.svg'
import sxTable from './table'

export default {
  name: 'HelloWorld',
  components: {
    sxTable
  },
  data () {
    return {
      form: {},
      fields: [
        // radio
        {
          id: 'liveAlone',
          title: '您独自一人生活吗？',
          value: 'RADIO',
          type: 'RADIO',
          values: [
            {label: '是', value: 0},
            {label: '否', value: 1}
          ],
          validation: [
            { required: true, message: '请选择1111', trigger: 'change' }
          ]
        },
        // INPUT
        {
          id: 'numAdult',
          title: '除了自己以外18岁以上成年人有几位00000',
          value: '',
          type: 'INPUT',
          rules: {
            id: 'liveAlone',
            rule_type: 'EQUAL',
            value: 1
          },
          validation: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        },
        // INPUT
        {
          id: 'numAdulta',
          title: '除了自己以外18岁以上成年人有几位11111',
          value: '',
          type: 'INPUT',
          rules: {
            id: 'liveAlone',
            rule_type: 'EQUAL',
            value: 1
          },
          validation: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        },
        // CHECKBOX
        {
          id: 'heartAttackUnder50',
          title: '我帅么',
          value: '',
          type: 'CHECKBOX',
          values: [
            {label: 'A', value: 0},
            {label: 'B', value: 1},
            {label: 'C', value: 2},
            {label: 'D', value: 3}
          ],
          validation: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ]
        },
        // CASCADER
        {
          id: 'aCascader',
          title: '我帅么111',
          value: '',
          type: 'CASCADER',
          values: [{
            value: 0,
            label: 'Basic',
            children: [{
              value: 1,
              label: 'Layout 布局'
            }, {
              value: 2,
              label: 'Color 色彩'
            }, {
              value: 3,
              label: 'Typography 字体'
            }, {
              value: 4,
              label: 'Icon 图标'
            }, {
              value: 5,
              label: 'Button 按钮'
            }]
          }],
          validation: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ]
        },
        // SWITCH
        {
          id: 'heartAttackUnder53',
          title: '我帅么',
          value: '',
          type: 'SWITCH'
        },
        // RADIO
        {
          id: 'heartAttackUnder52',
          title: '我帅么',
          value: '',
          type: 'RADIO',
          values: [
            {label: '是', value: 0},
            {label: '否', value: 1}
          ],
          validation: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        },
        // date
        {
          id: 'oncologyHistoryTime1',
          title: '诊断时间',
          type: 'DATE',
          validation: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          rules: {
            id: 'heartAttackUnder52',
            rule_type: 'EQUAL',
            value: 0
          }
        },
        // INPUT
        {
          id: 'paternalDiagnosis',
          title: '诊断',
          type: 'INPUT',
          validation: [
            { required: true, message: '诊断', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ]
        },
        // TEXTAREA
        {
          id: 'paternalDiagnosis6',
          title: 'ccc',
          type: 'TEXTAREA',
          validation: [
            { required: true, message: '诊断', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ]
        },
        // SELECT
        {
          id: 'heartAttackUnder51',
          title: '我帅么',
          value: '',
          type: 'SELECT',
          values: [
            {label: '是', value: 0},
            {label: '否', value: 1}
          ],
          validation: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        },
        // CALCULATE
        {
          id: 'smallInstestinePancreaScore',
          title: '小肠和胰腺总分',
          value: '(numAdult + numAdulta)',
          type: 'CALCULATE',
          validation: {}
        },
        {
          id: 'concreteOncology',
          title: '具体肿瘤史',
          values: [{
            oncologyHistoryDiagnosis: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            oncologyHistoryHospital: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }],
          type: 'TABLE',
          validation: {
            required: true
          },
          sub_fields: [
            {
              id: 'oncologyHistoryDiagnosis',
              title: '诊断',
              type: 'TEXTAREA',
              validation: [
                { required: true, message: '请输入活动', trigger: 'change' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
              ]
            },
            {
              id: 'oncologyHistoryHospital',
              title: '诊断医院',
              type: 'INPUT',
              validation: [
                { required: true, message: '请输入名称', trigger: 'change' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
              ]
            },
            {
              id: 'heartAttackUnderaa',
              title: '我帅么',
              value: '',
              type: 'SELECT',
              values: [
                {label: '是', value: 0},
                {label: '否', value: 1}
              ],
              validation: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
              ]
            },
            {
              id: 'oncologyHistoryTime',
              title: '诊断时间',
              type: 'DATE',
              validation: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
              ]
            },
            {
              id: 'heartAttackUnder121',
              title: '我帅么',
              value: '',
              type: 'CHECKBOX',
              values: [
                {label: 'A', value: 0},
                {label: 'B', value: 1},
                {label: 'C', value: 2},
                {label: 'D', value: 3}
              ],
              validation: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
              ]
            },
            {
              id: 'heartAttackUnder22',
              title: '我帅么',
              value: '',
              type: 'SWITCH'
            },
            {
              id: 'heartAttackUnder33',
              title: '我帅么',
              value: '',
              type: 'RADIO',
              values: [
                {label: '是', value: 0},
                {label: '否', value: 1}
              ],
              validation: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
              ]
            },
            {
              id: 'aCascader',
              title: '我帅么111',
              value: '',
              type: 'CASCADER',
              values: [{
                value: 'basic',
                label: 'Basic',
                children: [{
                  value: 'layout',
                  label: 'Layout 布局'
                }, {
                  value: 'color',
                  label: 'Color 色彩'
                }, {
                  value: 'typography',
                  label: 'Typography 字体'
                }, {
                  value: 'icon',
                  label: 'Icon 图标'
                }, {
                  value: 'button',
                  label: 'Button 按钮'
                }]
              }],
              validation: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
              ]
            }
          ]
        }
      ],
      tableData: [],
      rules: {}
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    tf (items) {
      let a = true
      if (items.rules) {
        console.log(items.rules['id'])
        switch (items.rules['rule_type']) {
          case 'EQUAL':
            a = this.form[items.rules.id] === items.rules.value
            break
          case 'GT':
            a = this.form[items.rules.id] > items.rules.value
            break
          case 'GTOE':
            a = this.form[items.rules.id] >= items.rules.value
            break
          case 'LE':
            a = this.form[items.rules.id] < items.rules.value
            break
          case 'LEOE':
            a = this.form[items.rules.id] <= items.rules.value
            break
          case 'NOTEQUAL':
            a = this.form[items.rules.id] !== items.rules.value
            break
          default:
            a = false
            break
        }
        console.log(a)
      }
      return a
      // let a = items.rules? items.rules['rule_type'] === 'EQUAL' : this.form[items.rules['id']] === items.rules.value
      // ? items.rules['rule_type'] === 'GT' : this.form[items.rules.id] > items.rules.value
      // ? items.rules['rule_type'] === 'GTOE' : this.form[items.rules.id] >= items.rules.value
      // ? items.rules['rule_type'] === 'LE' : this.form[items.rules.id] < items.rules.value
      // ? items.rules['rule_type'] === 'LEOE' : this.form[items.rules.id] <= items.rules.value
      // ? items.rules['rule_type'] === 'NOTEQUAL' : this.form[items.rules.id] !== items.rules.value
      // this.$set(this.rules, 'paternalDiagnosis', [
      //   { required: true, message: '请输入活动名称', trigger: 'change' },
      //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
      // ])
      // this.$set(this.rules, '0oncologyHistoryDiagnosis', [
      //   { required: true, message: '请输入活动名称', trigger: 'change' }
      // ])
      // this.$set(this.rules, '0oncologyHistoryTime', [
      //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
      // ])
    },
    b () {
      console.time('-----')
      for (let i of this.fields) {
        switch (i.type) {
          case 'TABLE':
            if (!this.form[i.id]) {
              this.$set(this.form, i.id, [])
            }
            if (i.sub_fields) {
              let a = {}
              for (let j of i.sub_fields) {
                if (!this.form[j.id]) {
                  switch (j.type) {
                    case 'CASCADER':
                    case 'CHECKBOX':
                      // this.$set(a, i.sub_fields[j].id, [])
                      a[j.id] = []
                      break
                    case 'SWITCH':
                      // this.$set(a, i.sub_fields[j].id, false)
                      a[j.id] = false
                      break
                    default :
                      // this.$set(a, i.sub_fields[j].id, '')
                      a[j.id] = ''
                      break
                  }
                }
              }
              for (let z in this.tableData) {
                console.log(a)
                let w = Object.assign({}, a)
                if (!this.form[i.id][z]) {
                  this.$set(this.form[i.id], z, w)
                }
                for (let j of i.sub_fields) {
                  switch (j.type) {
                    case 'CASCADER':
                    case 'CHECKBOX':
                      if (!this.form[z + j.id]) {
                        this.$set(this.form, z + j.id, [])
                      }
                      break
                    case 'SWITCH':
                      if (!this.form[z + j.id]) {
                        this.$set(this.form, z + j.id, false)
                      }
                      break
                    default :
                      if (!this.form[z + j.id]) {
                        this.$set(this.form, z + j.id, '')
                      }
                      break
                  }
                  this.$set(this.rules, z + j.id, j.validation)
                }
              }
            }
            break
          case 'CHECKBOX':
            if (!this.form[i.id]) {
              this.$set(this.form, i.id, [])
              this.$set(this.rules, i.id, i.validation)
            }
            break
          case 'CASCADER':
            if (!this.form[i.id]) {
              this.$set(this.form, i.id, [])
              this.$set(this.rules, i.id, i.validation)
            }
            break
          case 'SWITCH':
            if (!this.form[i.id]) {
              this.$set(this.form, i.id, false)
              this.$set(this.rules, i.id, i.validation)
            }
            break
          default :
            if (!this.form[i.id]) {
              this.$set(this.form, i.id, '')
              this.$set(this.rules, i.id, i.validation)
            }
            break
        }
      }
      console.log('----')
      console.log(this.form)
      console.log(this.$refs)
      console.log('----')
      console.timeEnd('-----')
    },
    aaa () {
      console.log(this.form)
      this.$refs['form'].resetFields()
    },
    bbb () {
      this.$refs['form'].validate(valid => {
        console.log(this.form)
        if (valid) {
          console.log('SUCCESS')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    edit () {
      this.form.heartAttackUnder50 = [0, 2]
    },
    addRow () {
      this.tableData = [{}, {}, {}, {}]
      this.b()
    },
    onEval (ev) {
      console.log(ev.value)
      this.form[ev.id] = this.calculate(this.form, ev.value)
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
      return values[0]
      /* eslint-disable */
    },
    createRadio () {
      this.fields.push({
        id: 'liveAlone',
        title: '您独自一人生活吗？',
        value: 'RADIO',
        type: 'RADIO',
        values: [
          {label: '是', value: 0},
          {label: '否', value: 1}
        ],
        validation: [
          { required: true, message: '请选择1111', trigger: 'change' }
        ]
      })
    }
  },
  created () {
    console.log(this)
    // this.a()
    this.b()
  }
}
</script>
<style lang='scss'>
.all .el-checkbox {
  margin: 0px 5px;
}
.all .el-radio {
  margin: 5px;
}
</style>

<style lang="scss" scoped>
.all {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .content {
    width: 80%;
    height: 80%;
  }
}
</style>
