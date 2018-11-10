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
              <!-- <el-button type="text" @click="saveFish" style="padding:0;margin:0;font-size: 17px;">暂存</el-button> -->
            </div>
          </sx-segmenting-line>
          <div style="padding: 20px;">
            <!-- :leftAndRightShow="false" -->
            <sx-min-form
              :question="question"
              :leftAndRightShow="false"
              submitTF
              v-model="fishData"
              ref="thatForm"
              :mozhu="allFish" :momo="listData" @consoleData="createFish"></sx-min-form>
          </div>
          <sx-segmenting-line>
            <div slot="prepend" class="centerCenter">
              <i class="el-icon-setting centerCenterIcon"></i>&nbsp;字段浏览
            </div>
          </sx-segmenting-line>
          <div style="padding: 20px;max-height: 250px;" >
            <sx-min-form ref="thatFormPreview" v-model="thatFishData" :mozhu="thatFish" v-if="thatFishDataTF"></sx-min-form>
          </div>
        </div>
        <div class="zdkContentBottomRight">
          <sx-field-library
            v-model="listData"
            ref="thatFieldLibrary"
            @newCreateFish="newCreateFish"
            @getRealationData="getRealationData"
            @editFish="editFish"
            @deleteFish="deleteFish"
            ></sx-field-library>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fieldAllFields, fieldUpdate, fieldFinish, fieldDelete } from '@/api/form/zdk.js'
