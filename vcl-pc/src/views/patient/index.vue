<template>
  <div id="patient">
    <el-card class="patient-statistics" :body-style="{flex:1,'box-sizing': 'border-box','padding':'10px'}">
      <div class="card-title" slot="header" style="height:0px;">
        <i class="ercp-icon-general-summary"></i> <b>系统概览</b>
        <span class="float-right light-text">患者总数：{{patientAccount}}人</span>
      </div>
      <div class="card-content">
        <div class="gender">
          <chart ref="A" :options="optionA" auto-resize style="width: 100%;height: 100%;"></chart>
        </div>
        <div class="area">
          <chart ref="B" :options="optionB" auto-resize style="width: 100%;height: 100%;"></chart>
        </div>
      </div>
    </el-card>
    <el-card class="patient-list" :body-style="{height:'100%','box-sizing': 'border-box'}">
      <div class="card-title" slot="header">
        <i class="ercp-icon-module-patient"></i><b>患者列表</b>
      </div>
      <div class="card-content">
        <div class="operate">
          <div class="serach float-left">
            <el-input
              clearable
              v-model="searchText"
              placeholder="姓名 / 身份证号 / 住院编号"
              @keyup.enter.native="search"
              style="width: auto;vertical-align: middle;width:300px;">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="search" style="cursor:pointer;"></i>
            </el-input>
          </div>
          <div class="refresh float-right">
            <el-button type="primary" @click="refresh">更新患者</el-button>
            <el-button type="primary" @click="add">添加患者</el-button>
          </div>
        </div>
        <!-- 患者列表 -->
        <div class="table">
          <el-table
            :data="tableData"
            style="width: 100%"
            size="small"
            fit
            height="100%">
            <el-table-column
              prop="name"
              align="center"
              label="姓名"
              :width="80">
            </el-table-column>
            <el-table-column
              prop="gender"
              align="center"
              label="性别"
              :width="60">
            </el-table-column>
            <el-table-column
              prop="nation"
              align="center"
              label="民族"
              :width="80">
            </el-table-column>
            <el-table-column
              prop="hospitalNumber"
              align="center"
              label="住院编号"
              :width="120">
            </el-table-column>
            <!-- <el-table-column
              prop="identity"
              align="center"
              label="身份证编号"
              :width="200">
            </el-table-column> -->
            <el-table-column
              prop="concatNumber"
              align="center"
              label="联系方式"
              :width="140">
            </el-table-column>
            <el-table-column
              prop="permanentAddress"
              align="center"
              label="常住地址">
            </el-table-column>
            <el-table-column
              prop="operate"
              align="center"
              label="操作"
              :width="120"
              fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="small" plain @click="viewPatient(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 列表分页 -->
        <div class="pagination align-right">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 15, 20]"
            :total="total"
            :current-page="currentpage"
            :page-size="pagesize"
            @size-change= "pageSize"
            @current-change = "changePage"
          >
          </el-pagination>
        </div>
      </div>
      <el-dialog title="添加患者" :visible.sync="dialogTableVisible" :modal="true" append-to-body>
        <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="right" label-width="100px">
          <el-col :span="24">
            <el-form-item label="患者姓名:" prop="name">
              <el-input v-model="basicInfo.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="患者性别:" prop="gender">
              <el-radio-group v-model="basicInfo.gender">
                <el-radio label="男" value="0"></el-radio>
                <el-radio label="女" value="1"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="患者名族:" prop="nation">
              <el-input v-model="basicInfo.nation" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="住院编号:" prop="hospitalNumber">
              <el-input v-model="basicInfo.hospitalNumber" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="身份证号:" prop="identity">
              <el-input v-model="basicInfo.identity" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系方式:" prop="concatNumber">
              <el-input v-model="basicInfo.concatNumber" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常居住地" prop="province">
              <el-cascader
                :options="addressOption"
                v-model="basicInfo.province"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="permanentAddress" label="">
              <el-input v-model="basicInfo.permanentAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div class="operate align-center">
          <el-button type="info" @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirmAdd">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import {addressData} from '../../data/address/addressData'
import {charts} from '../../data/chartTemplates/chart'
export default {
  name: 'patient_index',
  data () {
    return {
      patientAccount: 3515,
      tableData: [
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第一家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第二家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第三家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第四家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第五家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第一家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第二家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第三家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第四家', operate: '查看'
        },
        {
          name: '一只鱼', gender: '男', nation: '汉族', hospitalNumber: '3213213213', identity: '3607311747657462637', concatNumber: '15558175716', permanentAddress: '甘肃省武威市凉州区武南镇小东河村毛家山组15号左边第五家', operate: '查看'
        }
      ],
      searchText: '',
      dialogTableVisible: false,
      // 分页信息：
      pagesize: 10,
      currentpage: 1,
      total: 100,
      optionA: {},
      optionB: {},
      basicInfo: {
        name: '',
        gender: '',
        nation: '',
        hospitalNumber: '',
        identity: '',
        concatNumber: '',
        province: [],
        permanentAddress: ''
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
      addressOption: []
    }
  },
  methods: {
    // 初始化图表信息
    initCharts () {
      this.optionA = charts[1]
      this.optionB = charts[2]
    },
    // 搜索患者
    search () {
      this.$message.success(this.searchText)
    },
    // 查看具体患者
    viewPatient (value) {
      console.log(value)
      this.$router.push(`/patient/detail/${value.hospitalNumber}`)
    },
    // 更新患者列表
    refresh () {
      this.$message.success('更新患者成功，成功添加3名患者')
    },
    // 地区
    handleChange (data) {
      console.log(data)
    },
    // 弹出添加患者的对话框
    add () {
      this.dialogTableVisible = true
    },
    // 取消添加
    cancel () {
      this.dialogTableVisible = false
      this.$refs.basicForm.resetFields()
    },
    // 确认添加患者
    confirmAdd () {
      this.$refs.basicForm.validate(valid => {
        if (valid) {
          console.log(this.basicInfo)
        } else {
          return false
        }
      })
    },
    // 列表页码信息
    pageSize (size) {
      console.log(size)
    },
    changePage (page) {
      console.log(page)
    }
  },
  mounted () {
    this.addressOption = addressData
    this.initCharts()
  }
}
</script>
<style lang="scss" scoped>
#patient{
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  top: 16px;
  display: flex;
  flex-direction: column;
  .patient-statistics{
    flex: 0 0 240px;
    display: flex;
    flex-direction: column;
    .el-card_header{
      height: 50px;
      box-sizing: border-box;
      padding: 10px 20px;
    }
    .el-card__body{
      .card-content{
        height:100%;
        padding: 0px;
        .gender{
          width:30%;
          height:100%;
          float: left;
          padding: 5px 10px;
          box-sizing: border-box;
          border-right:1px dotted #eee;
        }
        .area{
          width: 70%;
          height:100%;
          float: left;
          padding: 5px 10px;
          box-sizing: border-box;
        }
      }
    }
  }
  .patient-list{
    flex: 1;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    .el-card_header{
      height: 57px;
      padding: 10px 20px;
    }
    .el-card__body{
      flex: 1;
      .card-content{
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        // overflow: auto;
        .operate{
          min-height: 60px;
          box-sizing: border-box;
          padding: 10px 0;
        }
        .table{
          flex:1;
          height:100px;
        }
        .pagination{
          margin-top: 10px;
          min-height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  .card-title{
    height: 10px;
    line-height: 10px;
    font-size: 15px;
    b{
      padding-left:10px;
    }
  }
  .el-table__header-wrapper{
    background-color: #eee;
  }
}
</style>
