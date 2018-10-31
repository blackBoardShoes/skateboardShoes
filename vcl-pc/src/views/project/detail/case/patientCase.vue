<template>
  <div id="project-member">
    <div class="operate-buttons align-right">
      <el-button size="medium" type="primary" @click="clear">清空记录</el-button>
      <el-button size="medium" type="primary" @click="add">添加记录</el-button>
    </div>
    <div class="project-info">
      <el-table
        class="absolute-table"
        :data="tableData"
        height="100%"
        style="width: 100%"
        size="medium"
        fit>
        <el-table-column
          prop="hospNum"
          align="center"
          label="住院号">
        </el-table-column>
        <el-table-column
          prop="serialNum"
          align="center"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="gender"
          align="center"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="dischargeStatus"
          align="center"
          label="出院状态">
        </el-table-column>
        <el-table-column
          prop="joinTime"
          align="center"
          label="入组日期">
        </el-table-column>
        <el-table-column
          prop="operate"
          align="center"
          label="操作"
          fixed="right"
          width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain @click="viewCase(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination align-right">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 15, 20]"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change= "SizeChange"
        @current-change = "changePage"
      >
      </el-pagination>
    </div>
    <div :class="{'filter': true, 'filter-disapper': !addCase}">
      <div class="filter-head">设置入组条件 <span class="ercp-icon-general-next" @click="addCase = false"></span> </div>
      <div class="filter-condition">
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
              placeholder="请填写住院信息目标值"
              style="width:95%;"
              v-if="relationOptions[0].type.includes(info.target.type)"
              v-model="info.target.value">
            </el-input>
            <!-- 单选 -->
            <el-select
              v-model="info.target.value"
              placeholder="请选择住院信息目标值"
              v-if="relationOptions[1].type.includes(info.target.type)">
              <el-option
                v-for="item in info.target.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- 级联 -->
            <el-cascader
              v-if="relationOptions[3].type.includes(info.target.type)"
              :options="info.target.options"
              placeholder="请选择住院信息目标值"
              v-model="info.target.value">
            </el-cascader>
            <!-- 时间 -->
            <el-date-picker
              value-format="yyyy-MM-dd"
              style="width:100%;"
              v-if="relationOptions[4].type.includes(info.target.type)"
              v-model="info.target.value"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <!-- 时间日期 -->
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:100%;"
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
              v-if="record.field.value[1] === 'dizhi'"
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
        <div class="other-info-filter">
          <div class="case1">
            <span class="light-text">手术日期</span>
            <el-date-picker
              v-model="operateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="case2">
            <span class="light-text">出院日期</span>
            <el-date-picker
              v-model="leaveTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="operate-space">
          <el-button type="primary" size="medium">开始检索</el-button>
          <el-button type="primary" size="medium">全部入组</el-button>
        </div>
      </div>
      <div class="filter-cases">
        <el-table
          class="absolute-table"
          :data="tableData2"
          height="100%"
          style="width: 100%"
          size="medium"
          border
          fit>
          <el-table-column
            prop="hospNum"
            align="center"
            label="住院号">
          </el-table-column>
          <el-table-column
            prop="serialNum"
            align="center"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="gender"
            align="center"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="dischargeStatus"
            align="center"
            label="出院状态">
          </el-table-column>
          <el-table-column
            prop="joinTime"
            align="center"
            label="入组日期">
          </el-table-column>
          <el-table-column
            prop="operate"
            align="center"
            label="操作"
            fixed="right"
            width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="small" plain @click="viewCase(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination align-right">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 15, 20]"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @size-change= "SizeChange"
          @current-change = "changePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {addressData} from '../../../../data/address/addressData'
