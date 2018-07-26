<template>
  <div class="zdkAll">
    <div class="zdkContent">
      <div class="zdkContentBottom">
        <div class="zdkContentBottomLeft">
          <segmenting-line>
            <div slot="prepend" class="centerCenter">
              <i class="el-icon-setting centerCenterIcon"></i>&nbsp;字段浏览
            </div>
          </segmenting-line>
          <div style="padding: 20px;">
            <sx-min-form
              ref="thatForm"
              :mozhu="allFish" :momo="listData" :formModel="fishData" @consoleData="createFish"></sx-min-form>
          </div>
          <segmenting-line>
            <div slot="prepend" class="centerCenter">
              <i class="el-icon-setting centerCenterIcon"></i>&nbsp;字段属性
            </div>
            <div slot="append" class="centerCenter">
              <el-button type="text" @click="saveFish" icon="el-icon-edit" style="padding:0;margin:0;font-size: 16px;">保存</el-button>
            </div>
          </segmenting-line>
        </div>
        <div class="zdkContentBottomRight">
          <field-library
            v-model="listData"
            @newCreateFish="newCreateFish"
            @editFish="editFish"
            ></field-library>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import segmentingLine from '@/components/segmentingLine'
import fieldLibrary from '../../components/dynamicForm/fieldLibrary'

export default {
  components: {
    segmentingLine,
    fieldLibrary
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
              {label: '输入框', value: 'INPUT'},
              {label: '整数类型输入框', value: 'INT'},
              {label: '浮点数类型输入框', value: 'DOUBLE'},
              {label: '文本标签', value: 'TEXTAREA'},
              {label: '选择器', value: 'SELECT'},
              {label: '多选选择器', value: 'SELECTMUTIPLE'},
              {label: '日期选择器', value: 'DATE'},
              {label: '日期时间选择器', value: 'DATETIME'},
              {label: '单选框', value: 'RADIO'},
              {label: '多选框', value: 'CHECKBOX'},
              {label: '级联选择器', value: 'CASCADER'},
              {label: '创建表格', value: 'CREATETABLE'},
              {label: '计算', value: 'CREATECALCULATE'}
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
      fishNeedEditData: {}
    }
  },
  methods: {
    firstShow () {
      this.listData = []
    },
    newCreateFish () {
      this.$refs['thatForm'].resetData()
    },
    // CREATECALCULATE TREE LAYERTREE CREATETABLE
    auxiliaryType (formModel) {
      switch (formModel['type']) {
        case 'CREATETABLE':
          formModel['type'] = 'TABLE'
          break
        case 'TABLE':
          formModel['type'] = 'CREATETABLE'
          break
      }
      return formModel
    },
    async createFish (mozhuId, formModel, relation, newFields, idGroup) {
      // console.log(mozhuId, formModel, relation, newFields, idGroup)
      if (this.fishNeedEditData['row']) {
        this.listData.splice(this.fishNeedEditData['index'], 1, this.auxiliaryType(Object.assign({}, formModel)))
      } else {
        this.listData.push(this.auxiliaryType(Object.assign({}, formModel)))
      }
      this.$refs['thatForm'].resetData()
    },
    saveFish () {
      this.$refs['thatForm'].consoleData()
    },
    editFish (row, index) {
      this.fishNeedEditData = { index: index, row: row }
      this.fishData = this.auxiliaryType(Object.assign({}, row))
      console.log(row, index)
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
        width: 70%;
        flex-grow: 1;
      }
      .zdkContentBottomRight {
        flex-grow: 1;
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
