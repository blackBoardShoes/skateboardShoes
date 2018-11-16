<template>
  <div class="rulesAll">
    <div class="rulesContent">
      <!-- <div class="rulesTop">
        tubiao
      </div> -->
      <!-- <div class="controlContent">
        <el-button type="primary" @click="openCreateFish" v-if="[5, 6].includes(user.codetype)">新增</el-button>
        <el-button type="primary" @click="updateFish">更新</el-button>
      </div> -->
      <div class="rulesContain">
        <div class="rulesContainTop">
          <div
            :class="{rulesContainTopItem: true, activeIndex: activeIndex === index}"
            @click="containTopControl(item, index)"
            v-for="(item, index) in rulesContainTop"
            :key="index">
            <div style="font-weight: bold;">
              <i :class="item.icon"></i>&nbsp;
              {{item.title}}
            </div>
            <div>
              <font style="font-weight: bold">{{rulesContainTopModel[item.key]}}</font> 人次
            </div>
          </div>
        </div>
        <div class="rulesContainContent">
          <el-row style="margin-bottom: 8px;" type="flex" justify="space-between">
            <el-col :span="6">
              <el-input
                @keyup.enter.native="lookupFormInput"
                placeholder="姓名/住院编号"
                v-model="lookupFormInputData"
                clearable
                prefix-icon="el-icon-search"></el-input>
            </el-col>
            <el-button type="primary" @click="openCreateFish" v-if="[5, 6].includes(user.codetype)">新增</el-button>
          </el-row>
          <sx-min-table
            :mozhu="mozhu"
            :tableData="tableData"
            :filterHandler="filterHandler"
            @operateClick="operateClick"
            :filterBtn="filterBtn"
            ></sx-min-table>
          <div style="text-align: right;margin-top:15px;">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :total="rulesContainTopModel[rulesContainTop[activeIndex].key]"
              :page-sizes="[5, 10, 15]"
              :current-page="currentPage"
              :page-size="perPage"
              @size-change="pageSize"
              @current-change="changePage"></el-pagination>
          </div>
        </div>
      </div>
      <!-- <router-link :to="{ name: 'sh', params: { data: JSON.stringify({a: 1}) }}">sh</router-link> -->
    </div>
    <el-dialog
      title='住院记录/手术记录'
      append-to-body
      modal-append-to-body
      :close-on-click-modal="false"
      v-if="dialogVisible"
      :visible.sync="dialogVisible">
      <el-form :model="ruleForm" ref="ruleForm" :disabled="ruleFormTF" label-width="138px" size="mini" label-position="left" class="ruleForm">
        <div style="padding-left: 60px;padding-right: 39px;">
          <el-form-item label="住院号" prop="patientId" :rules="[
            { required: true, message: '请输入病人住院号', trigger: 'change'},
            { pattern: '^[0-9]{11}$', message: '11位', trigger: 'change' }]">
            <el-input v-model="ruleForm.patientId" @blur="patientIdCheckUp" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="patientName" :rules="[
            { required: true, message: '请输入组件标签名', trigger: 'change' }]">
            <el-input v-model="ruleForm.patientName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender" :rules="[
            { required: true, message: '请选择性别', trigger: 'change' }]">
            <el-select v-model="ruleForm.gender" style="width:100%">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <sx-min-form
        submitTF
        ref="thatFormPreview" v-model="thatFishData" :mozhu="thatFish"
        @consoleData="createFish" ></sx-min-form>
    </el-dialog>
    <el-dialog
      title='新增患者'
      width="60%"
      append-to-body
      v-if="patientDialogVisible"
      modal-append-to-body
      :close-on-click-modal="false"
      :visible.sync="patientDialogVisible">
      <sx-min-form
        submitTF
        ref="thatFormPreview" v-model="patientData" :mozhu="patientFish"
        @consoleData="createPatientFish" ></sx-min-form>
    </el-dialog>
  </div>
</template>

