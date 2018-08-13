<template>
  <div class="zdkAll">
    <div class="zdkContent">
      <div class="zdkContentBottom">
        <div class="zdkContentBottomLeft">
          <sx-segmenting-line>
            <div slot="prepend" class="centerCenter">
              <i class="el-icon-setting centerCenterIcon"></i>&nbsp;字段属性
            </div>
            <div slot="append" class="centerCenter">
              <!-- <el-button type="danger" @click="deleteFish" style="padding:0;margin:0;font-size: 16px;">删除</el-button> -->
              <el-button type="text" @click="saveFish" style="padding:0;margin:0;font-size: 17px;">暂存</el-button>
            </div>
          </sx-segmenting-line>
          <div style="padding: 20px;">
            <sx-min-form
              v-model="fishData"
              ref="thatForm"
              :mozhu="allFish" :momo="listData" @consoleData="createFish"></sx-min-form>
          </div>
          <sx-segmenting-line>
            <div slot="prepend" class="centerCenter">
              <i class="el-icon-setting centerCenterIcon"></i>&nbsp;字段浏览
            </div>
          </sx-segmenting-line>
          <div style="padding: 20px;height:100px;">
            <sx-min-form ref="thatFormPreview" v-model="thatFishData" :mozhu="thatFish"></sx-min-form>
          </div>
        </div>
        <div class="zdkContentBottomRight">
          <sx-field-library
            v-model="listData"
            ref="thatFieldLibrary"
            @newCreateFish="newCreateFish"
            @editFish="editFish"
            @deleteFish="deleteFish"
            @saveAllFish="saveAllFish"
            ></sx-field-library>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sxSegmentingLine from '@/components/segmentingLine'
import sxFieldLibrary from '../../components/dynamicForm/fieldLibrary'

