<template>
  <div class="wrapper">
    <div id="patient">
      <div class="basic er-card">
        <div class="title">
          <span><i class="ercp-icon-module-patient"></i> <b>基本信息</b></span>
        </div>
        <!-- 患者基本信息 -->
        <div class="basic-information">
          <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="left" label-width="100px"  :disabled="editable">
            <el-row>
              <el-col :span="8">
                <el-form-item label="住院号:" prop="hospitalId">
                  <el-input v-model="basicInfo.hospitalId" style="width:217px;" size="small" :disabled="true"></el-input>
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
          <div class="operate" v-if="$store.state.user.codetype == '5' || $store.state.user.codetype == '6'">
            <div class="float-right">
              <el-button type="danger" size="small" @click="deletePat">删除</el-button>
              <el-button type="primary" size="small" v-if="editable" @click="editable = false">编辑</el-button>
              <el-button type="primary" size="small" v-if="!editable" @click="changePatientInfo">保存</el-button>
            </div>
          </div>
        </div>
      </div>
      <el-tabs type="border-card" v-if="patientRecords.length > 0 || followRecords.length > 0">
        <el-tab-pane :label="'住院记录 - ' + (index + 1)" v-for="(record, index) in patientRecords" :key="index">
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
          <el-carousel :interval="4000" type="card"  style="height:100%;width:600px;" :autoplay=false arrow="always">
            <el-carousel-item v-for="(item, index) in record.forms" :key="index" :label="item.header.phase">
              <div class="card-content">
                <div class="backup" @click="goback(item)" v-if="$store.state.user.codetype === 1 && item.header.isFinished === 1 && item.header.isPassed === 1 && item.header.isRejected === 0"><el-button plain size="mini" type="primary">退回</el-button></div>
                <div class="card-title">
                  <!-- <el-tooltip class="item" effect="dark" placement="top" :disabled="true"> -->
                    <!-- <span v-if="item.header.phase === '术中'" class="ercp-icon-medicine-report primary-text" @click="operate('view', record, index)"></span> -->
                    <!-- <span slot="content">查看术中报告</span> -->
                  <!-- </el-tooltip> -->
                    {{item.header.phase}}
                  <span v-if="item.header.operationNum">（{{item.header.operationNum}}）</span>
                </div>
                <!-- 以下内容每表不一 -->
                <div class="info"  v-if="item.header.phase === '住院基本情况'">
                  <div class="case">胆囊：{{valueTransLabel(item.data.previousHistory.cholecystectomy, 'previousHistory', 'cholecystectomy')}}</div>
                  <div class="case">ERCP相关操作史：{{valueTransLabel(item.data.previousHistory.oph, 'previousHistory', 'oph')}}</div>
                </div>
                <div class="info"  v-if="item.header.phase === '术前'">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                      <span v-for="(disease, index) in valueTransLabel(item.data.preoperativeRecord.preoperativeDiagnosis, 'preoperativeRecord', 'preoperativeDiagnosis', 'diseaseName')" :key="index">
                          {{disease}}
                      </span>
                    </div>
                    <div class="case one-case">术前诊断：
                      <span v-for="(disease, index) in valueTransLabel(item.data.preoperativeRecord.preoperativeDiagnosis, 'preoperativeRecord', 'preoperativeDiagnosis', 'diseaseName')" :key="index">
                        {{disease}}
                      </span>
                    </div>
                  </el-tooltip>
                </div>
                <div class="info"  v-if="item.header.phase === '术中'">
                  <div class="case">手术日期：{{item.header.operationDate === undefined ? '' : item.header.operationDate}}</div>
                  <div class="case">手术操作者：{{item.data.intraoperativeDiagnosisAndEvaluation.operationOperator}}</div>
                </div>
                <div class="info"  v-if="item.header.phase === '术后'">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                      <span v-for="(disease, index) in valueTransLabel(item.data.postDiagnosisAndExamination.postDiagnosis, 'postDiagnosisAndExamination', 'postDiagnosis', 'diseaseName')" :key="index">
                      {{disease}}
                      </span>
                    </div>
                    <div class="case one-case">
                      <span>术后诊断：</span>
                      <span v-for="(disease, index) in valueTransLabel(item.data.postDiagnosisAndExamination.postDiagnosis, 'postDiagnosisAndExamination', 'postDiagnosis', 'diseaseName')" :key="index">
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
                  <div class="case" v-if="item.header.isFinished === 0 && item.header.isRejected === 0">
                    状态：待录入
                  </div>
                  <!-- 已提交录入未通过未驳回 -->
                  <div class="case" v-if="item.header.isFinished === 1 && item.header.isPassed === 0 && item.header.isRejected === 0">
                    状态：待审核
                  </div>
                  <!-- 已提交录入未通过已驳回 -->
                  <div class="case" v-if="item.header.isFinished === 0 && item.header.isPassed === 0 && item.header.isRejected === 1">
                    状态：待修正
                  </div>
                  <!-- 皆可查看，但是和以上按钮无并存需要，css溢出隐藏 -->
                  <div class="case" v-if="item.header.isFinished === 1 && item.header.isPassed === 1 && item.header.isRejected === 0">
                    状态：已通过
                  </div>
                </div>
                <div class="status" v-if="item.header.phase !== '术中'">
                  <!-- 未提交录入 -->
                  <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 0 && item.header.isRejected === 0 && userPermission.typein.permission === true && $store.state.user.codetype !== 5" @click="operate('typein', item)">
                    录入
                  </el-button>
                  <!-- 已提交录入未通过未驳回 -->
                  <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 1 && item.header.isPassed === 0 && item.header.isRejected === 0 && userPermission.check.permission === true" @click="operate('check', item)">
                    审核
                  </el-button>
                  <!-- 已提交录入未通过已驳回 -->
                  <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 0 && item.header.isPassed === 0 && item.header.isRejected === 1 && userPermission.repair.permission === true" @click="operate('repair', item)">
                    修正
                  </el-button>
                  <!-- 皆可查看，但是和以上按钮无并存需要，css溢出隐藏 -->
                  <el-button type="primary" size="mini" plain @click="operate('view', record, index)">
                    查看
                  </el-button>
                </div>
                <div class="status" v-else>
                  <!-- 未提交录入 -->
                  <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 0 && item.header.isRejected === 0 && userPermission.typein.permission === true && $store.state.user.codetype !== 6" @click="operate('typein', item)">
                    录入
                  </el-button>
                  <!-- 已提交录入未通过未驳回 -->
                  <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 1 && item.header.isPassed === 0 && item.header.isRejected === 0 && userPermission.check.permission === true" @click="operate('check', item)">
                    审核
                  </el-button>
                  <!-- 已提交录入未通过已驳回 -->
                  <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 0 && item.header.isPassed === 0 && item.header.isRejected === 1 && userPermission.repair.permission === true && item.header.responseId === $store.state.user.id" @click="operate('repair', item)">
                    修正
                  </el-button>
                  <!-- 皆可查看，但是和以上按钮无并存需要，css溢出隐藏 -->
                  <el-button type="primary" size="mini" plain @click="operate('view', record, index)">
                    查看
                  </el-button>
                </div>
                <div class="wrapper">
                  <span v-if="item.header.isFinished === 0 && item.header.isRejected === 0">
                    待录入
                  </span>
                  <span v-if="item.header.isFinished === 1 && item.header.isPassed === 0 && item.header.isRejected === 0">
                    待审核
                  </span>
                  <span v-if="item.header.isFinished === 0 && item.header.isPassed === 0 && item.header.isRejected === 1">
                    待修正
                  </span>
                  <span v-if="item.header.isFinished === 1 && item.header.isPassed === 1 && item.header.isRejected === 0">
                    已通过
                  </span>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane :label="'随访记录 - ' + (followIndex + 1)"  v-for="(follow, followIndex) in followRecords" :key="'随访记录' + followIndex">
          <el-carousel :interval="4000" type="card" style="height:100%;;width:600px;" :autoplay=false arrow="always" v-if="follow.find((n) => n.information.state === '已完成')">
            <el-carousel-item v-for="(record, index) in follow" :key="index" :label="record.header.phase + '(' + record.data.endpointEventRecord.followUpDate+ ')'" v-if="record.information.state === '已完成'">
              <div class="card-content">
                <div class="backup" @click="goback(record)" v-if="$store.state.user.codetype === 1 && record.header.isFinished === 1 && record.header.isPassed === 1 && record.header.isRejected === 0"><el-button plain size="mini" type="primary">退回</el-button></div>
                <div class="card-title">
                  {{record.header.phase}}({{record.data.endpointEventRecord.followUpDate}})
                </div>
                <div class="info">
                  <div class="case">
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">
                        <span v-for="(thing, thingIndex) in record.data.endpointEventRecord.primaryEndpointEvent" :key="thingIndex">
                          {{thingIndex + 1}}、{{thing.primaryEndpointName}}
                        </span>
                      </div>
                      <div class="case one-case" style="line-height: 26px;">
                        <span>原发性终点事件：</span>
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
                          {{thingIndex + 1}}、{{thing.secondaryEndpointEventName}}
                        </span>
                      </div>
                      <div class="case one-case" style="line-height: 26px;">
                        <span>继发性终点事件：</span>
                        <span v-for="(thing, thingIndex) in record.data.endpointEventRecord.secondaryEndpointEvent" :key="thingIndex">
                          {{thingIndex + 1}}、{{thing.secondaryEndpointEventName}}
                        </span>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="info-operator">
                  <div class="case">
                    出院日期：
                    {{patientRecords[followIndex].forms.find((n) => n.header.phase === '出院综合评估') === undefined ? '' : patientRecords[followIndex].forms.find((n) => n.header.phase === '出院综合评估').data.comprehensiveAssessment.dischargeDate}}
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
                <div class="wrapper">
                  <span v-if="record.header.isFinished === 1 && record.header.isPassed === 1 && record.header.isRejected === 0">
                    已通过
                  </span>
                </div>
                <!-- 以下内容每表皆同 -->
              </div>
            </el-carousel-item>
          </el-carousel>
          <h3 v-else>随访记录皆未完成</h3>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import textRadio from '../../../components/textRadio/textRadio'