import sxSegmentingLine from '@/components/segmentingLine'
import sxFieldLibrary from '@/components/dynamicForm/fieldLibrary'

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
            ruleType: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          message: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          unit: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE']
          },
          example: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'TEXTAREA']
          },
          nullRadio: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['RADIO']
          },
          required: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['INPUT', 'INT', 'DOUBLE', 'SELECT', 'SELECTMUTIPLE', 'DATE', 'DATETIME', 'RADIO', 'RADIOTEXT', 'TEXTAREA', 'CHECKBOX', 'CHECKBOXTEXT', 'CASCADER']
          },
          tree: {
            target: 'type',
            ruleType: 'EQUAL',
            value: 'CASCADER'
          },
          layerTree: {
            target: 'type',
            ruleType: 'EQUAL',
            value: ['SELECT', 'SELECTMUTIPLE', 'RADIO', 'RADIOTEXT', 'CHECKBOX', 'CHECKBOXTEXT']
          },
          // radioAgain: {
          //   target: 'type',
          //   ruleType: 'EQUAL',
          //   value: 'RADIO'
          // },
          createCalculate: {
            target: 'type',
            ruleType: 'EQUAL',
            value: 'CREATECALCULATE'
          },
          createTable: {
            target: 'type',
            ruleType: 'EQUAL',
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
              {label: '单选框', value: 'RADIO'},
              {label: '单选选择器', value: 'SELECT'},
              {label: '文本单选框', value: 'RADIOTEXT'},
              {label: '多选框', value: 'CHECKBOX'},
              {label: '多选选择器', value: 'SELECTMUTIPLE'},
              {label: '文本多选框', value: 'CHECKBOXTEXT'},
              {label: '级联选择器', value: 'CASCADER'},
              {label: '日期选择器', value: 'DATE'},
              {label: '日期时间选择器', value: 'DATETIME'},
              {label: '整数类型输入框', value: 'INT'},
              {label: '浮点类型输入框', value: 'DOUBLE'},
              {label: '文本标签', value: 'TEXTAREA'},
              {label: '输入框', value: 'INPUT'},
              {label: '计算', value: 'CREATECALCULATE'},
              {label: '创建表格', value: 'CREATETABLE'}
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
              { required: true, message: '请输入组件ID', trigger: 'change' },
              { pattern: '^[a-z][a-zA-Z0-9]+$', message: '只能输入以小写英文字母开头的英文或数字(两位以上),为统一建议驼峰式,如oneTwo', trigger: 'change' }
            ]
          },
          // labellabel
          {
            id: 'label',
            label: '标签名字',
            value: '',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入组件标签名', trigger: 'change' }
              // { pattern: '^[^\\s~！@#￥%……&*（）——+~!@#$%^&*()_+]*$|^[\\w\\u4e00-\\u9fa5]+$|^[\\w\\u4e00-\\u9fa5]+\\sv{1,2}$', message: '不能输入空格或特殊字符', trigger: 'change' }
            ]
          },
          // patten
          {
            id: 'pattern',
            label: '取值范围',
            type: 'INPUT'
          },
          // patten example
          {
            id: 'example',
            label: '取值范围示例',
            type: 'EXAMPLE'
          },
          // patten message
          {
            id: 'message',
            label: '取值范围提示',
            type: 'INPUT'
          },
          // patten message
          {
            id: 'unit',
            label: '单位',
            type: 'INPUT'
          },
          // nullRadio example
          {
            id: 'nullRadio',
            label: '标题示例',
            type: 'NULLRADIO'
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
            label: '选择字段',
            type: 'CREATETABLE',
            values: []
          }
        ]
      },
      question: {
        layerTree: {
          paraphrase: `选项创建快捷方式:
    1、选项间连接方式 &&
    2、选项值连接方式 ** (仅适用选项值为数字类型的情形)
例子如下图所示
          `,
          title: '备注',
          images: [
            require('../../assets/images/layerTree.jpg')
          ]
        }
      },
      fishData: {},
      listData: [],
      fishNeedEditData: {},
      // 展示
      thatFish: {},
      thatFishData: {},
      thatFishDataTF: false
    }
  },
  created () {
    this.show()
  },
  methods: {
    async show () {
      let fieldsData = await fieldAllFields()
      console.log(fieldsData)
      if (fieldsData) {
        this.listData = fieldsData.data.entity
      }
    },
    newCreateFish () {
      this.fishNeedEditData = {}
      // this.fishData = {}
      this.thatFish = {}
      this.$refs['thatForm'].resetData()
      this.$refs['thatFieldLibrary'].resetData()
      // this.$set(this.thatFish, 'fields', [])
      // this.$refs['thatFormPreview'].againData()
    },
    //  CREATECALCULATE TREE LAYERTREE CREATETABLE 辅助字段
    auxiliaryType (formModel) {
      switch (formModel['type']) {
        case 'CREATETABLE':
          formModel['values'] = []
          formModel['tree'] = []
          formModel['layerTree'] = []
          formModel['createCalculate'] = ''
          // formModel['subFields'] = formModel['createTable']
          formModel['subFields'] = []
          // for (let i of this.listData) {
          //   if (formModel['createTable'].includes(i.id)) {
          //     formModel['subFields'].push(i)
          //   }
          // }
          for (let i of formModel['createTable']) {
            formModel['subFields'].push({ id: i })
          }
          formModel['type'] = 'TABLE'
          break
        case 'TABLE':
          formModel['type'] = 'CREATETABLE'
          break
        case 'SELECT':
        case 'SELECTMUTIPLE':
        case 'RADIO':
        case 'RADIOTEXT':
        case 'CHECKBOX':
        case 'CHECKBOXTEXT':
          formModel['createTable'] = []
          if (formModel['layerTree']) {
            formModel['values'] = formModel['layerTree']
          } else if (formModel['values']) {
            formModel['layerTree'] = formModel['values']
          } else {
            formModel['layerTree'] = []
          }
          // formModel['values'] = formModel['layerTree'] ? formModel['layerTree'] : formModel['values']
          formModel['tree'] = []
          formModel['createCalculate'] = ''
          break
        case 'CASCADER':
          formModel['createTable'] = []
          if (formModel['tree']) {
            formModel['children'] = formModel['tree']
          } else if (formModel['children']) {
            formModel['tree'] = formModel['children']
          } else {
            formModel['tree'] = []
          }
          // formModel['children'] = formModel['tree'] ? formModel['tree'] : formModel['children']
          formModel['layerTree'] = []
          formModel['createCalculate'] = ''
          break
        case 'CREATECALCULATE':
          formModel['createTable'] = []
          formModel['layerTree'] = []
          formModel['tree'] = []
          formModel['type'] = 'CALCULATE'
          if (formModel['createCalculate']) {
            formModel['calculate'] = formModel['createCalculate']
          } else if (formModel['calculate']) {
            formModel['createCalculate'] = formModel['calculate']
          } else {
            formModel['calculate'] = ''
          }
          break
        case 'CALCULATE':
          if (formModel['createCalculate']) {
            formModel['calculate'] = formModel['createCalculate']
          } else if (formModel['calculate']) {
            formModel['createCalculate'] = formModel['calculate']
          } else {
            formModel['calculate'] = ''
          }
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
        case 'RADIOTEXT':
        case 'TEXTAREA':
        case 'CHECKBOX':
        case 'CHECKBOXTEXT':
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
      console.log(mozhuId, formModel, 'formModelformModelformModelformModelformModelformModelformModelformModel')
      // formModel['values'] = [...formModel['layerTree']].length ? [...formModel['layerTree']] : []
      let what = this.conversion(this.auxiliaryType(Object.assign({}, formModel)))
      let fe = ''
      if (this.fishNeedEditData['row']) {
        fe = await fieldUpdate(what)
        console.log(fe, 'fieldUpdatefieldUpdatefieldUpdate')
        // this.listData.splice(this.fishNeedEditData['index'], 1, what)
      } else {
        for (let i of this.listData) {
          if (formModel['id'] === i.id) {
            this.$message({
              showClose: true,
              message: '保存失败, ID已存在',
              type: 'warning'
            })
            return
          }
        }
        fe = await fieldFinish(what)
        console.log(fe)
        // this.listData.push(what)
      }
      if (fe) {
        await this.show()
        this.$refs['thatFieldLibrary'].resetData()
        this.$refs['thatForm'].resetData()
        this.fishNeedEditData = {}
        this.$set(this.thatFish, 'fields', [])
        // this.$refs['thatFormPreview'].againData()
      }
    },
    async editFish (row, index) {
      this.thatFishDataTF = false
      console.log(row, index, 'editfish')
      this.thatFishData = {}
      this.fishNeedEditData = { index: index, row: row }
      this.fishData = this.auxiliaryType(Object.assign({}, row))
      let rowData = this.auxiliaryType(Object.assign({}, row))
      if (rowData['type'] === 'CREATETABLE') rowData['type'] = 'TABLE'
      if (rowData['type'] === 'CREATECALCULATE') rowData['type'] = 'CALCULATE'
      console.log(rowData, 'rowDatarowDatarowData')
      this.$set(this.thatFish, 'fields', [])
      await this.thatFish['fields'].push(rowData)
      // this.thatFish['fields'].splice(0, 1, rowData)
      setTimeout(_ => {
        this.thatFishDataTF = true
        this.$nextTick(_ => {
          this.$refs['thatFormPreview'].resetData()
          // this.$refs['thatFormPreview'].againData()
        })
      }, 1)
    },
    async deleteFish (row, index) {
      this.$confirm('此操作将删除字段', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        let fd = await fieldDelete(row.id)
        console.log(fd)
        this.fishNeedEditData = {}
        this.thatFish = {}
        this.$refs['thatForm'].resetData()
        this.$refs['thatFieldLibrary'].resetData()
        this.show()
      }).catch(_ => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    async getRealationData (data) {
      console.log(data, 'getRealationDatagetRealationData')
      if (data.subFields) {
        for (let i in data.subFields) {
          data.subFields[i] = {id: data.subFields[i].id}
        }
      }
      console.log(data)
      await fieldUpdate(data)
      this.show()
    }
    // async saveAllFish () {
    //   let ff = await fieldFinish(this.listData)
    //   console.log(ff)
    //   console.log(this.listData)
    // }
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
      // overflow: auto;
      display: flex;
      .zdkContentBottomLeft {
        overflow-y: auto;
        // max-width: 0px;
        width: 700px;
        flex-grow: 1;
      }
      .zdkContentBottomRight {
        width: 300px;
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