export default {
  components: {
    sxSegmentingLine,
    sxFieldLibrary
  },
  data () {
    return {
      allFish: {
        relation: {
          pattern: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          message: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          example: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          required: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'SELECT', 'SELECTMUTIPLE', 'DATE', 'DATETIME', 'RADIO', 'TEXTAREA', 'CHECKBOX', 'CASCADER']
          },
          tree: {
            target: 'type',
            rule_type: 'EQUAL',
            value: 'CASCADER'
          },
          layerTree: {
            target: 'type',
            rule_type: 'EQUAL',
            value: ['SELECT', 'SELECTMUTIPLE', 'RADIO', 'CHECKBOX']
          },
          radioAgain: {
            target: 'type',
            rule_type: 'EQUAL',
            value: 'RADIO'
          },
          createCalculate: {
            target: 'type',
            rule_type: 'EQUAL',
            value: 'CREATECALCULATE'
          },
          createTable: {
            target: 'type',
            rule_type: 'EQUAL',
            value: 'CREATETABLE'
          }
        },
        fields: [
          {
            id: 'type',
            label: '请选择类型',
            value: '',
            type: 'RADIO',
            values: [
              {label: '选择器', value: 'SELECT'},
              {label: '文本标签', value: 'TEXTAREA'},
              {label: '多选选择器', value: 'SELECTMUTIPLE'},
              {label: '日期时间选择器', value: 'DATETIME'},
              {label: '计算', value: 'CREATECALCULATE'},
              {label: '单选框', value: 'RADIO'},
              {label: '创建表格', value: 'CREATETABLE'},
              {label: '日期选择器', value: 'DATE'},
              {label: '整数类型输入框', value: 'INT'},
              {label: '多选框', value: 'CHECKBOX'},
              {label: '输入框', value: 'INPUT'},
              {label: '级联选择器', value: 'CASCADER'},
              {label: '浮点类型输入框', value: 'DOUBLE'}
            ],
            validations: [
              { required: true, message: '请选择类型', trigger: 'change' }
            ]
          },
          // input
          {
            id: 'id',
            label: 'ID',
            value: '',
            type: 'INPUT',
            validations: [
              // { required: true, message: '请输入组件ID', trigger: 'change' },
              { pattern: '^[a-zA-Z][a-zA-Z0-9]+$', message: '只能输入以英文字母开头的英文或数字(两位以上)', trigger: 'change' }
            ]
          },
          // label
          {
            id: 'label',
            label: '标签名字',
            value: '',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入组件标签名', trigger: 'change' },
              { pattern: '^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$', message: '不能输入空格或特殊字符', trigger: 'change' }
            ]
          },
          // patten
          {
            id: 'pattern',
            label: '正则',
            type: 'INPUT'
          },
          // patten message
          {
            id: 'message',
            label: '正则提示信息',
            type: 'INPUT',
            rules: {
              id: 'type',
              rule_type: 'EQUAL',
              value: 'INPUT'
            }
          },
          // patten
          {
            id: 'example',
            label: '正则例子',
            type: 'EXAMPLE'
          },
          // tree
          {
            id: 'tree',
            label: '创建级联',
            type: 'TREE',
            values: []
          },
          // layertree
          {
            id: 'layerTree',
            label: '创建选项',
            type: 'LAYERTREE',
            values: []
          },
          // required
          {
            id: 'required',
            label: '是否必填',
            value: '',
            type: 'RADIO',
            values: [
              {label: '是', value: 1},
              {label: '否', value: 0}
            ]
          },
          {
            id: 'createCalculate',
            label: 'ID公式',
            value: '',
            type: 'CREATECALCULATE',
            validations: [
              { required: true, message: '请输入需要计算的 ID 公式,如 (id1+id2)', trigger: 'blur' }
            ]
          },
          // createtable
          {
            id: 'createTable',
            label: '创建表格',
            type: 'CREATETABLE',
            values: []
          }
        ]
      },
      fishData: {},
      listData: [],
      fishNeedEditData: {},
      // 展示
      thatFish: {},
      thatFishData: {}
    }
  },
  methods: {
    firstShow () {},
    newCreateFish () {
      this.fishNeedEditData = {}
      this.thatFish = {}
      this.$refs['thatForm'].resetData()
      this.$refs['thatFieldLibrary'].resetData()
      // this.$set(this.thatFish, 'fields', [])
      // this.$refs['thatFormPreview'].againData()
    },
    //  CREATECALCULATE TREE LAYERTREE CREATETABLE
    auxiliaryType (formModel) {
      switch (formModel['type']) {
        case 'CREATETABLE':
          formModel['values'] = []
          formModel['tree'] = []
          formModel['layerTree'] = []
          formModel['createCalculate'] = ''
          // formModel['subFields'] = formModel['createTable']
          formModel['subFields'] = []
          for (let i of this.listData) {
            if (formModel['createTable'].includes(i.id)) {
              formModel['subFields'].push(i)
            }
          }
          formModel['type'] = 'TABLE'
          break
        case 'TABLE':
          formModel['type'] = 'CREATETABLE'
          break
        case 'SELECT':
        case 'SELECTMUTIPLE':
        case 'RADIO':
        case 'CHECKBOX':
          formModel['createTable'] = []
          formModel['values'] = formModel['layerTree']
          formModel['tree'] = []
          formModel['createCalculate'] = ''
          break
        case 'CASCADER':
          formModel['createTable'] = []
          formModel['children'] = formModel['tree']
          formModel['layerTree'] = []
          formModel['createCalculate'] = ''
          break
        case 'CREATECALCULATE':
          formModel['createTable'] = []
          formModel['layerTree'] = []
          formModel['tree'] = []
          formModel['type'] = 'CALCULATE'
          formModel['values'] = formModel['createCalculate']
          break
        case 'CALCULATE':
          formModel['type'] = 'CREATECALCULATE'
          break
        default:
          formModel['createCalculate'] = ''
          formModel['createTable'] = []
          formModel['layerTree'] = []
          formModel['tree'] = []
          formModel['values'] = []
          break
      }
      console.log(formModel)
      return formModel
    },
    conversion (what = {}) {
      what['validations'] = []
      switch (what.type) {
        case 'INPUT':
        case 'INT':
        case 'DOUBLE':
        case 'SELECT':
        case 'DATE':
        case 'DATETIME':
        case 'RADIO':
        case 'TEXTAREA':
        case 'CHECKBOX':
        case 'CASCADER':
        case 'SELECTMUTIPLE':
          if (what['required']) {
            what['validations'].push(
              { required: (Boolean(what['required'])), message: '请输入或选择' + what['label'], trigger: 'change' }
            )
          }
          if (what.type === 'INPUT' | what.type === 'INT' | what.type === 'DOUBLE' | what.type === 'TEXTAREA') {
            if (what['pattern']) {
              what['validations'].push(
                { pattern: what['pattern'], message: what['message'] ? what['message'] : '请按规则填写', trigger: 'change' }
              )
            }
          }
          break
      }
      return what
    },
    async createFish (mozhuId, formModel, relation, newFields, idGroup) {
      // console.log(mozhuId, formModel, relation, newFields, idGroup)
      // formModel['values'] = [...formModel['layerTree']].length ? [...formModel['layerTree']] : []
      let what = this.conversion(this.auxiliaryType(Object.assign({}, formModel)))
      if (this.fishNeedEditData['row']) {
        this.listData.splice(this.fishNeedEditData['index'], 1, what)
      } else {
        for (let i of this.listData) {
          if (formModel['id'] === i.id) {
            this.$message({
              showClose: true,
              message: '暂存失败, ID已存在',
              type: 'warning'
            })
            return
          }
        }
        this.listData.push(what)
      }
      this.$refs['thatFieldLibrary'].resetData()
      this.$refs['thatForm'].resetData()
      this.fishNeedEditData = {}
      this.$set(this.thatFish, 'fields', [])
      this.$refs['thatFormPreview'].againData()
    },
    async editFish (row, index) {
      this.thatFishData = {}
      this.fishNeedEditData = { index: index, row: row }
      this.fishData = this.auxiliaryType(Object.assign({}, row))
      let rowData = this.auxiliaryType(Object.assign({}, row))
      if (rowData['type'] === 'CREATETABLE') rowData['type'] = 'TABLE'
      if (rowData['type'] === 'CREATECALCULATE') rowData['type'] = 'CALCULATE'
      this.$set(this.thatFish, 'fields', [])
      this.thatFish['fields'].push(rowData)
      // this.thatFish['fields'].splice(0, 1, rowData)
      this.$refs['thatFormPreview'].resetData()
      this.$refs['thatFormPreview'].againData()
      // this.thatFishTF = true
    },
    async deleteFish (row, index) {
      this.fishNeedEditData = {}
      this.thatFish = {}
      this.$refs['thatForm'].resetData()
      this.$refs['thatFieldLibrary'].resetData()
    },
    saveFish () {
      // ----> createFish
      this.$refs['thatForm'].consoleData()
      // this.saveAllFish()
    },
    saveAllFish () {
      console.log(this.listData)
    }
  }
}
</script>

<style lang="scss" scoped>
$full: 100%;
.zdkAll {
  height: $full;
  width: $full;
  .zdkContent {
    height: $full;
    width: $full;
    .zdkContentTop {
      width: $full;
      display: flex;
    }
    .zdkContentBottom {
      width: $full;
      height: $full;
      display: flex;
      .zdkContentBottomLeft {
        width: 72%;
        flex-grow: 1;
      }
      .zdkContentBottomRight {
        width: 290px;
        // flex-grow: 1;
      }
    }
    .centerCenter {
      display: flex;
      align-items: center;
      padding-top:10px;
      padding-bottom:10px;
      .centerCenterIcon {
        font-size: 26px;
      }
    }
  }
}
</style>