import {addressData} from '../../../data/address/addressData'
import {deletePatient, editPatientBasic, getPatientRecords, getPatientFollows, getAllFormTemplates, unpassRecord} from '../../../api/patient/patient.js'
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
        }]
        // staAddress: [{
        //   required: true,
        //   message: '必填项不能为空',
        //   trigger: 'focus'
        // }]
      },
      // 地址选项
      addressOption: [],
      // 折叠面板
      activeIndex: 0,
      // 用户权限
      userPermission: {
        view: { permission: false, codetype: [1, 2, 3, 4, 5, 6] },
        typein: { permission: false, codetype: [5, 6] },
        check: { permission: false, codetype: [2, 4] },
        repair: { permission: false, codetype: [5, 6] },
        suifang: { permission: false, codetype: [1, 2, 3, 4, 5, 6] }
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
        this.patientRecords = [...response.data.entity]
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 随访
    async getPatientFollow () {
      let info = this.NumInHospital
      let response = await getPatientFollows(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        // this.followRecords = response.data.entity
        let arr = [...response.data.entity]
        let arr2 = []
        let num1 = Math.ceil((arr.length) / 5)
        let num2 = num1
        for (num2 > 0; num2--;) {
          arr2.push(arr.splice(0, 5))
        }
        console.log(arr2)
        // this.followRecords.forEach((item) => {
        //   if (item.information.state === '已完成') {
        //     arr.push(item)
        //   }
        // })
        this.followRecords = arr2
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
      this.$confirm('此操作将删除该患者及其相关的手术记录、随访记录, 是否继续?', '提示', {
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
    // 具体的表单操作（查看、审核、录入、修正）
    operate (type, data, index) {
      switch (type) {
        // 录入
        case 'typein' :
          let data2 = data
          console.log(data)
          for (let i in data.header) {
            console.log(i, 'data.header')
            data2[i] = data.header[i]
          }
          data2.id = data.id
          data2.gender = data2.gender ? '男' : '女'
          console.log(data2)
          this.$router.push({ name: 'lr', params: { data: JSON.stringify(data2) } })
          break
        // 审核
        case 'check' :
          let data1 = data
          console.log(data)
          for (let i in data.header) {
            console.log(i, 'data.header')
            data1[i] = data.header[i]
          }
          data1.id = data.id
          data1.gender = data1.gender ? '男' : '女'
          console.log(data1)
          this.$router.push({ name: 'sh', params: { data: JSON.stringify(data1) } })
          break
        // 修正
        case 'repair' :
          let data3 = data
          console.log(data)
          for (let i in data.header) {
            console.log(i, 'data.header')
            data3[i] = data.header[i]
          }
          data3.id = data.id
          data3.gender = data3.gender ? '男' : '女'
          console.log(data3)
          this.$router.push({ name: 'xz', params: { data: JSON.stringify(data3) } })
          break
        // 查看
        case 'view' :
          let data4 = data
          let phase = data.forms[index].header.phase
          data4.activeIndexNav = phase
          if (phase === '术前' || phase === '术中' || phase === '术后') {
            let nav = data.forms[index].header.createDate.split(' ')[0]
            data4.activeIndexNav += nav
          }
          console.log(data4)
          this.$router.push({ name: 'zb', params: { data: JSON.stringify(data4) } })
          break
      }
    },
    goback (item) {
      console.log(item)
      this.$confirm('此操作将退回该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.unpass(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    async unpass (item) {
      let response = await unpassRecord(item)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.$message.success('该条记录已退回')
        this.getPatientRec()
        this.getPatientFollow()
        this.getFormTemplate()
        this.initPermission(this.$store.state.user.codetype)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 随访
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
        this.$message.info('记录尚未完全审核通过，请审核后再查看')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/variable';
  .backup{
    position: absolute;
    top: 10px;
    right: 15px;
  }
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
        line-height: 23px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .case, .one-case{
          flex: 1;
          white-space:normal;
          overflow:hidden;
          line-height: 26px;
          span{
            min-height: 26px;
          }
        }
      }
      .info{
        border-bottom: 1px dotted #dfdfdf;
      }
      .info-operator{
        height: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .status{
        height: 15%;
        line-height: 36px;
        text-align: center;
        margin: 0 81px;
        overflow: hidden;
        box-sizing: border-box;
        .el-button:nth-of-type(2){
          display: none;
        }
      }
      .wrapper{
        position: absolute;
        z-index: -1;
        top: 10px;
        filter: blur(1px);
        font-weight: 900;
        color: #efefef;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          transform: rotate(-45deg);
          border: 5px solid #efefef;
          height: 120px;
          text-align: center;
          line-height: 120px;
          width: 120px;
          border-radius: 50%;
        }
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
      flex-direction: column;
      .el-tabs__header{
        height: 40px;
      }
    }
    /deep/ .el-tabs__content{
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .el-tabs__content{
      .el-tab-pane{
        background-color: rgba($color: #d3dce6, $alpha: .4);
        flex: 1;
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .record-info{
        height: 300px;
        width: 320px;
        margin-top: 16px;
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: relative;
        padding: 48px 8px 8px 8px;
        box-sizing: border-box;
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
