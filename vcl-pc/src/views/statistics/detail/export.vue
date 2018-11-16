<template>
  <div id="project-member">
    <div class="filter er-card">
      <div class="filter-head">
        数据导出
      </div>
      <div class="filter-condition">
        <div class="record-info-filter" v-for="(record, index) in basicInfomations" :key="index + 222">
          <!-- 第一步：选择字段 -->
          <div class="case">
            <el-cascader
              placeholder="请选择基本信息字段"
              style="width:100%;"
              :options="record.field.options"
              v-model="record.field.value"
              @change="changeRelaAndTarget2(record.field, index)">
            </el-cascader>
          </div>
          <!-- 第二步：选择关系（等于大于小于包含不包含） -->
          <div class="case">
            <el-select
              v-model="record.relation.value"
              v-if="record.field.value.length > 0"
              placeholder="请选择基本信息筛选">
              <el-option
                v-for="item in record.relation.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- 第三步：选择目标值 -->
          <div class="case">
            <el-select
              style="width:95%;"
              v-if="record.field.value[1] === 'gender' || record.field.value[1] === 'nation'"
              :allow-create="record.field.value[1] === 'nation'"
              :filterable="record.field.value[1] === 'nation'"
              v-model="record.target.value"
              :placeholder="record.field.value[1] === 'nation' ? '请选择或填写民族' : '请选择性别'">
              <el-option
                v-for="item in record.target.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-cascader
              style="width:95%;"
              :change-on-select="true"
              v-if="record.field.value[1] === 'address'"
              :options="addressOption"
              placeholder="请选择常住地址"
              v-model="record.target.value">
            </el-cascader>
          </div>
          <div class="add-case">
            <el-button type="text" size="mini" class="ercp-icon-general-decrease" @click="deleteOne(2, index)"></el-button>
            <el-button type="text" size="mini" class="ercp-icon-general-append" @click="addOne(2)"></el-button>
          </div>
        </div>
        <div class="basic-info-filter" v-for="(info, index) in hospitalRecords" :key="index + 111">
          <!-- 第一步：选择字段 -->
          <div class="case">
            <el-cascader
              placeholder="请选择住院信息字段"
              style="width:100%;"
              :options="recordSelectOptions"
              v-model="info.field.value"
              @change="changeRelaAndTarget(info.field, index)">
            </el-cascader>
          </div>
          <!-- 第二步：选择关系（等于大于小于包含不包含） -->
          <div class="case">
            <el-select
              v-model="info.relation.value"
              placeholder="请选择住院信息筛选"
              v-if="info.relation.type !== ''">
              <el-option
                v-for="item in (relationOptions.find((n) => n.type.includes(info.relation.type))).typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- 第三步：选择目标值 -->
          <div class="case">
            <!-- 文本 -->
            <el-input
              placeholder="请填写"
              style="width:95%;"
              v-if="relationOptions[0].type.includes(info.target.type)"
              v-model="info.target.value">
            </el-input>
            <!-- 单选 -->
            <el-select
              collapse-tags
              :allow-create="info.target.type === 'RADIOTEXT' || info.target.type === 'CHECKBOXTEXT'"
              :filterable="info.target.type === 'RADIOTEXT' || info.target.type === 'CHECKBOXTEXT'"
              :multiple="info.target.type === 'CHECKBOX' || info.target.type === 'SELECTMUTIPLE' || info.target.type === 'CHECKBOXTEXT'"
              style="width:95%;"
              v-model="info.target.value"
              :placeholder="'请选择' + ((info.target.type === 'RADIOTEXT' || info.target.type === 'CHECKBOXTEXT') ? '(或输入)' : '') + ((info.target.type === 'CHECKBOX' || info.target.type === 'SELECTMUTIPLE' || info.target.type === 'CHECKBOXTEXT') ? '(可多选)' : '')"
              v-if="relationOptions[1].type.includes(info.target.type) || relationOptions[2].type.includes(info.target.type)">
              <el-option
                v-for="item in info.target.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- 级联 -->
            <el-cascader
              style="width:95%;"
              v-if="relationOptions[3].type.includes(info.target.type)"
              :options="info.target.options"
              placeholder="请选择"
              v-model="info.target.value">
            </el-cascader>
            <!-- 时间 -->
            <el-date-picker
              value-format="yyyy-MM-dd"
              style="width:95%;"
              v-if="relationOptions[4].type.includes(info.target.type)"
              v-model="info.target.value"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <!-- 时间日期 -->
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:95%;"
              v-if="relationOptions[5].type.includes(info.target.type)"
              v-model="info.target.value"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div class="add-case">
            <el-button type="text" size="mini" class="ercp-icon-general-decrease" @click="deleteOne(1, index)"></el-button>
            <el-button type="text" size="mini" class="ercp-icon-general-append" @click="addOne(1)"></el-button>
          </div>
        </div>
        <div class="other-info-filter">
          <div class="case1">
            <span class="light-text">手术日期</span>
            <el-date-picker
              v-model="operateTime"
              type="daterange"
              range-separator="至"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="case2">
            <span class="light-text">出院日期</span>
            <el-date-picker
              v-model="leaveTime"
              type="daterange"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="operate-space">
          <el-button type="primary" size="medium" @click="searchCase">开始检索</el-button>
          <span class="match-cases-len" v-if="afterFilter">经检索,共有
            <span class="primary-text">{{Object.keys(matchCases).length}}</span>
            条符合筛选条件的记录
          </span>
        </div>
      </div>
      <div class="filter-tree filter-cases">
        <div class="choosen-wrapper" v-if="fieldsData.length > 0">
          <!-- 已选中{{choosenPhase.length}}个阶段
          <br> -->
          已选中{{choosenField.length}}个字段
        </div>
        <el-tree
          accordion
          :data="fieldsData"
          @check-change="getCheckNodes"
          show-checkbox
          :default-expand-all=false
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          empty-text="loading">
          <span class="custom-tree-node" style="font-size:13px;" slot-scope="{ node, data }">
            <span>{{data.label}}{{data.type}}</span>
          </span>
        </el-tree>
      </div>
      <div class="operate-space">
        <el-input type="text" size="medium" style="width: 260px;" v-model="exportName" placeholder="输入文件名"></el-input>
        <el-button type="primary" size="medium" @click="makeFile"
          :disabled="!ableCreate">
          生成文件
        </el-button>
      </div>
      <div class="operate-space">
        <el-select v-model="thisFile" placeholder="请选择">
          <el-option
            v-for="item in fileLists"
            :disabled="item.process !== 100"
            :key="item.file_id"
            :label="item.file_name"
            :value="item.file_id">
          </el-option>
        </el-select>
        <el-button class="el-icon-refresh" @click="getFileLists" type="primary" size="medium"></el-button>
        <el-button type="primary" size="medium" @click="downLoadFile" style="margin-left:0px;">
          导出文件
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {addressData} from '../../../data/address/addressData'
import {getAllFormTemplates} from '../../../api/patient/patient.js'
import {filterPaient, createFile, fileLists, downFile} from '../../../api/project/project.js'
export default {
  name: 'Project_detail_member',
  data () {
    return {
      // tableData2: [],
      // 分页信息
      // pageSize: 10,
      // currentPage: 1,
      // total: 0,
      // addCase: true,
      // 住院记录以及自增模板
      hospitalRecords: [],
      hospitalExample: {
        field: {
          value: [],
          options: []
        },
        relation: {
          value: '',
          options: [],
          type: ''
        },
        target: {
          value: '',
          options: [],
          type: ''
        }
      },
      // 基本信息以及自增模板
      basicInfomations: [],
      basicExample: {
        field: {
          value: [],
          options: [
            {
              label: '基本信息',
              value: 'basic',
              children: [
                {label: '性别', value: 'gender'},
                {label: '民族', value: 'nation'},
                {label: '常住地址', value: 'address'}
              ]
            }
          ],
          type: ''
        },
        relation: {
          value: '',
          options: [
            {label: '等于', value: 'equal'}
            // {label: '不等于', value: 'unequal'}
          ],
          type: ''
        },
        target: {
          value: [],
          options: [],
          type: ''
        }
      },
      // 地址选项
      addressOption: [],
      // 表单的所有字段的模板
      recordTemplates: [],
      // 住院信息字段级联模板
      recordSelectOptions: [],
      // 大小关系模板
      relationOptions: [
        // 文本单选
        {
          type: ['INPUT', 'TEXTAREA', 'CALCULATE', 'INT', 'DOUBLE'],
          typeOptions: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'not_equal'},
            {label: '大于', value: 'greater_than'},
            {label: '小于', value: 'less_than'},
            {label: '小于等于', value: 'less_than_or_eq'},
            {label: '大于等于', value: 'greater_than_or_eq'}
          ]
        },
        // 选项
        {
          type: ['RADIO', 'SELECT', 'RADIOTEXT'],
          typeOptions: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'not_equal'}
          ]
        },
        // 多选系列，值为文本
        {
          type: ['CHECKBOX', 'SELECTMUTIPLE', 'CHECKBOXTEXT'],
          typeOptions: [
            {label: '包含', value: 'has_all_of'},
            {label: '不包含', value: 'hase_none_of'}
          ]
        },
        // 级联
        {
          type: ['CASCADER'],
          typeOptions: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'not_equal'}
          ]
        },
        // 日期
        {
          type: ['DATE'],
          typeOptions: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'not_equal'},
            {label: '大于', value: 'greater_than'},
            {label: '小于', value: 'less_than'},
            {label: '小于等于', value: 'less_than_or_eq'},
            {label: '大于等于', value: 'greater_than_or_eq'}
          ]
        },
        // 日期时间
        {
          type: ['DATETIME'],
          typeOptions: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'not_equal'},
            {label: '大于', value: 'greater_than'},
            {label: '小于', value: 'less_than'},
            {label: '小于等于', value: 'less_than_or_eq'},
            {label: '大于等于', value: 'greater_than_or_eq'}
          ]
        }
      ],
      // 手术日期以及出院日期
      leaveTime: [],
      operateTime: [],
      filterCases: [],
      // 选择要导出的字段
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 字段(住院记录+随访+基本情况)
      fieldsData: [],
      // 选中
      choosenData: [],
      // 选中字段和phase
      choosenField: [],
      choosenPhase: [],
      // 检索后符合条件的记录
      matchCases: [],
      afterFilter: false,
      exportName: '',
      // 文件列表
      fileLists: [],
      thisFile: ''
    }
  },
  mounted () {
    this.addressOption = addressData
    this.getFormTemplate()
    this.initComponent(this.hospitalRecords, this.hospitalExample)
    this.initComponent(this.basicInfomations, this.basicExample)
    this.getFileLists()
  },
  methods: {
    // 获取表单模板
    async getFormTemplate () {
      let response = await getAllFormTemplates()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.recordTemplates = response.data.entity
        this.initFieldOptions()
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 根据筛选条件获取符合条件的记录
    async filterPaients (info) {
      let response = await filterPaient(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        let inclusion = response.data.entity
        this.matchCases = Object.assign({}, inclusion)
        this.afterFilter = true
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 开始生成文件
    async beginCreate (data) {
      let response = await createFile(data)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 获取当前用户已生成的文件列表
    async getFileLists () {
      let response = await fileLists()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.fileLists = response.data.entity.reverse().splice(0, 6)
        this.thisFile = this.fileLists.length > 0 ? this.fileLists[0].file_id : ''
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 下载文件
    async downLoadFile () {
      let info = {}
      let file = this.fileLists.find((n) => n.file_id === this.thisFile)
      if (file !== undefined) {
        info = Object.assign({}, {
          fileId: file.file_id,
          fileName: file.file_name
        })
        let response = await downFile(info)
        let url = window.URL.createObjectURL(response.data)
        let a = document.createElement('a')
        a.href = url
        a.download = file.file_name + '.zip'
        console.log(a)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else {
        this.$message.info('请选择要导出的文件')
      }
    },
    // 初始化住院信息的级联模板
    initFieldOptions () {
      let arr = [...this.recordTemplates]
      let arr2 = [
        {value: '住院基本情况', label: '住院基本情况', phase: '住院基本情况', children: []},
        {value: '术前', label: '术前', phase: '术前', children: []},
        {value: '术中', label: '术中', phase: '术中', children: []},
        {value: '术后', label: '术后', phase: '术后', children: []},
        {value: '出院综合评估', label: '出院综合评估', phase: '出院综合评估', children: []},
        {value: '随访', label: '随访', phase: '随访', children: []}
      ]
      arr.forEach((module, index) => {
        if (module.isStatic === true) {
          arr.splice(index, 1)
        }
      })
      arr.forEach((module) => {
        module.label = module.name
        module.value = module.id
        module.treeNode = module.id
        if (module.fields.length > 0) {
          module.children = module.fields
          module.children.forEach((field, index3) => {
            if (field.type === 'RADIO' && !field.values) {
              module.children.splice(index3, 1)
            }
          })
          module.children.forEach((field, index2, arr) => {
            field.phase = module.phase
            field.value = field.id
            field.treeNode = module.treeNode + '.' + field.id
            field.reference = field.values !== undefined ? field.values : (field.children === undefined ? [] : field.children)
            if (field.subFields && field.subFields.length > 0 && field.type !== 'TABLE') {
              field.children = field.subFields
              field.children.forEach((subField) => {
                subField.phase = module.phase
                subField.value = subField.id
                subField.reference = subField.values === undefined ? (subField.children === undefined ? [] : subField.children) : subField.values
                subField.children = null
                subField.treeNode = field.treeNode + '.' + subField.id
              })
            } else {
              field.children = null
            }
          })
        }
        arr2.forEach((item) => {
          if (item.value === module.phase) {
            item.children.push(module)
          }
        })
      })
      this.recordSelectOptions = [...arr2]
      this.fieldsData = [...arr2]
      // this.fieldsData.unshift(this.basicExample.field.options[0])
      console.log(arr2)
    },
    // 住院信息级联选项更改=>改变后面的大小关系以及目标值
    changeRelaAndTarget (arr, index) {
      let arrLen = arr.value
      if (arrLen.length === 0) {
        this.hospitalRecords[index].relation = {value: '', options: [], type: ''}
        this.hospitalRecords[index].target.type = {value: '', options: [], type: ''}
      } else {
        let module = this.recordTemplates.find((n) => n.id === arrLen[1])
        if (module) {
          let field = module.fields.find((n) => n.id === arrLen[2])
          this.hospitalRecords[index].relation = {value: '', options: [], type: field.type}
          this.hospitalRecords[index].target = {value: '', options: field.reference, type: field.type}
          if (this.relationOptions[3].type.includes(field.type)) {
            this.hospitalRecords[index].target.value = []
          }
          if (field.children) {
            let subField = field.children.find((n) => n.id === arrLen[3])
            this.hospitalRecords[index].relation = {value: '', options: [], type: subField.type}
            this.hospitalRecords[index].target = {value: '', options: subField.reference, type: subField.type}
            if (this.relationOptions[3].type.includes(subField.type)) {
              this.hospitalRecords[index].target.value = []
            }
          }
        }
      }
    },
    // 基本信息级联选项更改=>改变后面的大小关系以及目标值
    changeRelaAndTarget2 (arr, index) {
      this.basicInfomations[index].target.value = ''
      this.basicInfomations[index].relation.value = ''
      let field = arr.value[1]
      if (field === 'gender') {
        this.basicInfomations[index].target.options = [
          {label: '男', value: 1},
          {label: '女', value: 0}
        ]
      } else if (field === 'address') {
        this.basicInfomations[index].target.value = []
        this.basicInfomations[index].target.options = addressData
      } else if (field === 'nation') {
        this.basicInfomations[index].target.options = [
          {label: '汉族', value: '汉族'},
          {label: '回族', value: '回族'},
          {label: '藏族', value: '藏族'}
        ]
      }
    },
    // 模板的自增以及初始化
    initComponent (array, item) {
      let obj = Object.assign({}, item)
      array.push(obj)
    },
    addOne (index) {
      if (index === 1) {
        if (this.hospitalRecordsAble) {
          this.initComponent(this.hospitalRecords, this.hospitalExample)
        } else {
          this.$message.info('请先填写完毕当前一组住院记录筛选条件再新增')
        }
      } else {
        if (this.basicInfomations.length >= 3) {
          this.$message.info('基本信息最多筛选三条不重复且不冲突的条件')
        } else if (this.basicInfoAble) {
          this.initComponent(this.basicInfomations, this.basicExample)
        } else {
          this.$message.info('请先填写完毕当前一组基本信息筛选条件再新增')
        }
      }
    },
    deleteOne (index, rowIndex) {
      if (index === 1) {
        if (this.hospitalRecords.length > 1) {
          this.hospitalRecords.splice(rowIndex, 1)
        } else {
          this.$message.info('不能再删除了')
        }
      } else {
        if (this.basicInfomations.length > 1) {
          this.basicInfomations.splice(rowIndex, 1)
        } else {
          this.$message.info('不能再删除了')
        }
      }
    },
    // 检索案例
    searchCase () {
      let basicArr = []
      // 筛选完整的有效的信息
      this.basicInfomations.forEach((item) => {
        let flag = true
        for (let key in item) {
          console.log(item[key])
          if (item[key].value === '' || item[key].value === []) {
            flag = false
          } else {
          }
        }
        if (flag) {
          basicArr.push(item)
        } else {
        }
      })
      console.log(basicArr)
      let recordArr = []
      // 筛选完整的有效的信息
      this.hospitalRecords.forEach((item) => {
        let flag = true
        for (let key in item) {
          if (item[key].value === '' || item[key].value === []) {
            flag = false
          } else {
          }
        }
        if (flag) {
          recordArr.push(item)
        }
      })
      console.log(recordArr)
      let obj = {
        '住院基本情况': {},
        '术前': {},
        '术中': {},
        '术后': {},
        '出院综合评估': {},
        '随访': {}
      }
      recordArr.forEach((record) => {
        for (let key in obj) {
          if (record.field.value[0] === key) {
            let key2 = record.field.value[1] + '.' + record.field.value[record.field.value.length - 1]
            obj[key][key2] = {
              type: record.relation.value,
              value: record.target.value
            }
          }
        }
      })
      if (this.leaveTime && this.leaveTime.length > 0) {
        obj['出院综合评估']['comprehensiveAssessment.dischargeDate'] = {
          type: 'between',
          value1: this.leaveTime[0],
          value2: this.leaveTime[1]
        }
      }
      if (this.operateTime && this.operateTime.length > 0) {
        let obj2 = {
          type: 'between',
          value1: this.operateTime[0],
          value2: this.operateTime[1]
        }
        obj['术前']['header.operationDate'] = obj2
        obj['术中']['header.operationDate'] = obj2
        obj['术后']['header.operationDate'] = obj2
      }
      let text = ''
      basicArr.forEach((basic) => {
        if (basic.field.value[1] === 'gender' && text.indexOf('gender') < 0) {
          text += '&gender=' + basic.target.value
        } else if (basic.field.value[1] === 'nation' && text.indexOf('nation') < 0) {
          text += '&ethnic=' + basic.target.value
        } else if (basic.field.value[1] === 'address' && text.indexOf('address') < 0) {
          text += '&address=' + basic.target.value[basic.target.value.length - 1]
        }
      })
      console.log(text)
      console.log(obj)
      let info = {
        basic: text,
        record: obj
      }
      this.filterPaients(info)
    },
    // 获取选中的节点
    getCheckNodes () {
      this.choosenData = this.$refs.tree.getCheckedNodes(true)
      let phases = []
      let fieldArr = []
      this.choosenData.forEach((item, index) => {
        if (item.phase === undefined) {
          console.log(item)
        }
        if (phases.indexOf(item.phase) < 0) {
          phases.push(item.phase)
        }
        if (item.treeNode) {
          fieldArr.push(item.treeNode)
        } else {
          fieldArr.push(item.id)
        }
      })
      console.log(phases)
      console.log(fieldArr)
      this.choosenPhase = [...phases]
      this.choosenField = [...fieldArr]
    },
    // 文件生成
    makeFile () {
      let inclusion = Object.assign({}, this.matchCases)
      let fields = this.choosenField
      let phases = this.choosenPhase
      let body = {
        'inclusion': inclusion,
        'fields': fields,
        'phases': phases
      }
      let name = this.exportName
      let data = {
        'body': body,
        'name': name
      }
      if (this.fileLists.find((n) => n.file_name === data.name) !== undefined) {
        this.$message.info('该文件名已存在,请输入其他文件名以区别')
      } else {
        this.beginCreate(data)
        this.getFileLists()
      }
    }
  },
  watch: {
    hospitalRecords: {
      handler: function (list) {
        console.log(list)
        this.hospitalExample = {
          field: {value: [], options: []},
          relation: {value: '', options: [], type: ''},
          target: {value: '', options: [], type: ''}
        }
        // 判断是否可以再增
        let flag = true
        list.forEach((item) => {
          for (let key in item) {
            if (item[key].value === '' || item[key].value === []) {
              flag = false
            }
          }
        })
        this.hospitalRecordsAble = flag
      },
      deep: true
    },
    basicInfomations: {
      handler: function (list) {
        console.log(list)
        this.basicExample = {
          field: {
            value: [],
            options: [
              {
                label: '基本信息',
                value: 'basic',
                phase: '基本信息',
                id: '基本信息',
                children: [
                  {label: '性别', value: 'gender', id: 'gender', phase: '基本信息'},
                  {label: '民族', value: 'nation', id: 'nation', phase: '基本信息'},
                  {label: '常住地址', value: 'address', id: 'address', phase: '基本信息'}
                ]
              }
            ],
            type: ''
          },
          relation: {
            value: '',
            options: [
              {label: '等于', value: 'equal'}
            ],
            type: ''
          },
          target: {
            value: [],
            options: [],
            type: ''
          }
        }
        let flag = true
        list.forEach((item) => {
          for (let key in item) {
            if (item[key].value === '' || item[key].value === []) {
              flag = false
            }
          }
        })
        this.basicInfoAble = flag
      },
      deep: true
    }
  },
  computed: {
    ableCreate: {
      get: function () {
        if (this.exportName !== '' && Object.keys(this.matchCases).length > 0 && this.choosenData.length > 0) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/variable';
  #project-member{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:16px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    .filter{
      width:100%;
      height:100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      transition: all .5s linear;
      background-color: #fff;
      overflow: auto;
      .filter-head{
        height: 48px;
        // width: 100%;
        box-sizing: border-box;
        line-height: 48px;
        text-align: left;
        margin: 0;
        padding: 0 16px;
        font-weight: 900;
        background: #E8E9EA;
        position: relative;
        .ercp-icon-general-next{
          transform: rotate(90deg);
          cursor: pointer;
          position: absolute;
          right: 16px;
        }
      }
      .filter-condition{
        background-color: #fff;
        box-sizing: border-box;
        margin:0;
        max-height: 523px;
        overflow: auto;
        .basic-info-filter, .record-info-filter, .other-info-filter, .operate-space{
          min-height: 50px;
          line-height: 50px;
          padding: 0 8px;
          box-sizing: border-box;
          margin: 8px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-radius: 3px;
          justify-content: center;
          .light-text{
            margin: 0 10px;
          }
          .case{
            flex: 1;
            margin-left: 10px;
            div{
              width: 100%;
            }
          }
          .case:nth-of-type(1){
            flex: 2;
            margin-left: 0;
          }
          .add-case{
            width: 80px;
            text-align: center;
          }
        }
        .basic-info-filter:hover, .record-info-filter:hover, .other-info-filter:hover{
          background-color: #F3F4F5;
        }
        .other-info-filter{
          display: block;
          font-size: 15px;
        }
      }
      .operate-space{
        text-align: center;
        margin: 8px 0;
        .match-cases-len{
          margin-left: 20px;
        }
        .match-cases-len:hover{
          cursor: pointer;
        }
      }
      .filter-cases{
        border-radius: 2px;
        background-color: #fff;
        box-sizing: border-box;
        margin: 0 16px;
        flex: 1;
        // height: calc(100% - 400px);
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        z-index: 1;
        border: 1px dotted #dfdfff;
        padding: 8px;
        box-sizing: border-box;
        border-radius: 5px;
        .el-tree{
          z-index: 1;
          background-color: transparent;
        }
        .choosen-wrapper{
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: 900;
          // filter: blur(1px);
          z-index: -1;
          color: #ccc;
          background-color: #fff;
        }
      }
    }
  }
</style>
