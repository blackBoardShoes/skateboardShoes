<template>
  <div id="patient">
    <div class="basic er-card">
      <div class="title">
        <span><i class="ercp-icon-module-patient"></i> <b>基本信息</b></span>
        <span>患者id: {{patientId}}</span>
      </div>
      <div class="basic-information" >
        <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="left" label-width="100px">
          <el-col :span="8">
            <el-form-item label="住院号:" prop="hospitalNumber">
              <el-input v-model="basicInfo.hospitalNumber" :disabled="editable" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="患者姓名:" prop="name">
              <el-input v-model="basicInfo.name" :disabled="editable" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="患者民族:" prop="nation">
              <el-input v-model="basicInfo.nation" :disabled="editable" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="患者性别:" prop="gender">
              <el-radio-group v-model="basicInfo.gender" :disabled="editable">
                <el-radio label="男" value="0"></el-radio>
                <el-radio label="女" value="1"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号:" prop="identity">
              <el-input v-model="basicInfo.identity" :disabled="editable" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式:" prop="concatNumber">
              <el-input v-model="basicInfo.concatNumber" :disabled="editable" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="常居住地" prop="province">
              <el-cascader
                :options="addressOption"
                v-model="basicInfo.province" :disabled="editable"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="permanentAddress" label="街道地址">
              <el-input v-model="basicInfo.permanentAddress" :disabled="editable"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div class="operate">
          <!-- <span class="light-text">提示:所有项目为必填项,请认真填写</span> -->
          <div class="float-right">
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="primary" size="small" v-if="editable" @click="edit">编辑</el-button>
            <el-button type="primary" size="small" v-if="!editable" @click="changePatientInfo">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="records er-card">
      <div class="hospital-record">
        <div class="title">
            <i class="ercp-icon-medicine-hospital"></i>
            <b>住院记录</b>
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
                  住院基本情况
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
      <div class="follow-record">
        <div class="title follow">
            <i class="ercp-icon-medicine-followup"></i>
            <b>随访记录</b>
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
</template>
<script>
import {addressData} from '../../../data/address/addressData'
export default {
  name: 'patient_detail',
  data () {
    return {
      patientId: '',
      basicInfo: {
        name: '刘能',
        gender: '男',
        nation: '汉族',
        hospitalNumber: '123456789',
        identity: '345213198763542671',
        concatNumber: '13688888888',
        province: ['210000', '211200', '211221'],
        permanentAddress: '象牙山'
      },
      rules: {
        name: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        nation: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        hospitalNumber: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        identity: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        concatNumber: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        province: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        permanentAddress: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }]
      },
      editable: true,
      addressOption: []
    }
  },
  mounted () {
    this.addressOption = addressData
  },
  created () {
    this.patientId = this.$route.params.id
  },
  methods: {
    handleChange (data) {
      console.log(data)
    },
    edit () {
      this.editable = false
    },
    changePatientInfo () {
      console.log(this.basicInfo)
      this.editable = true
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
  #patient{
    // position: absolute;
    // left: 16px;
    // right: 16px;
    // top: 16px;
    width: 100%;
    min-height: 100%;
    padding: 16px;
    overflow: auto;
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
      // min-height: 280px;
      flex:1;
      box-sizing: border-box;
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
        line-height: 30px;
        background-color: rgba($color: #000000, $alpha: .55);
        cursor: pointer;
        color: #fff;
        text-align: center;
        z-index: 222;
      }
      .prev:hover, .next:hover{
        background-color: rgba($color: #000000, $alpha: .65);
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
