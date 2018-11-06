<template>
  <div class="wrapper">
    <div id="patient">
      <div class="basic er-card">
        <div class="title">
          <span><i class="ercp-icon-module-patient"></i> <b>基本信息</b></span>
        </div>
        <!-- 患者基本信息 -->
        <div class="basic-information" >
          <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="left" label-width="100px"  :disabled="editable">
            <el-row>
              <el-col :span="8">
                <el-form-item label="住院号:" prop="hospitalId">
                  <el-input v-model="basicInfo.hospitalId" style="width:217px;" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名:" prop="name">
                  <el-input v-model="basicInfo.name" style="width:217px;" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="basicInfo.gender">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号:" prop="idCard">
                  <el-input v-model="basicInfo.idCard" style="width:217px;" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="民族:" prop="nation" ref="nation">
                  <text-radio v-model="basicInfo.nation" :message="basicInfo.nation" :options="['汉族','回族','藏族']" :disabled="false"></text-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系方式:" prop="phoneNum">
                  <el-input v-model="basicInfo.phoneNum" style="width:217px;" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="常居住地" prop="address">
                  <el-cascader
                    :options="addressOption"
                    v-model="basicInfo.address"
                    style="width:217px;">
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="staAddress" label="街道地址">
                  <el-input v-model="basicInfo.staAddress" style="width:217px;"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="operate">
            <div class="float-right">
              <el-button type="danger" size="small" @click="deletePat">删除</el-button>
              <el-button type="primary" size="small" v-if="editable" @click="editable = false">编辑</el-button>
              <el-button type="primary" size="small" v-if="!editable" @click="changePatientInfo">保存</el-button>
            </div>
          </div>
        </div>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane :label="'住院记录-' + (index + 1)" v-for="(record, index) in patientRecords" :key="index">
          <div class="record-info er-card">
            <div class="card-title">
              住院记录
            </div>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">{{record.inHospitalDate || ''}}</div>
              <div class="record-title text-overflow-ellipsis">
                <span class="light-text">入院日期：</span>
                <span>{{record.inHospitalDate || ''}}</span>
              </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">{{record.dept || ''}}</div>
              <div class="record-title text-overflow-ellipsis">
                <span class="light-text">科室：</span>
                <span>{{record.dept || ''}}</span>
              </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <span v-for="(disease, index) in (record.forms.find((n) => n.header.phase === '住院基本情况')) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === '住院基本情况')).data.generalCondition.admissionDiagnosis, 'generalCondition', 'admissionDiagnosis', 'diseaseName')" :key="index">
                  {{disease}}
                </span>
              </div>
              <div class="record-title text-overflow-ellipsis">
                <span class="light-text">入院诊断：</span>
                <span v-for="(disease, index) in (record.forms.find((n) => n.header.phase === '住院基本情况')) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === '住院基本情况')).data.generalCondition.admissionDiagnosis, 'generalCondition', 'admissionDiagnosis', 'diseaseName')" :key="index">
                  {{disease}}
                </span>
              </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">{{(record.forms.find((n) => n.header.phase === "住院基本情况")) === undefined ? '' : (record.forms.find((n) => n.header.phase === "住院基本情况")).data.generalCondition.doctor}}</div>
              <div class="record-title text-overflow-ellipsis">
                <span class="light-text">主管医生：</span>
                <span>{{(record.forms.find((n) => n.header.phase === "住院基本情况")) === undefined ? '' : (record.forms.find((n) => n.header.phase === "住院基本情况")).data.generalCondition.doctor}}</span>
              </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content"><span>{{(record.forms.find((n) => n.header.phase === "出院综合评估")) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === "出院综合评估")).data.comprehensiveAssessment.dischargeState, 'comprehensiveAssessment', 'dischargeState')}}</span></div>
              <div class="record-title text-overflow-ellipsis">
                <span class="light-text">出院状态：</span>
                <span>{{(record.forms.find((n) => n.header.phase === "出院综合评估")) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === "出院综合评估")).data.comprehensiveAssessment.dischargeState, 'comprehensiveAssessment', 'dischargeState')}}</span>
              </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">{{(record.forms.find((n) => n.header.phase === "出院综合评估")) === undefined ? '' : (record.forms.find((n) => n.header.phase === "出院综合评估")).data.comprehensiveAssessment.dischargeDate}}</div>
              <div class="record-title text-overflow-ellipsis">
                <span class="light-text">出院日期：</span>
                <span>{{(record.forms.find((n) => n.header.phase === "出院综合评估")) === undefined ? '' : (record.forms.find((n) => n.header.phase === "出院综合评估")).data.comprehensiveAssessment.dischargeDate}}</span>
              </div>
            </el-tooltip>
            <div class="report">
              <el-button type="primary" size="small" plain @click="linkToRecord(record)" >查看报告</el-button>
            </div>
          </div>
          <el-carousel :interval="4000" type="card"  style="height:100%;width:600px;" :autoplay=false>
            <el-carousel-item v-for="(item, index) in record.forms" :key="index" :label="item.header.phase">
              <div class="card-content">
                <div class="card-title">
                  <el-tooltip class="item" effect="dark" placement="top" :disabled="true">
                    <span v-if="item.header.phase === '术中'" class="ercp-icon-medicine-report primary-text"></span>
                    <span slot="content">查看术中报告</span>
                  </el-tooltip>
                    {{item.header.phase}}
                  <span v-if="item.header.operationNum">（{{item.header.operationNum}}）</span>
                </div>
                <!-- 以下内容每表不一 -->
                <div class="info"  v-if="item.header.phase === '住院基本情况'">
                  <div class="case">有无胆囊：{{valueTransLabel(item.data.previousHistory.cholecystectomy, 'previousHistory', 'cholecystectomy')}}</div>
                  <div class="case">无ERCP相关操作史：{{valueTransLabel(item.data.previousHistory.oph, 'previousHistory', 'oph')}}</div>
                </div>
                <div class="info"  v-if="item.header.phase === '术前'">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                      <span v-for="(disease, index) in (record.forms.find((n) => n.header.phase === '术前')) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === '术前')).data.preoperativeRecord.preoperativeDiagnosis, 'preoperativeRecord', 'preoperativeDiagnosis', 'diseaseName')" :key="index">
                          {{disease}}
                      </span>
                    </div>
                    <div class="case one-case">术前诊断：
                      <span v-for="(disease, index) in (record.forms.find((n) => n.header.phase === '术前')) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === '术前')).data.preoperativeRecord.preoperativeDiagnosis, 'preoperativeRecord', 'preoperativeDiagnosis', 'diseaseName')" :key="index">
                        {{disease}}
                      </span>
                    </div>
                  </el-tooltip>
                </div>
                <div class="info"  v-if="item.header.phase === '术中'">
                  <div class="case">手术日期：{{item.data.intraoperativeDiagnosisAndEvaluation.surgeryDate === undefined ? '' : item.data.intraoperativeDiagnosisAndEvaluation.surgeryDate}}</div>
                  <div class="case">操作者：{{item.data.intraoperativeDiagnosisAndEvaluation.operationOperator}}</div>
                </div>
                <div class="info"  v-if="item.header.phase === '术后'">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                      <span v-for="(disease, index) in (record.forms.find((n) => n.header.phase === '术后')) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === '术后')).data.postDiagnosisAndExamination.postDiagnosis, 'postDiagnosisAndExamination', 'postDiagnosis', 'diseaseName')" :key="index">
                      {{disease}}
                      </span>
                    </div>
                    <div class="case one-case">
                      <span>入院诊断：</span>
                      <span v-for="(disease, index) in (record.forms.find((n) => n.header.phase === '术后')) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === '术后')).data.postDiagnosisAndExamination.postDiagnosis, 'postDiagnosisAndExamination', 'postDiagnosis', 'diseaseName')" :key="index">
                      {{disease}}
                      </span>
                    </div>
                  </el-tooltip>
                </div>
                <div class="info"  v-if="item.header.phase === '出院综合评估'">
                  <div class="case">术后住院天数：{{item.data.comprehensiveAssessment.postHospitalDays}}</div>
                  <div class="case">总住院天数：{{item.data.comprehensiveAssessment.totalHospitalizationDays}}</div>
                </div>
                <!-- 以下内容每表皆同 -->
                <div class="info-operator">
                  <div class="case">录入情况 : {{item.header.responseName}}</div>
                  <div class="case">审核情况 : {{item.header.checkerName}}</div>
                  <div class="case" v-if="item.header.isFinished === 0">
                    状态：待录入
                  </div>
                  <!-- 已提交录入未通过未驳回 -->
                  <div class="case" v-if="item.header.isFinished === 1 && item.header.isPassed === 0 && item.header.isRejected === 0">
                    状态：待审核
                  </div>
                  <!-- 已提交录入未通过已驳回 -->
                  <div class="case" v-if="item.header.isFinished === 1 && item.header.isPassed === 0 && item.header.isRejected === 1">
                    状态：待修正
                  </div>
                  <!-- 皆可查看，但是和以上按钮无并存需要，css溢出隐藏 -->
                  <div class="case" v-if="item.header.isFinished === 1 && item.header.isPassed === 1 && item.header.isRejected === 0">
                    状态：已完成
                  </div>
                </div>
                <div class="status">
                  <!-- 未提交录入 -->
                  <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 0 && userPermission.typein.permission === true" @click="operate('typein', item)">
                    录入
                  </el-button>
                  <!-- 已提交录入未通过未驳回 -->
                  <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 1 && item.header.isPassed === 0 && item.header.isRejected === 0 && userPermission.check.permission === true" @click="operate('check', item)">
                    审核
                  </el-button>
                  <!-- 已提交录入未通过已驳回 -->
                  <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 1 && item.header.isPassed === 0 && item.header.isRejected === 1 && userPermission.repair.permission === true" @click="operate('repair', item)">
                    修正
                  </el-button>
                  <!-- 皆可查看，但是和以上按钮无并存需要，css溢出隐藏 -->
                  <el-button type="primary" size="mini" plain @click="operate('view', record, index)">
                    查看
                  </el-button>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="随访记录" v-if="followRecords.length > 0">
          <el-carousel :interval="4000" type="card" style="height:100%;;width:600px;" :autoplay=false>
            <el-carousel-item v-for="(record, index) in followRecords" :key="index" :label="'随访记录' + (index + 1)">
              <div class="card-content">
                <div class="card-title">
                  {{record.header.phase}}记录{{index + 1}}
                </div>
                <div class="info">
                  <div class="case">
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        <span v-for="(thing, thingIndex) in record.data.endpointEventRecord.primaryEndpointEvent" :key="thingIndex">
                          {{thingIndex + 1}}、{{thing.primaryEndpointName}}
                        </span>
                      </div>
                      <div class="case one-case">原发性终点事件：
                        <span v-for="(thing, thingIndex) in record.data.endpointEventRecord.primaryEndpointEvent" :key="thingIndex">
                          {{thingIndex + 1}}、{{thing.primaryEndpointName}}
                        </span>
                      </div>
                    </el-tooltip>
                  </div>
                  <div class="case">
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        <span v-for="(thing, thingIndex) in record.data.endpointEventRecord.secondaryEndpointEvent" :key="thingIndex">
                          {{thingIndex + 1}}、{{thing.primaryEndpointName}}
                        </span>
                      </div>
                      <div class="case one-case">继发性终点事件：
                        <span v-for="(thing, thingIndex) in record.data.endpointEventRecord.secondaryEndpointEvent" :key="thingIndex">
                          {{thingIndex + 1}}、{{thing.primaryEndpointName}}
                        </span>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="info-operator">
                  <div class="case">
                    出院日期：
                    {{patientRecords[patientRecords.length - 1].forms.find((n) => n.header.phase === '出院综合评估') === undefined ? '' : patientRecords[patientRecords.length - 1].forms.find((n) => n.header.phase === '出院综合评估').data.comprehensiveAssessment.dischargeDate}}
                  </div>
                  <div class="case">
                    录入情况：{{record.header.responseName}}
                  </div>
                  <div class="case">
                    状态：{{record.information.state}}
                  </div>
                </div>
                <div class="status">
                  <el-button type="primary" size="mini" plain @click="operate2(record)">
                    查看
                  </el-button>
                </div>
                <!-- 以下内容每表皆同 -->
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import textRadio from '../../../components/textRadio/textRadio'
import {addressData} from '../../../data/address/addressData'
import {deletePatient, editPatientBasic, getPatientRecords, getPatientFollows, getAllFormTemplates} from '../../../api/patient/patient.js'
export default {
  name: 'patient_detail',
  components: {
    textRadio
  },
  data () {
    return {
      // 基本信息是否可以编辑
      editable: true,
      // 患者的住院号，用作跳转到报告页面获取报告详情
      NumInHospital: '',
      // 患者基本信息
      basicInfo: {
        name: '',
        gender: '',
        nation: '',
        hospitalId: '',
        idCard: '',
        phoneNum: '',
        address: [],
        staAddress: ''
      },
      // 基本信息表单规则
      rules: {
        name: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'focus'
        }],
        gender: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'focus'
        }],
        nation: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'focus'
        }],
        hospitalId: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'focus'
        }],
        idCard: [
          {
            required: true,
            message: '必填项不能为空',
            trigger: 'focus'
          },
          { validator (rule, value, callback) {
            setTimeout(() => {
              if (value !== '') {
                let pattern = /^\d{17}[\dxX]$/
                if (!pattern.test(value)) {
                  callback(new Error('请输入正确的身份证号'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            }, 1500)
          }}
        ],
        phoneNum: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'focus'
        }],
        address: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'focus'
        }],
        staAddress: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'focus'
        }]
      },
      // 地址选项
      addressOption: [],
      // 折叠面板
      activeIndex: 0,
      // 用户权限
      userPermission: {
        view: { permission: false, codetype: [1, 2, 4, 5, 6] },
        typein: { permission: false, codetype: [1, 5, 6] },
        check: { permission: false, codetype: [1, 2, 4] },
        repair: { permission: false, codetype: [1, 5, 6] },
        suifang: { permission: false, codetype: [1, 6] }
      },
      // 患者表单记录
      patientRecords: [],
      // 患者随访记录
      followRecords: [],
      // 所有表单的模板
      allTemplates: []
    }
  },
  mounted () {
    // 初始化地址选项、获取患者住院记录、随访记录、匹配用户权限
    this.addressOption = addressData
    this.getPatientRec()
    this.getPatientFollow()
    this.getFormTemplate()
    this.initPermission(this.$store.state.user.codetype)
  },
  created () {
    // 根据url参数获取患者的基本信息
    let info = JSON.parse(this.$route.params.id)
    info.address = []
    if (info.province !== '' && info.province !== info.city) {
      info.address[0] = info.province
      info.address[1] = info.city
      info.address[2] = info.district
    } else if (info.province !== '' && info.province === info.city) {
      info.address[0] = info.city
      info.address[1] = info.district
    } else {
      info.address = []
    }
    this.NumInHospital = info.hospitalId
    this.basicInfo = info
  },
  methods: {
    // 删除患者
    async deletePatient () {
      let info = this.basicInfo.id
      let response = await deletePatient(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response)
        this.$router.push('/patient')
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 修改患者的基本信息
    async changePatientInfo () {
      this.$refs.basicForm.validate(async valid => {
        if (valid) {
          let info = Object.assign({}, this.basicInfo)
          if (this.basicInfo.address.length === 2) {
            info.province = this.basicInfo.address[0]
            info.city = this.basicInfo.address[0]
            info.district = this.basicInfo.address[1]
          } else if (this.basicInfo.address.length === 3) {
            info.province = this.basicInfo.address[0]
            info.city = this.basicInfo.address[1]
            info.district = this.basicInfo.address[2]
          } else {
            info.province = ''
            info.city = ''
            info.district = ''
          }
          delete info.address
          let response = await editPatientBasic(info)
          if (response.data.mitiStatus === 'SUCCESS') {
            // this.$refs.basicForm.resetFields()
            // this.dialogTableVisible = false
            this.editable = true
            // this.getPatient()
          } else {
            this.$message.error('ERROR: ' + response.data.message)
          }
        } else {
          return false
        }
      })
    },
    // 获取患者的住院记录等
    async getPatientRec () {
      let info = this.NumInHospital
      let response = await getPatientRecords(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.patientRecords = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async getPatientFollow () {
      let info = this.NumInHospital
      let response = await getPatientFollows(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.followRecords = response.data.entity
        let arr = []
        this.followRecords.forEach((item) => {
          if (item.information.state === '已完成') {
            arr.push(item)
          }
        })
        this.followRecords = arr
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 获取表单模板字段等
    async getFormTemplate () {
      // let info = this.NumInHospital
      let response = await getAllFormTemplates()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        this.allTemplates = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 删除操作
    deletePat () {
      this.$confirm('此操作将删除该患者, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletePatient()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 左滑动
    prev (case1) {
      let dom = this.$refs[case1][0] === undefined ? this.$refs[case1] : this.$refs[case1][0]
      let myWidth = 280 * dom.children.length
      let width = dom.offsetWidth
      let diff = myWidth - width
      let left = dom.offsetLeft
      if (diff > 0 && Math.abs(left) < diff) {
        dom.style.left = dom.offsetLeft - 280 + 'px'
      } else {
        return null
      }
    },
    // 右滑动
    next (case1) {
      let dom = this.$refs[case1][0] === undefined ? this.$refs[case1] : this.$refs[case1][0]
      let left = dom.offsetLeft
      if (left < 0) {
        dom.style.left = dom.offsetLeft + 280 + 'px'
      } else {
        return null
      }
    },
    // 值、表单id、字段id
    valueTransLabel (value, formId, fieldId, subFieldId) {
      if (this.allTemplates.length > 0) {
        let muban = this.allTemplates.find((n) => n.id === formId)
        if (muban) {
          let fieldMuban = muban.fields.find((n) => n.id === fieldId)
          if (!fieldMuban.subFields || fieldMuban.subFields.length < 1) {
            let labels = fieldMuban.values.find((n) => n.value === value)
            if (labels) {
              return labels['label']
            } else {
              return ''
            }
          } else {
            // table选项
            let arr = []
            if (value && value.length > 0) {
              value.forEach((item, index) => {
                let text = index + 1 + '、'
                let labels1
                item[subFieldId].forEach((item2, index2) => {
                  if (index2 === 0) {
                    labels1 = fieldMuban.subFields[0].children.find((n) => n.value === item2)
                    if (labels1) {
                      text += labels1['label']
                    } else {
                      text += ''
                    }
                  } else {
                    let labels2 = labels1.children.find((n) => n.value === item2)
                    if (labels2) {
                      text += labels2['label']
                    } else {
                      text += ''
                    }
                  }
                })
                arr.push(text)
                // console.log(arr)
              })
            }
            return arr
          }
        }
      } else {
        return ''
      }
    },
    // 初始化用户的审核等权限
    initPermission (type) {
      let obj = this.userPermission
      for (let i in obj) {
        if (obj[i].codetype.includes(type)) {
          obj[i].permission = true
        }
      }
      console.log(this.userPermission)
    },
    // 具体的表单操作
    operate (type, data, index) {
      switch (type) {
        // 录入
        case 'typein' :
          let data2 = data.header
          data2.id = data.id
          this.$router.push({ name: 'lr', params: { data: JSON.stringify(data2) } })
          break
        // 审核
        case 'check' :
          let data1 = data.header
          data1.id = data.id
          this.$router.push({ name: 'sh', params: { data: JSON.stringify(data1) } })
          break
        // 修正
        case 'repair' :
          let data3 = data.header
          data3.id = data.id
          this.$router.push({ name: 'xz', params: { data: JSON.stringify(data3) } })
          break
        // 查看
        case 'view' :
          let data4 = data
          // console.log(data)
          data4.activeIndexNav = data.forms[index].header.phase
          // data4.id = data.id
          console.log(data4)
          this.$router.push({ name: 'zb', params: { data: JSON.stringify(data4) } })
          break
      }
    },
    operate2 (data) {
      let data4 = data
      for (let i in data4.header) {
        data[i] = data4.header[i]
      }
      this.$router.push({ name: 'sf', params: { data: JSON.stringify(data4) } })
    },
    // 查看住院记录
    linkToRecord (record) {
      if (record.forms.find((n) => n.header.isPassed === 0) === undefined) {
        let info = {}
        info.recordId = record.id
        info.basicInfo = this.basicInfo
        this.$router.push(`/patient/record/${JSON.stringify(info)}`)
      } else {
        this.$message.info('记录尚未完全审核通过，查看详情报告请先审核通过')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/variable';
  .wrapper{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  #patient{
    overflow: hidden;
    width: 100%;
    min-height: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .basic{
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: 300px;
      margin-bottom: 8px;
      .basic-information{
        flex: 1;
        box-sizing: border-box;
        padding:10px 20px;
        display: flex;
        flex-direction: column;
        .operate{
          flex:1;
          padding: 0 10px;
          line-height: 42px;
        }
      }
    }

    .card-content{
      height: 95%;
      width: 300px;
      margin-top: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
      .info, .info-operator{
        padding: 0 8px;
        height:45%;
        box-sizing: border-box;
        // padding: 5px 0;
        line-height: 23px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .case, .one-case{
          flex: 1;
          // height:46px;
          white-space:normal;
          overflow:hidden;
          line-height: 1;
          display: flex;
          flex-direction: column;
          // align-items: center;
          justify-content: center;
          // line-height:23px;
        }
      }
      .info{
        border-bottom: 1px dotted #dfdfdf;
      }
      .info-operator{
        height: 40%;
        // flex:1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .status{
        height: 15%;
        // line-height: 36px;
        text-align: center;
        margin: 0 81px;
        overflow: hidden;
        box-sizing: border-box;
      }
      .wrapper{
        position: absolute;
        z-index: -1;
        top: 10px;
        filter: blur(1px);
        font-weight: 900;
        color: #ddd;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .card-title{
      text-align: center;
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #e4e7ed;
      background-color: #f5f7fa;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    .el-tabs{
      flex: 1;
      display: flex;
      color: #000;
      // justify-content: space-between;
      flex-direction: column;
      .el-tabs__header{
        height: 40px;
      }
    }
    .el-tabs__content{
      flex: 1;
      align-self: center;
      .el-tab-pane{
        background-color: rgba($color: #d3dce6, $alpha: .7);
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .record-info{
        height: 300px;
        width: 320px;
        margin-top: 16px;
        // width: 30%;
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: relative;
        padding: 48px 8px 8px 8px;
        box-sizing: border-box;
        // border-radius: 5px;
        .report{
          text-align: center;
        }
        .card-title{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
        }
      }
    }
  }
  >>>.el-carousel__button{
    opacity: 1 !important;
    border-radius: 2px;
  }
  .title{
    width: 100%;
    font-size: 15px;
    padding: 18px 20px;
    height: 10px;
    line-height: 10px;
    border-bottom: 1px solid #ebeef5;
    b{
      padding-left:10px;
    }
    span{
      margin-left: 5px;
    }
  }
</style>
