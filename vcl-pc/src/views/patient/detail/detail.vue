<template>
  <div class="wrapper">
    <div id="patient">
      <div class="basic er-card">
        <div class="title">
          <span><i class="ercp-icon-module-patient"></i> <b>基本信息</b></span>
        </div>
        <div class="basic-information" >
          <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="left" label-width="100px"  :disabled="editable">
            <el-row>
              <el-col :span="8">
                <el-form-item label="住院号:" prop="hospitalId">
                  <el-input v-model="basicInfo.hospitalId" style="width:217px;" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="患者姓名:" prop="name">
                  <el-input v-model="basicInfo.name" style="width:217px;" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="患者性别:" prop="gender">
                  <el-radio-group v-model="basicInfo.gender">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="患者民族:" prop="nation" ref="nation">
                  <text-radio v-model="basicInfo.nation" :message="basicInfo.nation" :options="['汉族','回族','藏族']" :disabled="false"></text-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号:" prop="idCard">
                  <el-input v-model="basicInfo.idCard" style="width:217px;" size="small"></el-input>
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
                    style="width:217px;"
                    @change="handleChange">
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
      <div class="records hospital er-card" v-if="patientRecords.length > 0">
        <div class="hospital-record" v-for="(record, index) in patientRecords" :key="index">
          <div class="record-case">
            <div class="records-title" @click="activeIndex = activeIndex === index ? -1 : index ">
              <div class="record-title-head">
                <span>住</span>
              </div>
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">{{record.operationNum.toString() || ''}}</div>
                <div class="record-title text-overflow-ellipsis">
                  <span class="light-text">编号：</span>
                  <span>{{record.operationNum || ''}}</span>
                </div>
              </el-tooltip>
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
              <div :class="{'record-icon-up': true, 'record-icon-down': activeIndex === index}">
                <span class="ercp-icon-general-next light-text"></span>
              </div>
            </div>
            <div class="follow-record"  :class="{'active-class': activeIndex === index}">
              <div v-if="activeIndex === index" class="prev" @click="next('content' + record.id)"><i class="el-icon-arrow-left"></i></div>
              <div v-if="activeIndex === index" class="next" @click="prev('content' + record.id)"><i class="el-icon-arrow-right"></i></div>
              <div class="content" :ref="'content' + record.id">
                <div class="er-card" v-for="(item, index) in record.forms" :key="index">
                  <div class="card-title">
                    {{item.header.phase}}
                    <span class="ercp-icon-medicine-report primary-text"></span>
                  </div>
                  <div class="card-content">
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
                        <div class="case text-overflow-ellipsis">术前诊断：
                          <span v-for="(disease, index) in (record.forms.find((n) => n.header.phase === '术前')) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === '术前')).data.preoperativeRecord.preoperativeDiagnosis, 'preoperativeRecord', 'preoperativeDiagnosis', 'diseaseName')" :key="index">
                            {{disease}}
                          </span>
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="info"  v-if="item.header.phase === '术中'">
                      <div class="case">手术日期：{{item.data.intraoperativeDiagnosisAndEvaluation.surgeryDate}}</div>
                      <div class="case">操作者：{{item.data.intraoperativeDiagnosisAndEvaluation.operationOperator}}</div>
                    </div>
                    <div class="info"  v-if="item.header.phase === '术后'">
                      <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content">
                          <span v-for="(disease, index) in (record.forms.find((n) => n.header.phase === '术后')) === undefined ? '' :valueTransLabel((record.forms.find((n) => n.header.phase === '术后')).data.postDiagnosisAndExamination.postDiagnosis, 'postDiagnosisAndExamination', 'postDiagnosis', 'diseaseName')" :key="index">
                          {{disease}}
                          </span>
                        </div>
                        <div class="case text-overflow-ellipsis">
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
                    <div class="info">
                      <div class="case">记录情况 : {{item.header.isFinished === 0 ? '未完成' : '已完成'}}</div>
                      <div class="case">审核情况 : {{item.header.isPassed === 0 ? '未完成' : '已完成'}}</div>
                      <div class="case">状态 : {{ (item.header.isFinished === 0 ? '未完成' : '已完成') === '未完成' ? '未记录' : ((item.header.isPassed === 0 ? '未完成' : '已完成') === '未完成' ? '未审核' : '已审核' )}}</div>
                    </div>
                    <div class="status">
                      <el-button type="primary" size="mini" plain v-if="item.header.isFinished === 0 && userPermission.typein.permission === true" @click="operate('typein', item)">
                        录入
                      </el-button>
                      <el-button type="primary" size="mini" plain v-if="item.header.isPassed === 0 && item.header.isFinished === 1 && userPermission.check.permission === true" @click="operate('check', item)">
                        审核
                      </el-button>
                      <el-button type="primary" size="mini" plain @click="operate('view', record)">
                        查看
                      </el-button>
                      <el-button type="primary" size="mini" plain v-if="item.header.isRejected === 1 && item.header.isFinished === 1 && userPermission.repair.permission === true" @click="operate('repair', item)">
                        修正
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import textRadio from '../../../components/textRadio/textRadio'
import {addressData} from '../../../data/address/addressData'
import {getPatientBasic, deletePatient, editPatientBasic, getPatientRecords, getAllFormTemplates} from '../../../api/patient/patient.js'
export default {
  name: 'patient_detail',
  components: {
    textRadio
  },
  data () {
    return {
      activeIndex: -1,
      NumInHospital: '',
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
      userPermission: {
        view: { permission: false, codetype: [1, 2, 4, 5, 6] },
        typein: { permission: false, codetype: [1, 5, 6] },
        check: { permission: false, codetype: [1, 2, 4] },
        repair: { permission: false, codetype: [1, 5, 6] },
        suifang: { permission: false, codetype: [1, 6] }
      },
      editable: true,
      addressOption: [],
      // 患者的表单记录
      patientRecords: [],
      // 所有表单的模板
      allTemplates: []
    }
  },
  mounted () {
    this.addressOption = addressData
    // this.getPatient()
    this.getPatientRec()
    this.getFormTemplate()
    // console.log(this.$store.state.user)
    this.initPermission(this.$store.state.user.codetype)
  },
  created () {
    this.NumInHospital = this.$route.params.id
  },
  methods: {
    // 根据患者id 获取患者的基本信息
    async getPatient () {
      let info = this.NumInHospital
      let response = await getPatientBasic(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        let info = response.data.entity
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
        this.$refs.nation.resetField()
        this.basicInfo = info
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    initPermission (type) {
      let obj = this.userPermission
      for (let i in obj) {
        if (obj[i].codetype.includes(type)) {
          obj[i].permission = true
        }
      }
      console.log(this.userPermission)
    },
    // 删除患者
    async deletePatient () {
      let info = this.NumInHospital
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
          console.log(this.basicInfo)
          let info = this.basicInfo
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
          console.log(info)
          // info.id = this.NumInHospital
          let response = await editPatientBasic(info)
          if (response.data.mitiStatus === 'SUCCESS') {
            this.$refs.basicForm.resetFields()
            this.dialogTableVisible = false
            this.editable = true
            this.getPatient()
          } else {
            this.$message.error('ERROR: ' + response.data.message)
          }
        } else {
          return false
        }
      })
    },
    handleChange (data) {
      // if (data.length === 2) {
      //   this.basicInfo.address = data[0]
      //   this.basicInfo.city = data[0]
      //   this.basicInfo.district = data[1]
      // } else if (data.length === 3) {
      //   this.basicInfo.address = data[0]
      //   this.basicInfo.city = data[1]
      //   this.basicInfo.district = data[2]
      // } else {
      //   this.basicInfo.address = ''
      //   this.basicInfo.city = ''
      //   this.basicInfo.district = ''
      // }
    },
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
    next (case1) {
      let dom = this.$refs[case1][0] === undefined ? this.$refs[case1] : this.$refs[case1][0]
      let left = dom.offsetLeft
      if (left < 0) {
        dom.style.left = dom.offsetLeft + 280 + 'px'
      } else {
        return null
      }
    },
    // 获取患者的住院记录等
    async getPatientRec () {
      let info = this.NumInHospital
      let response = await getPatientRecords(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        // console.log(response.data.entity)
        this.patientRecords = response.data.entity
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
                console.log(arr)
              })
            }
            return arr
          }
        }
      } else {
        return ''
      }
    },
    operate (type, data) {
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
          // data4.id = data.id
          console.log(data4)
          this.$router.push({ name: 'zb', params: { data: JSON.stringify(data4) } })
          break
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
    .records{
      margin-bottom: 16px;
      flex:1;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: hidden;
      .hospital-record{
        height: 100%;
        .record-case{
          .records-title{
            width: 100%;
            position: relative;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ebeef5;
            cursor: pointer;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            padding:0 30px 0 15px;
            box-sizing: border-box;
            .record-title{
              flex: 1;
              font-size: 15px;
              margin: 0 15px;
              b{
              padding-left:10px;
              }
            }
            .record-title-head{
              font-size: 12px;
              position: absolute;
              text-align: center;
              left: -20px;
              top: -20px;
              width: 40px;
              height: 40px;
              line-height: 65px;
              box-sizing: border-box;
              transform: rotate(-45deg);
              background-color: $themeColor;
              color: #fff;
            }
            .record-icon-up{
              position: absolute;
              right: 0px;
              padding: 0 15px;
              transform: rotate(90deg);
              transition: all .5s ease-in-out;
            }
            .record-icon-down{
              transform: rotate(-90deg);
              transition: all .5s ease-in-out;
            }
          }
          .prev, .next{
            position: absolute;
            top: 100px;
            width: 20px;
            height: 30px;
            line-height: 32px;
            background-color: rgba($color: #777, $alpha: .55);
            border-radius: 2px;
            cursor: pointer;
            color: #fff;
            text-align: center;
            z-index: 222;
            transition: all .5s ease-in-out;
          }
          .prev:hover, .next:hover{
            background-color: rgba($color: #777, $alpha: .65);
          }
          .prev{
            left: 10px;
          }
          .next{
            right: 10px;
          }
          .active-class{
            height: 260px !important;
            transition: all .5s;
           }
          .follow-record{
            transition: all .5s;
            height: 0px;
            display: block;
            position: relative;
            width: 100%;
            overflow: hidden;
            .follow{
              border-bottom: 1px solid #ebeef5;
            }
            .content{
              border-bottom: 1px solid #ebeef5;
            }
            .content{
              font-size: 14px;
              padding: 0 20px;
              height: 260px;
              box-sizing: border-box;
              white-space: nowrap;
              position: relative;
              transition: all .5s linear;
              left: 0;
              .er-card{
                width: 240px;
                height: 220px;
                overflow: hidden;
                box-sizing: border-box;
                display: inline-block;
                margin: 20px;
                .card-title{
                  padding: 0 10px;
                  height: 32px;
                  line-height: 32px;
                  color: $commonTetxColor;
                  font-weight:900;
                  background-color: $mainBackgroundColor;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                }
                .card-content{
                  padding: 7px 10px;
                  .info{
                    min-height: 60px;
                    box-sizing: border-box;
                    padding: 5px 0;
                    line-height: 23px;
                    width: 100%;
                    border-bottom: 1px dotted #D1D1D1;
                  }
                  .status{
                    line-height: 36px;
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
    }
    .follow{
      flex:0 0 312px;
    }
  }
  .title{
    width: 100%;
    font-size: 15px;
    padding: 18px 20px;
    height: 10px;
    line-height: 10px;
    b{
      padding-left:10px;
    }
    span{
      margin-left: 5px;
    }
  }
</style>