<script>
import { charts } from '../../data/chartTemplates/chart'
import { mapState } from 'vuex'
import sxMinTable from '../../components/dynamicForm/minTable'
import { formdataDeleteId, formdataFollowingupLostcontact, record, formdataDelete, recordAllRecord, formdataRejectedFilledForm, formdataFinishedFilledForm, formdataUndoneFilledForm, formdataFollowUpFilledForm, patientGetPatientCount, patientAddPatient } from '../../api/rules/index.js'
import { addressData } from '../../data/address/addressData.js'
import { formdataSave } from '../../api/rules/lr.js'
export default {
  components: {
    sxMinTable
  },
  data () {
    return {
      optionA: [],
      thatFishData: {},
      thatFish: {
        fields: [
          // {
          //   id: 'patientId',
          //   label: '住院号',
          //   type: 'INPUT',
          //   validations: [
          //     { required: true, message: '请输入病人住院号', trigger: 'change' },
          //     { pattern: '^[0-9]{11}$', message: '11位', trigger: 'change' }
          //   ]
          // },
          // {
          //   id: 'patientName',
          //   label: '姓名',
          //   type: 'INPUT',
          //   validations: [
          //     { required: true, message: '请输入组件标签名', trigger: 'change' }
          //   ]
          // },
          // {
          //   id: 'gender',
          //   label: '性别',
          //   type: 'RADIO',
          //   values: [
          //     {value: 1, label: '男'},
          //     {value: 0, label: '女'}
          //   ],
          //   validations: [
          //     { required: true, message: '请选择性别', trigger: 'change' }
          //   ]
          // },
          {
            id: 'dept',
            label: '科室',
            type: 'SELECT',
            values: [
              {value: '外科一', label: '外科一'},
              {value: '外科二', label: '外科二'},
              {value: '特需外科', label: '特需外科'}
            ],
            validations: [
              { required: true, message: '请选择科室', trigger: 'change' }
            ]
          },
          {
            id: 'bedNum',
            label: '床号',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入床号', trigger: 'change' }
            ]
          },
          {
            id: 'inHospitalDate',
            label: '入院日期',
            type: 'DATE',
            validations: [
              { required: true, message: '请选择日期', trigger: 'change' }
            ]
          },
          {
            id: 'operationDate',
            label: '手术日期',
            type: 'DATE',
            validations: [
              { required: true, message: '请选择日期', trigger: 'change' }
            ]
          }
        ]
      },
      ruleForm: {
        patientId: '',
        patientName: '',
        gender: ''
      },
      ruleFormTF: false,
      rulesContainTop: [
        { title: '总表', key: 'AlltableColumn', icon: 'ercp-icon-module-task', codetype: [1, 2, 4, 5, 6] },
        { title: '待录入', key: 'pendingEntryColumn', icon: 'ercp-icon-general-edit', codetype: [1, 5, 6] },
        { title: '待审核', key: 'toBeAuditedColumn', icon: 'ercp-icon-general-audit', codetype: [1, 2, 4] },
        { title: '待修正', key: 'toBeAmendedColumn', icon: 'ercp-icon-general-correct', codetype: [1, 5, 6] },
        { title: '随访', key: 'followUpColumn', icon: 'ercp-icon-medicine-followup', codetype: [1, 2, 6] }
      ],
      rulesContainTopModel: {
        AlltableColumn: 0,
        pendingEntryColumn: 0,
        toBeAuditedColumn: 0,
        toBeAmendedColumn: 0,
        followUpColumn: 0
      },
      activeIndex: 1,
      activeRow: {},
      lookupFormInputData: '',
      currentPage: 1,
      perPage: 10,
      total: 0,
      mozhu: [],
      whatObj: {
        // 总表 ---> 住院号 编号 姓名 性别 入院日期 术前记录 术中记录 术后记录 是否纳入随访记录
        AlltableColumn: [
          { prop: 'patientId', label: '住院号', width: '90' },
          // { prop: 'operationNum', label: '编号' },
          { prop: 'patientName', label: '姓名', width: '90' },
          { prop: 'gender', label: '性别', width: '80', sortable: true },
          { prop: 'dept', label: '科室' },
          { prop: 'inHospitalDate', label: '入院日期' },
          { prop: '住院基本情况', label: '住院基本情况', width: '122' },
          { prop: '术前', label: '术前记录' },
          { prop: '术中', label: '术中记录' },
          { prop: '术后', label: '术后记录' },
          { prop: '出院综合评估', label: '出院综合评估', width: '122' },
          { option: true, label: '操作', contain: [{label: '查看'}], fixed: 'right' }
          // { prop: 'name', label: '是否纳入随访记录', width: '180', sortable: true, filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }] }
        ],
        // 待录入 ---> 住院号 编号 科室 床号 姓名 性别 数据阶段 记录者 操作 (编辑、删除)
        pendingEntryColumn: [
          { prop: 'patientId', label: '住院号', width: '90' },
          { prop: 'operationNum', label: '编号', width: '90' },
          { prop: 'patientName', label: '姓名', width: '90' },
          { prop: 'gender', label: '性别', width: '80', sortable: true },
          { prop: 'dept', label: '科室' },
          { prop: 'bedNum', label: '床号' },
          { prop: 'inHospitalDate', label: '入院日期' },
          { prop: 'operationDate', label: '手术日期' },
          { prop: 'phase', label: '数据阶段', sortable: true, width: '115' },
          { prop: 'responseName', label: '记录者', width: 100, sortable: true },
          { option: true, label: '操作', width: '130', contain: [{label: '编辑', hidden: true}, {label: '录入'}, {label: '删除', style: 'color: #FF455B'}] }
        ],
        // 待审核 ---> 住院号 编号 科室 床号 姓名 性别 数据阶段 记录者 操作 (审核
        toBeAuditedColumn: [
          { prop: 'patientId', label: '住院号', width: '90' },
          { prop: 'operationNum', label: '编号', width: '90' },
          { prop: 'patientName', label: '姓名', width: '90' },
          { prop: 'gender', label: '性别', width: '80', sortable: true },
          { prop: 'dept', label: '科室' },
          { prop: 'bedNum', label: '床号' },
          { prop: 'inHospitalDate', label: '入院日期' },
          { prop: 'operationDate', label: '手术日期' },
          { prop: 'phase', label: '数据阶段', sortable: true, width: 115 },
          { prop: 'responseName', label: '记录者', sortable: true, width: 100 },
          { option: true, label: '操作', contain: [{label: '审核'}] }
        ],
        // 待修正 ---> 住院号 编号 科室 床号 姓名 性别 数据阶段 记录者 操作 (编辑
        toBeAmendedColumn: [
          { prop: 'patientId', label: '住院号', width: '90' },
          { prop: 'operationNum', label: '编号', width: '90' },
          { prop: 'patientName', label: '姓名', width: '90' },
          { prop: 'gender', label: '性别', width: '80', sortable: true },
          { prop: 'dept', label: '科室' },
          { prop: 'bedNum', label: '床号' },
          { prop: 'inHospitalDate', label: '入院日期' },
          { prop: 'operationDate', label: '手术日期' },
          { prop: 'phase', label: '数据阶段', sortable: true, width: 115 },
          { prop: 'responseName', label: '记录者', sortable: true },
          { option: true, label: '操作', contain: [{label: '编辑'}] }
        ],
        // 随访 ---> 住院号 编号 姓名 性别 主管医生 术后诊断 出院日期 记录者 状态（待问询、已失访、待复查） 操作（编辑）
        followUpColumn: [
          { prop: 'patientId', label: '住院号', width: '90' },
          // { prop: 'operationNum', label: '编号' },
          { prop: 'patientName', label: '姓名', width: '90' },
          { prop: 'gender', label: '性别', width: '80', sortable: true },
          { prop: 'doctor', label: '主管医生' },
          // { prop: 'name', label: '术后诊断' },
          { prop: 'dischargeDate', label: '出院日期' },
          { prop: 'followUpDate', label: '随访日期' },
          { prop: 'responseName', label: '记录者' },
          { prop: 'isLostContact', label: '状态' },
          { option: true, label: '操作', contain: [{label: '查看', hidden: true, reverse: true}, {label: '失访', style: 'color: #878A8D', hidden: true}, {label: '编辑', hidden: true}, {label: '删除', hidden: true, style: 'color: #FF455B'}], width: 130 }
        ]
      },
      dialogVisible: false,
      patientDialogVisible: false,
      createFishOrEditFish: true,
      patientData: {},
      patientFish: {
        fields: [
          {
            id: 'hospitalId',
            label: '住院号',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入住院号', trigger: 'change' },
              { pattern: '^[0-9]{11}$', message: '11位', trigger: 'change' }
            ]
          },
          {
            id: 'name',
            label: '姓名',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入姓名', trigger: 'change' }
            ]
          },
          {
            id: 'gender',
            label: '性别',
            type: 'RADIO',
            values: [
              {value: 1, label: '男'},
              {value: 0, label: '女'}
            ],
            validations: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ]
          },
          {
            id: 'nation',
            label: '民族',
            type: 'RADIOTEXT',
            values: [
              {value: '汉族', label: '汉族'},
              {value: '回族', label: '回族'},
              {value: '藏族', label: '藏族'}
            ],
            validations: [
              { required: true, message: '请选择民族', trigger: 'change' }
            ]
          },
          {
            id: 'idCard',
            label: '身份证号',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入身份证号', trigger: 'change' },
              { pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/, message: '你输入的身份证不正确', trigger: 'change' }
            ]
          },
          {
            id: 'phoneNum',
            label: '联系方式',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入联系方式', trigger: 'change' },
              { pattern: /^\d{11}$/, message: '你输入的联系方式不正确', trigger: 'change' }
            ]
          },
          {
            id: 'provinceCityDistrict',
            label: '常居住地',
            type: 'CASCADER',
            children: addressData,
            validations: [
              { required: true, message: '请选择常居住地', trigger: 'change' }
            ]
          },
          {
            id: 'staAddress',
            label: '街道地址',
            type: 'INPUT',
            validations: [
              { required: true, message: '请输入街道地址', trigger: 'change' },
              { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'change' }
            ]
          }
        ],
        coordinate: {
          provinceCityDistrict: 50,
          staAddress: 50
        }
      },
      tableData: [],
      recordAllRecordTableData: [],
      pendingEntryColumnTableData: [],
      toBeAuditedColumnTableData: [],
      toBeAmendedColumnTableData: [],
      followUpColumnTableData: []
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  async created () {
    this.optionYY = charts[2]
    // 规则 a
    let a = {
      // 管理员 医生 无页面
      // 科研管理员 临床质控员 诊疗中心 科研护士
      // 1 - 6 codetype 总表 待录入 待审核 待修正 随访

      // 科研管理员 2（总表, 待审核）---> 1.任务概览：工作量统计 2.总表：查看 3.待审核 4.列表：分页及计数
      // 1.工作量统计：按日（最近10天）、按周（最近8周）、按月（最近一年）（手术、审核）
      // 2.总表查看：均为不可编辑状态
      // 3.待审核：点击跳转至对应页面
      // 4.驳回/审核通过后回到列表页

      // 临床质控员 4 （总表, 待审核) ---> 同上

      // 诊疗中心 5（总表, 待录入, 待修正) ---> 1.任务概览：工作量统计 2.总表：查看 3.待录入：编辑、删除 4.待修正：编辑 5.列表：分页及计数
      // "1.工作量统计：按日（最近10天）、按周（最近8周）、按月（最近一年）（手术、录入、修正）
      // 2.总表查看：已审核、待审核状态的为不可编辑状态，待录入、待修正部分为可编辑状态
      // 3.待录入/待修正编辑：跳转至对应位置，其他部分不可编辑状态
      // 4.删除：弹框确认
      // 5.提交后回到列表页"

      // 科研护士 6（总表, 待录入, 待修正, 随访） ---> 1.任务概览：工作量统计 2.总表：查看 3.待录入：编辑、删除 4.待修正：编辑 5.随访：编辑、删除 6.列表：分页及计数
      // "1.工作量统计：按日（最近10天）、按周（最近8周）、按月（最近一年）（录入、修正、随访）
      // 2.总表查看：已审核、待审核状态的为不可编辑状态，待录入、待修正部分为可编辑状态
      // 3.待录入/待修正编辑：跳转至对应位置，其他部分不可编辑状态
      // 4.随访编辑：跳转至对应页面
      // 5.删除：弹框确认
      // 6.提交后回到列表页"
    }
    console.log(a)
    console.log(this.user)
    this.init()
    await this.firstShow()
    this.show()
  },
  methods: {
    init () {
      // 角色 button 分配   this.user用户数据
      let topArr = []
      for (let i of this.rulesContainTop) {
        if (i['codetype']) {
          if (i['codetype'].includes(this.user.codetype)) {
            topArr.push(i)
          }
        }
      }
      console.log(topArr)
      this.rulesContainTop = [...topArr]
      // 中间数组 mozhu 默认值
      this.mozhu = [...this.whatObj[this.rulesContainTop[1].key]]
      this.activeRow = this.rulesContainTop[this.activeIndex]
    },
    containTopControl (row, index) {
      this.activeIndex = index
      this.activeRow = row
      this.mozhu = [...this.whatObj[row.key]]
      this.show()
      // this.tableData = []
      // this.$router.push({name: 'sh', params: { data: JSON.stringify({a: 1}) }})
    },
    async pageSize (val) {
      this.perPage = val
      await this.firstShow()
      this.show()
    },
    async changePage (val) {
      this.currentPage = val
      await this.firstShow()
      this.show()
    },
    async firstShow () {
      // table
      await this.recordAllRecordShowData()
      switch (this.user.type) {
        case '科研管理员':
        case '临床质控员':
          await this.formdataFinishedFilledFormShowData()
          await this.formdataFollowUpFilledFormShowData()
          // 总表, 待审核
          break
        case '诊疗中心':
          await this.formdataUndoneFilledFormShowData()
          await this.formdataRejectedFilledFormShowData()
          // 总表, 待录入, 待修正
          break
        case '科研护士':
          await this.formdataUndoneFilledFormShowData()
          await this.formdataRejectedFilledFormShowData()
          await this.formdataFollowUpFilledFormShowData()
          // 总表, 待录入, 待修正, 随访
          break
      }
      // let a = {
      //   AlltableColumn: this.recordAllRecordShowData(),
      //   pendingEntryColumn: this.formdataUndoneFilledFormShowData(),
      //   toBeAuditedColumn: this.formdataFinishedFilledFormShowData()
      // }
      // console.log(a)
    },
    async show () {
      // tableData
      console.log(this.activeRow.key, 'this.activeRow.key')
      this.tableData = []
      switch (this.activeRow.key) {
        case 'AlltableColumn':
          for (let i in this.recordAllRecordTableData) {
            this.$set(this.tableData, i, this.recordAllRecordTableData[i])
          }
          break
        case 'pendingEntryColumn':
          for (let i in this.pendingEntryColumnTableData) {
            this.$set(this.tableData, i, this.pendingEntryColumnTableData[i])
          }
          break
        case 'toBeAuditedColumn':
          for (let i in this.toBeAuditedColumnTableData) {
            this.$set(this.tableData, i, this.toBeAuditedColumnTableData[i])
          }
          break
        case 'toBeAmendedColumn':
          for (let i in this.toBeAmendedColumnTableData) {
            this.$set(this.tableData, i, this.toBeAmendedColumnTableData[i])
          }
          break
        case 'followUpColumn':
          for (let i in this.followUpColumnTableData) {
            this.$set(this.tableData, i, this.followUpColumnTableData[i])
          }
          console.log('followUpColumn')
          break
      }
    },
    // 总表
    async recordAllRecordShowData () {
      let z = await recordAllRecord({currentPage: this.currentPage, perPage: this.perPage, searchPattern: this.lookupFormInputData})
      if (z ? z.data.entity : false) {
        console.log(z, 'z.data.entity.data')
        this.recordAllRecordTableData = []
        for (let i of z.data.entity.data) {
          for (let z of i.information.data) {
            if (z.state) {
              i[z.label] = z.state
            } else {
              if (z.submenu.length) {
                i[z.label] = []
                for (let o of z.submenu) {
                  i[z.label].push(`${o.label}: ${o.state}`)
                }
                i[z.label] = i[z.label].toString()
              }
            }
          }
          if (i.gender) i.gender = '男'
          else i.gender = '女'
          this.recordAllRecordTableData.push(i)
        }
        // this.total = z.data.entity.total
        this.$set(this.rulesContainTopModel, 'AlltableColumn', z.data.entity.total)
        return true
      }
      return false
    },
    // 待录入
    async formdataUndoneFilledFormShowData () {
      let z = await formdataUndoneFilledForm(Object.assign({currentPage: this.currentPage, perPage: this.perPage, searchPattern: this.lookupFormInputData}, this.user))
      if (z ? z.data.entity : false) {
        this.pendingEntryColumnTableData = []
        for (let i of z.data.entity.data) {
          console.log(i, 'z.data.entity.data1')
          this.pendingEntryColumnTableData.push(Object.assign(i, i.header))
          if (i.gender) i.gender = '男'
          else i.gender = '女'
          // if (i.phase === '术中') {
          //   console.log(i.data, '12222222')
          //   for (let s of i.data) {
          //     for (let i in s) {
          //       if (i === 'surgeryDate') {
          //         console.log('cao zhaodaole', s[i])
          //       }
          //     }
          //   }
          // }
        }
        // this.total = z.data.entity.total
        this.$set(this.rulesContainTopModel, 'pendingEntryColumn', z.data.entity.total)
        return true
      }
      return false
    },
    // 待审核
    async formdataFinishedFilledFormShowData () {
      let z = await formdataFinishedFilledForm(Object.assign({currentPage: this.currentPage, perPage: this.perPage, searchPattern: this.lookupFormInputData}, this.user))
      if (z ? z.data.entity : false) {
        this.toBeAuditedColumnTableData = []
        for (let i of z.data.entity.data) {
          this.toBeAuditedColumnTableData.push(Object.assign(i, i.header))
          if (i.gender) i.gender = '男'
          else i.gender = '女'
        }
        // this.total = z.data.entity.total
        this.$set(this.rulesContainTopModel, 'toBeAuditedColumn', z.data.entity.total)
        return true
      }
      return false
    },
    // 待修正
    async formdataRejectedFilledFormShowData () {
      let z = await formdataRejectedFilledForm(Object.assign({currentPage: this.currentPage, perPage: this.perPage, searchPattern: this.lookupFormInputData}, this.user))
      if (z ? z.data.entity : false) {
        this.toBeAmendedColumnTableData = []
        for (let i of z.data.entity.data) {
          this.toBeAmendedColumnTableData.push(Object.assign(i, i.header))
          if (i.gender) i.gender = '男'
          else i.gender = '女'
        }
        // this.total = z.data.entity.total
        this.$set(this.rulesContainTopModel, 'toBeAmendedColumn', z.data.entity.total)
        return true
      }
      return false
    },
    // 随访
    async formdataFollowUpFilledFormShowData () {
      let z = await formdataFollowUpFilledForm(Object.assign({currentPage: this.currentPage, perPage: this.perPage, searchPattern: this.lookupFormInputData}, this.user))
      if (z ? z.data.entity : false) {
        this.followUpColumnTableData = []
        for (let i of z.data.entity.data) {
          let isLostContact = ''
          if (i.header.isFinished) {
            isLostContact = '已完成'
          } else {
            isLostContact = '未完成'
          }
          if (i.header.isLostContact) {
            isLostContact = '已失访'
          }
          this.followUpColumnTableData.push(
            Object.assign(
              i,
              i.header,
              {doctor: i.information.record ? i.information.record.forms[0].data.generalCondition.doctor : null},
              {dischargeDate: i.information.record ? i.information.record.forms[4].data.comprehensiveAssessment.dischargeDate : null},
              {isLostContact: isLostContact},
              {followUpDate: i.data.endpointEventRecord ? i.data.endpointEventRecord.followUpDate : '/'}
            )
          )
          if (i.gender) i.gender = '男'
          else i.gender = '女'
        }
        // this.total = z.data.entity.total
        this.$set(this.rulesContainTopModel, 'followUpColumn', z.data.entity.total)
        return true
      }
      return false
    },
    async lookupFormInput () {
      let successOrFail = false
      switch (this.activeRow.key) {
        case 'AlltableColumn':
          successOrFail = await this.recordAllRecordShowData()
          break
        case 'pendingEntryColumn':
          successOrFail = await this.formdataUndoneFilledFormShowData()
          break
        case 'toBeAuditedColumn':
          successOrFail = await this.formdataFinishedFilledFormShowData()
          break
        case 'toBeAmendedColumn':
          successOrFail = await this.formdataRejectedFilledFormShowData()
          break
        case 'followUpColumn':
          successOrFail = await this.formdataFollowUpFilledFormShowData()
          break
      }
      this.show()
      if (successOrFail) {
        this.$message({
          type: 'success',
          message: '搜索成功',
          showClose: true
        })
      } else {
        this.$message({
          showClose: true,
          message: '搜索失败'
        })
      }
    },
    filterHandler (value, row, column) {
      console.log(value, row, column, '=======, filterHandler')
      const property = column['property']
      return row[property] === value
    },
    openCreateFish () {
      this.ruleFormTF = false
      this.thatFishData = {}
      this.$set(this.ruleForm, 'patientId', '')
      this.$set(this.ruleForm, 'patientName', '')
      this.$set(this.ruleForm, 'gender', '')
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.createFishOrEditFish = true
      this.dialogVisible = true
    },
    async patientIdCheckUp () {
      let pgp = await patientGetPatientCount(this.ruleForm)
      console.log(pgp, 'pgp')
      if (pgp) {
        this.thatFishData = Object.assign(this.ruleForm, this.thatFishData)
        for (let i in pgp.data.entity) {
          this.$set(this.ruleForm, i, pgp.data.entity[i])
          this.$set(this.thatFishData, i, pgp.data.entity[i])
        }
        return true
      } else {
        this.$confirm('是否新增患者', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.patientData = {}
          this.patientData.hospitalId = this.ruleForm.patientId
          this.patientDialogVisible = true
        }).catch(() => {})
      }
      return false
    },
    async createPatientFish (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      console.log(formModel)
      if (formModel['provinceCityDistrict'].length === 2) {
        formModel['province'] = formModel['provinceCityDistrict'][0]
        formModel['city'] = formModel['provinceCityDistrict'][0]
        formModel['district'] = formModel['provinceCityDistrict'][1]
      } else {
        formModel['province'] = formModel['provinceCityDistrict'][0]
        formModel['city'] = formModel['provinceCityDistrict'][1]
        formModel['district'] = formModel['provinceCityDistrict'][2]
      }
      let pap = await patientAddPatient(formModel)
      console.log(pap, 'pap')
      if (pap) {
        this.patientDialogVisible = false
      }
    },
    async createFish (mozhuId, formModel, relation, newFields, idGroup, errors, comments, coordinate) {
      this.$refs['ruleForm'].validate(async valid => {
        console.log(valid)
        if (valid) {
          if (this.createFishOrEditFish) {
            if (await this.patientIdCheckUp()) {
              let r = await record(Object.assign(this.ruleForm, formModel))
              console.log(r)
              this.dialogVisible = false
              await this.firstShow()
              this.show()
            }
          } else {
            this.ruleForm.header = Object.assign({ patientId: this.ruleForm.patientId }, formModel)
            console.log(this.ruleForm)
            let r = await formdataSave(Object.assign(this.ruleForm, { whatUser: this.user }))
            console.log(r, 'createFishOrEditFishcreateFishOrEditFishcreateFishOrEditFish')
            this.dialogVisible = false
            await this.firstShow()
            this.show()
          }
        } else {
          console.log('error submit!!')
        }
      })
    },
    async updateFish () {},
    filterBtn (row, x) {
      if (row.phase === '随访') {
        if (row.isFinished) {
          if (x.reverse) {
            return true
          } else {
            return false
          }
        } else {
          if (x.reverse) {
            return false
          } else {
            return true
          }
        }
      }
      return row.phase === '术中'
    },
    async operateClick (row, index, x) {
      let deleteBtn = true
      switch (x.label) {
        case '查看':
          console.log('查看')
          break
        case '编辑':
          console.log('编辑')
          break
        case '录入':
          console.log('编辑')
          break
        case '审核':
          console.log('审核')
          break
        case '失访':
          if (this.activeRow.title === '随访') {
            deleteBtn = false
            let a = await formdataFollowingupLostcontact(row)
            if (a) {
              await this.firstShow()
              this.show()
            }
          }
          break
        default:
          deleteBtn = false
          if (this.activeRow.title === '随访') {
            this.$confirm('此操作将删除该数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async _ => {
              let fd = await formdataDeleteId(row)
              if (fd) {
                await this.firstShow()
                this.show()
              }
            }).catch(_ => {})
          } else {
            this.$confirm('此操作将删除该数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async _ => {
              let fd = await formdataDelete(row)
              if (fd) {
                await this.firstShow()
                this.show()
              }
            }).catch(_ => {})
          }
          break
      }
      if (deleteBtn) {
        switch (this.activeRow.title) {
          case '总表':
            this.$router.push({ name: 'zb', params: { data: JSON.stringify(row) } })
            break
          case '待录入':
            if (x.label === '录入') {
              this.$router.push({ name: 'lr', params: { data: JSON.stringify(row) } })
            } else {
              this.createFishOrEditFish = false
              let r = Object.assign({}, row)
              if (r.gender === '男') r.gender = 1
              else r.gender = 0
              this.ruleForm = this.thatFishData = r
              this.ruleFormTF = true
              this.dialogVisible = true
              console.log('bianji', 'row', row)
            }
            break
          case '待审核':
            this.$router.push({ name: 'sh', params: { data: JSON.stringify(row) } })
            break
          case '待修正':
            this.$router.push({ name: 'xz', params: { data: JSON.stringify(row) } })
            break
          case '随访':
            this.$router.push({ name: 'sf', params: { data: JSON.stringify(row) } })
            break
        }
      }
      console.log(row, index, x, '----------')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';

