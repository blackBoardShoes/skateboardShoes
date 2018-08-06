<template>
  <div id="patient">
    <div class="basic er-card">
      <div class="title">
        <span><i class="ercp-icon-module-patient"></i> <b>基本信息</b></span>
        <span>患者ID: {{patientId}}</span>
      </div>
      <div class="basic-information" >
        <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="right" label-width="100px">
          <el-col :span="8">
            <el-form-item label="患者姓名:" prop="name">
              <el-input v-model="basicInfo.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="患者性别:" prop="gender">
              <el-radio-group v-model="basicInfo.gender">
                <el-radio label="男" value="0"></el-radio>
                <el-radio label="女" value="1"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="患者名族:" prop="nation">
              <el-input v-model="basicInfo.nation" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="住院编号:" prop="hospitalNumber">
              <el-input v-model="basicInfo.hospitalNumber" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="身份证号:" prop="identity">
              <el-input v-model="basicInfo.identity" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式:" prop="concatNumber">
              <el-input v-model="basicInfo.concatNumber" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="常居住地:" prop="permanentAddress">
             <el-select v-model="basicInfo.permanentAddress" placeholder="请选择">
              <el-option label="甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第一家" value="甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第一家"></el-option>
              <el-option label="甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第二家" value="甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第二家"></el-option>
              <el-option label="甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第三家" value="甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第三家"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <div class="operate">
          <span class="light-text">提示:所有项目为必填项,请认真填写</span>
          <div class="float-right">
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="info" size="small">返回</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="records er-card">
      <el-collapse accordion>
        <el-collapse-item v-for="item in 2" :key="item">
          <template slot="title">
            <div class="record-title ">
              <i class="ercp-icon-medicine-hospital"></i>
              <b>住院记录</b>
              <span class="square-grey-text">2</span>
            </div>
            <div class="record-title ">
              <span class="light-text">主管医生：</span>
              <span>苗雪峰</span>
            </div>
            <div class="record-title ">
              <span class="light-text">术后诊断：</span>
              <span>无胆囊胆总管结石</span>
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
          <div class="content">
            <div class="er-card" v-for="(item, index) in 6" :key="index" :style="{order: index + 1}">
              <div class="card-title">
                术前记录 {{index}}
              </div>
              <div class="card-content">
                <div class="info">
                  <div class="case">系统编号 : 32132133312</div>
                  <div class="case">内镜编号 : 32132123213213</div>
                </div>
                <div class="info">
                  <div class="case">录入情况 : 张雪峰2018-08-03</div>
                  <div class="case">审核情况 : 马小跳2018-08-03</div>
                  <div class="case">审核状态 : 已审核</div>
                </div>
                <div class="status">
                  已审核通过
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- <div class="title">
        <span><i class="ercp-icon-medicine-followup"></i> <b>随访记录</b></span>
        <span class="radial-text-primary">2</span>
        <span class="light-text">最近随访: </span>
        <span>2018-10-18</span>
        <span class="light-text">随访人员:</span>
        <span>杨青云</span>
        <span class="light-text">随访状态:</span>
        <span>正常</span>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'patient_detail',
  data () {
    return {
      patientId: '',
      basicInfo: {
        name: '一只鱼',
        gender: '男',
        nation: '汉族',
        hospitalNumber: '3213213213',
        identity: '3607311747657462637',
        concatNumber: '15558175716',
        permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第一家'
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
        permanentAddress: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }]
      }
    }
  },
  mounted () {
  },
  created () {
    this.patientId = this.$route.params.id
  },
  methods: {
  }
}
</script>
@import '../../assets/css/variable'
<style lang="scss" scoped>
  #patient{
    position: absolute;
    left: 16px;
    right: 16px;
    top: 16px;
    bottom: 16px;
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
        padding: 10px;
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
      flex:1;
      overflow-y: auto;
      box-sizing: border-box;
      .record-title{
        float: left;
        font-size: 15px;
        padding: 0 20px;
        b{
         padding-left:10px;
        }
      }
      .content{
        padding: 20px;
        height: 260px;
        width: 100%;
        display: flex;
        flex-direction: row;
        // flex-wrap: nowrap;
        box-sizing: border-box;
        .er-card{
          width: 240px;
          height: 220px;
          display: inline-block;
          margin: 0px 25px;
          .card-title{
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            background-color: #D1D1D1;
          }
          .card-content{
            padding: 10px;
            .info{
              padding: 5px 0;
              line-height: 25px;
              width: 100%;
              border-bottom: 1px dotted #D1D1D1;
            }
            .status{
              line-height: 30px;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .title{
    font-size: 15px;
    padding: 18px 20px;
    // text-indent: 2em;
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
