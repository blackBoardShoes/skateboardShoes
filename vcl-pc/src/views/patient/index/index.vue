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
              placeholder="姓名 / 身份证号 / 住院号"
              @keyup.enter.native="search"
              style="width: auto;vertical-align: middle;width:300px;">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="search" style="cursor:pointer;"></i>
            </el-input>
          </div>
          <div class="refresh float-right">
            <el-button type="primary" @click="refresh">更新患者</el-button>
            <el-button type="primary" @click="add">新增患者</el-button>
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
              prop="hospitalId"
              align="center"
              label="住院号"
              :width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="姓名"
              :width="120">
            </el-table-column>
            <el-table-column
              prop="gender"
              align="center"
              label="性别"
              :width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.gender === 1 ? '男' : '女' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="nation"
              align="center"
              label="民族"
              :width="120">
            </el-table-column>
            <!-- <el-table-column
              prop="identity"
              align="center"
              label="身份证编号"
              :width="200">
            </el-table-column> -->
            <el-table-column
              prop="phoneNum"
              align="center"
              label="联系方式"
              :width="140">
            </el-table-column>
            <el-table-column
              prop="address"
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
            :current-page="currentPage"
            :page-size="pageSize"
            @size-change= "SizeChange"
            @current-change = "changePage"
          >
          </el-pagination>
        </div>
      </div>
      <el-dialog title="新增患者" :visible.sync="dialogTableVisible" :modal="true" append-to-body>
        <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="right" label-width="100px">
          <el-col :span="24">
            <el-form-item label="住院号:" prop="hospitalId">
              <el-input v-model="basicInfo.hospitalId" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="患者姓名:" prop="name">
              <el-input v-model="basicInfo.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="患者性别:" prop="gender">
              <el-radio-group v-model="basicInfo.gender">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="患者民族:">
              <el-input v-model="basicInfo.nation" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="身份证号:">
              <el-input v-model="basicInfo.idCard" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系方式:">
              <el-input v-model="basicInfo.phoneNum" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常居住地">
              <el-cascader
                :options="addressOption"
                value-key="label"
                v-model="basicInfo.address"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="staAddress" label="街道地址">
              <el-input v-model="basicInfo.staAddress"></el-input>
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
import {addressData} from '../../../data/address/addressData'
import {charts} from '../../../data/chartTemplates/chart'
import { getAllPatient, addPatient, searchPatient } from '../../../api/patient/patient.js'
export default {
  name: 'patient_index',
  data () {
    return {
      patientAccount: 3515,
      tableData: [
        {
          // 全部地址
          address: '哈哈苑',
          age: 30,
          // 城市
          city: '杭州',
          // 区县
          district: '滨江区',
          gender: 1,
          // 患者编号（住院编号）
          hospitalId: '001',
          // 住院记录
          hospitalRecord: null,
          // 数据库id
          id: '01',
          // 身份证
          idCard: '362321',
          localCaseId: null,
          name: '刘一',
          nation: '汉',
          note: null,
          operationRecord: null,
          participantId: null,
          // 联系方式
          phoneNum: null,
          // 省
          province: '浙江',
          publicId: null,
          // 详细地址
          staAddress: null
        }
      ],
      searchText: '',
      dialogTableVisible: false,
      // 分页信息：
      pageSize: 10,
      currentPage: 1,
      total: 20,
      optionA: {},
      optionB: {},
      basicInfo: {
        hospitalId: '',
        name: '',
        gender: '1',
        nation: '汉',
        idCard: '',
        phoneNum: '13213323123',
        province: '浙江省',
        city: '杭州市',
        district: '滨江区',
        staAddress: '',
        address: ['浙江省', '杭州市', '滨江区']
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
        hospitalId: [{
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
    async search () {
      let info = this.searchText
      let response = await searchPatient(info)
      console.log(response)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
      this.$message.success(this.searchText)
    },
    // 查看具体患者
    viewPatient (value) {
      console.log(value)
      this.$router.push(`/patient/detail/${value.hospitalId}`)
    },
    // 更新患者列表
    refresh () {
      this.$message.success('从医院的his系统更新患者')
    },
    // 地区
    handleChange (data) {
      this.basicInfo.province = data[0]
      this.basicInfo.city = data[1]
      this.basicInfo.district = data[2]
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
    async confirmAdd () {
      this.$refs.basicForm.validate(async valid => {
        if (valid) {
          let info = this.basicInfo
          delete info.address
          let response = await addPatient(info)
          if (response.data.mitiStatus === 'SUCCESS') {
            this.getPatient(10, 1)
            this.$refs.basicForm.resetFields()
            this.dialogTableVisible = false
          } else {
            this.$message.error('ERROR: ' + response.data.message)
          }
        } else {
          return false
        }
      })
    },
    // 列表页码信息
    SizeChange (size) {
      console.log(size)
      this.getPatient(size, this.currentPage)
    },
    changePage (page) {
      console.log(page)
      this.getPatient(this.pageSize, page)
    },
    async getPatient (pageSize, currentPage) {
      let info = {
        currentPage: currentPage,
        pageSize: pageSize
      }
      let response = await getAllPatient(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data)
        this.tableData = response.data.entity
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    }
  },
  mounted () {
    this.addressOption = addressData
    this.getPatient(10, 1)
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
