<template>
  <div class="wrapper">
    <div id="patient">
      <div class="basic er-card">
        <div class="title">
          <span><i class="ercp-icon-module-patient"></i> <b>基本信息</b></span>
        </div>
        <div class="basic-information" >
          <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="left" label-width="100px"  :disabled="editable">
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
          </el-form>
          <div class="operate">
            <div class="float-right">
              <el-button type="danger" size="small" @click="deletePat">删除</el-button>
              <el-button type="primary" size="small" v-if="editable" @click="edit">编辑</el-button>
              <el-button type="primary" size="small" v-if="!editable" @click="changePatientInfo">保存</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="records hospital er-card">
        <div class="hospital-record">
          <div class="title">
              <i class="ercp-icon-medicine-hospital"></i>
              <b>住院记录 - </b>
              <span class="square-grey-text">2</span>
          </div>
          <el-collapse accordion>
            <el-collapse-item v-for="item in 2" :key="item" style="position:relative;">
              <div class="prev" @click="next('content' + item)"><i class="el-icon-arrow-left"></i></div>
              <div class="next" @click="prev('content' + item)"><i class="el-icon-arrow-right"></i></div>
              <template slot="title">
                <div class="record-title ">
                  <span class="light-text">编号：</span>
                  <span>13149527</span>
                </div>
                <div class="record-title ">
                  <span class="light-text">入院日期：</span>
                  <span>2018-03-09</span>
                </div>
                 <div class="record-title ">
                  <span class="light-text">科室：</span>
                  <span>科室一</span>
                </div>
                <div class="record-title ">
                  <span class="light-text">入院诊断：</span>
                  <span>瞌睡病</span>
                </div>
                <div class="record-title ">
                  <span class="light-text">主管医生：</span>
                  <span>熊本熊</span>
                </div>
                <div class="record-title ">
                  <span class="light-text">出院状态：</span>
                  <span class="success-text">治愈</span>
                </div>
                <div class="record-title ">
                  <span class="light-text">出院日期：</span>
                  <span>2018-03-29</span>
                </div>
              </template>
              <div class="content" :ref="'content' + item">
                <div class="er-card">
                  <div class="card-title">
                    住院基本情况8888888888
                  </div>
                  <div class="card-content">
                    <div class="info">
                      <div class="case">有无胆囊：无</div>
                      <div class="case">无ERCP相关操作史：无</div>
                    </div>
                    <div class="info">
                      <div class="case">录入情况 : 张雪峰2018-08-03</div>
                      <div class="case">审核情况 : 王大虎2018-08-03</div>
                      <div class="case">状态 : 已审核</div>
                    </div>
                    <div class="status">
                      <el-button type="primary" size="mini" plain>查看</el-button>
                    </div>
                  </div>
                </div>
                <div class="er-card">
                  <div class="card-title">
                    术前记录
                  </div>
                  <div class="card-content">
                    <div class="info">
                      <div class="case">诊断 : 没问题</div>
                    </div>
                    <div class="info">
                      <div class="case">录入情况 : 张雪峰2018-08-03</div>
                      <div class="case">审核情况 : 王大虎2018-08-03</div>
                      <div class="case">状态 : 已审核</div>
                    </div>
                    <div class="status">
                      <el-button type="primary" size="mini" plain>查看</el-button>
                    </div>
                  </div>
                </div>
                <div class="er-card">
                  <div class="card-title">
                    术中记录
                  </div>
                  <div class="card-content">
                    <div class="info">
                      <div class="case">手术日期: 2018-10-22</div>
                      <div class="case">操作者：王小虎</div>
                    </div>
                    <div class="info">
                      <div class="case">录入情况 : 张雪峰2018-08-03</div>
                      <div class="case">审核情况 : 王大虎2018-08-03</div>
                      <div class="case">状态 : 已审核</div>
                    </div>
                    <div class="status">
                      <el-button type="primary" size="mini" plain>查看</el-button>
                    </div>
                  </div>
                </div>
                <div class="er-card">
                  <div class="card-title">
                    术后记录
                  </div>
                  <div class="card-content">
                    <div class="info">
                      <div class="case">术后诊断:瞌睡病</div>
                    </div>
                    <div class="info">
                      <div class="case">录入情况 : 张雪峰2018-08-03</div>
                      <div class="case">审核情况 : 王大虎2018-08-03</div>
                      <div class="case">状态 : 已审核</div>
                    </div>
                    <div class="status">
                      <el-button type="primary" size="mini" plain>查看</el-button>
                    </div>
                  </div>
                </div>
                <div class="er-card">
                  <div class="card-title">
                    出院综合评估
                  </div>
                  <div class="card-content">
                    <div class="info">
                      <div class="case">术后住院天数: 12</div>
                      <div class="case">总住院天数:22</div>
                    </div>
                    <div class="info">
                      <div class="case">录入情况 : 张雪峰2018-08-03</div>
                      <div class="case">审核情况 : 王大虎2018-08-03</div>
                      <div class="case">状态 : 已审核</div>
                    </div>
                    <div class="status">
                      <el-button type="primary" size="mini" plain>查看</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="records follow er-card">
        <div class="follow-record">
          <div class="title follow">
              <i class="ercp-icon-medicine-followup"></i>
              <b>随访记录 - </b>
              <span class="square-grey-text">2</span>
          </div>
          <div class="prev" @click="next('follow')"><i class="el-icon-arrow-left"></i></div>
          <div class="next" @click="prev('follow')"><i class="el-icon-arrow-right"></i></div>
          <div class="content" ref="follow">
            <div class="er-card" v-for="(item, index) in 2" :key="index">
              <div class="card-title">
                随访记录 {{index + 1}}
              </div>
              <div class="card-content">
                <div class="info">
                  <div class="case">问询日期: 2018-01-12</div>
                  <div class="case">终点事件记录日期:2018-01-12</div>
                </div>
                <div class="info">
                  <div class="case">终点事件: 没问题</div>
                  <div class="case">记录情况: 已记录</div>
                  <div class="case">状态 : 已审核</div>
                </div>
                <div class="status">
                  <el-button type="primary" size="mini" plain>查看</el-button>
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
import {getPatientBasic, deletePatient, editPatientBasic, getPatientRecords} from '../../../api/patient/patient.js'
export default {
  name: 'patient_detail',
  components: {
    textRadio
  },
  data () {
    return {
      patientId: '',
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
      editable: true,
      addressOption: []
    }
  },
  mounted () {
    this.addressOption = addressData
    this.getPatient()
  },
  created () {
    this.patientId = this.$route.params.id
  },
  methods: {
    // 根据患者id 获取患者的基本信息
    async getPatient () {
      let info = this.patientId
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
    // 删除患者
    async deletePatient () {
      let info = this.patientId
      let response = await deletePatient(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response)
        this.$router.push('/patient')
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 获取患者的住院记录等
    async getPatientRec () {
      let info = this.patientId
      let response = await getPatientRecords(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response)
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
          info.id = this.patientId
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
    edit () {
      this.editable = false
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
      // min-height: 312px;
      flex:1;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: hidden;
      .record-title{
        float: left;
        font-size: 15px;
        padding: 0 15px;
        b{
         padding-left:10px;
        }
      }
      .prev, .next{
        position: absolute;
        top: 140px;
        width: 20px;
        height: 30px;
        line-height: 32px;
        background-color: rgba($color: #777, $alpha: .55);
        border-radius: 2px;
        cursor: pointer;
        color: #fff;
        text-align: center;
        z-index: 222;
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
      .follow-record{
        position: relative;
        width: 100%;
        .follow{
          border-bottom: 1px solid #ebeef5;
        }
        .content{
          border-bottom: 1px solid #ebeef5;
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
  .content{
    // background-color: rgba($color: #f1f1f1, $alpha: .2);
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
</style>