$full: 100%;
$contentW: 95%;
.rulesAll {
  width: $full;
  height: $full;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  .rulesContent {
    width: 100%;
    height: 100%;
    .rulesTop {
      background: white;
      border: $lightBorderColor 1px solid;
      margin-bottom: 10px;
      height: 260px;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .rulesContain {
      background: white;
      color: $commonTetxColor;
      width: $full;
      border: $lightBorderColor 1px solid;
      .rulesContainTop {
        height: 60px;
        display: flex;
        width: $full;
        .rulesContainTopItem {
          border-right: 1px solid $lightBorderColor;
          border-bottom: 1px solid $lightBorderColor;
          flex-grow: 1;
          display: flex;
          justify-content: space-around;
          align-items: center;
          transition: all .5s;
          i {
            font-size: 17px;
          }
        }
        .rulesContainTopItem:last-child {
          border-right: none;
        }
        .rulesContainTopItem:hover {
          cursor: pointer;
          color: black;
        }
        .activeIndex {
          background: $linearGradient;
          i {
            color: $themeColor;
          }
        }
      }
      .rulesContainContent {
        padding: 15px;
        display: flex;
        flex-direction: column;
      }
    }
    .controlContent {
      text-align: right;
      padding: 15px 0 ;
    }
  }
}
</style>