import {getAllFormTemplates} from '../../../../api/patient/patient.js'
export default {
  name: 'Project_detail_member',
  data () {
    return {
      tableData: [
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '健康',
          joinTime: '2018-09-10'
        },
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '不健康',
          joinTime: '2018-09-10'
        },
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '健康',
          joinTime: '2018-09-10'
        },
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '健康',
          joinTime: '2018-09-10'
        }
      ],
      tableData2: [],
      // 分页信息
      pageSize: 10,
      currentPage: 1,
      total: 40,
      addCase: true,
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
                {label: '常住地址', value: 'dizhi'}
              ]
            }
          ],
          type: ''
        },
        relation: {
          value: '',
          options: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'unequal'}
          ],
          type: ''
        },
        target: {
          value: [],
          options: [],
          type: ''
        }
      },
      addressOption: [],
      recordTemplates: [],
      recordSelectOptions: [],
      relationOptions: [
        // 文本单选
        {
          type: ['INPUT', 'TEXTAREA', 'CALCULATE', 'INT', 'DOUBLE', 'RADIOTEXT'],
          typeOptions: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'unequal'},
            {label: '大于', value: 'morethan'},
            {label: '小于', value: 'lessthan'}
          ]
        },
        // 选项
        {
          type: ['RADIO', 'SELECT'],
          typeOptions: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'unequal'}
          ]
        },
        // 多选系列，值为文本
        {
          type: ['CHECKBOX', 'SELECTMUTIPLE', 'CHECKBOXTEXT'],
          typeOptions: [
            {label: '等于', value: 'equal'}
          ]
        },
        // 级联
        {
          type: ['CASCADER'],
          typeOptions: [
            {label: '等于', value: 'equal'}
          ]
        },
        // 日期
        {
          type: ['DATE'],
          typeOptions: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'unequal'},
            {label: '大于', value: 'morethan'},
            {label: '小于', value: 'lessthan'}
          ]
        },
        // 日期时间
        {
          type: ['DATETIME'],
          typeOptions: [
            {label: '等于', value: 'equal'},
            {label: '不等于', value: 'unequal'},
            {label: '大于', value: 'morethan'},
            {label: '小于', value: 'lessthan'}
          ]
        }
      ],
      leaveTime: [],
      operateTime: []
    }
  },
  mounted () {
    this.addressOption = addressData
    this.getFormTemplate()
    this.initComponent(this.hospitalRecords, this.hospitalExample)
    this.initComponent(this.basicInfomations, this.basicExample)
  },
  methods: {
    viewCase (value) {
      this.$message.warning('查看的是' + value.name)
    },
    // 列表页码信息
    SizeChange (size) {
      console.log(size)
      // this.getProject(size, this.currentPage)
    },
    changePage (page) {
      console.log(page)
      // this.getProject(this.pageSize, page)
    },
    add () {
      this.addCase = true
    },
    clear () {
      this.$message.warning('清空案例')
    },
    // 以下为筛选条件的代码区域
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
    initFieldOptions () {
      let arr = this.recordTemplates
      let arr2 = [
        {value: '住院基本情况', label: '住院基本情况', children: []},
        {value: '术前', label: '术前', children: []},
        {value: '术中', label: '术中', children: []},
        {value: '术后', label: '术后', children: []},
        {value: '出院综合评估', label: '出院综合评估', children: []}
      ]
      arr.forEach((module) => {
        module.label = module.name
        module.value = module.id
        if (module.fields) {
          module.children = module.fields
          module.children.forEach((field) => {
            field.value = field.id
            field.reference = field.values === undefined ? [] : field.values
            if (field.subFields.length > 0) {
              field.children = field.subFields
              field.children.forEach((subField) => {
                subField.value = subField.id
                subField.reference = subField.values === undefined ? [] : subField.values
                subField.children = null
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
      this.recordSelectOptions = arr2
    },
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
          this.hospitalRecords[index].target = {value: '', options: field.values || field.children, type: field.type}
          if (this.relationOptions[3].type.includes(field.type)) {
            this.hospitalRecords[index].target.value = []
          }
          if (field.children) {
            let subField = field.children.find((n) => n.id === arrLen[3])
            this.hospitalRecords[index].relation = {value: '', options: [], type: subField.type}
            this.hospitalRecords[index].target = {value: '', options: subField.values || subField.children, type: subField.type}
            if (this.relationOptions[3].type.includes(subField.type)) {
              this.hospitalRecords[index].target.value = []
            }
          }
        }
      }
    },
    changeRelaAndTarget2 (arr, index) {
      this.basicInfomations[index].target.value = ''
      this.basicInfomations[index].relation.value = ''
      let field = arr.value[1]
      if (field === 'gender') {
        this.basicInfomations[index].target.options = [
          {label: '男', value: 1},
          {label: '女', value: 0}
        ]
      } else if (field === 'dizhi') {
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
        if (this.basicInfoAble) {
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
    }
  },
  watch: {
    hospitalRecords: {
      handler: function (list) {
        console.log(list)
        this.hospitalExample = {
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
        }
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
                children: [
                  {label: '性别', value: 'gender'},
                  {label: '民族', value: 'nation'},
                  {label: '常住地址', value: 'dizhi'}
                ]
              }
            ],
            type: ''
          },
          relation: {
            value: '',
            options: [
              {label: '等于', value: 'equal'},
              {label: '不等于', value: 'unequal'}
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
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/variable';
  #project-member{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:16px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    .operate-buttons{
      // height: 40px;
      min-height: 40px;
      line-height: 40px;
      padding:10px 0;
    }
    .project-info{
      flex: 1;
      position: relative;
    }
    .pagination{
      margin-top: 10px;
      min-height: 30px;
      line-height: 30px;
    }
    .filter-disapper{
      // height: 0 !important;
      top: 100vh !important;
      transition: all .5s linear;
    }
    .filter{
      // opacity: 1;
      position: absolute;
      background-color: #fff;
      // min-height: 350px;
      z-index: 111;
      // width: 100%;
      // height: 100%;
      box-sizing: border-box;
      top: 16px;
      left: 16px;
      right: 16px;
      bottom: 16px;
      // top: 0;
      // height: 500px;
      display: flex;
      flex-direction: column;
      transition: all .5s linear;
      background-color: #fff;
      overflow: hidden;
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
        // flex: 1;
        background-color: #fff;
        box-sizing: border-box;
        // width: 100%;
        // min-height: 220px;
        max-height: 356px;
        overflow: auto;
        margin:0;
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
            // text-align: center;
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
        }
        .operate-space{
          text-align: center;
        }
      }
      .filter-cases{
        flex: 1;
        box-sizing: border-box;
        margin: 0 8px;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
      }
    }
  }
</style>
