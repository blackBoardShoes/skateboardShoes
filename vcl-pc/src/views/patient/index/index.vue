<template>
  <div id="patient">
    <el-card class="patient-statistics" :body-style="{flex:1,'box-sizing': 'border-box','padding':'10px'}">
      <div class="card-title" slot="header" style="height:0px;">
        <i class="ercp-icon-general-summary"></i> <b>系统概览</b>
        <span class="float-right light-text">患者总数：<span class="primary-text">{{patientAccount}}</span> 人</span>
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
              style="width:300px;">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="search" style="cursor:pointer;"></i>
            </el-input>
          </div>
          <!-- <div class="refresh float-right">
            <el-button type="primary" @click="refresh">更新患者</el-button>
            <el-button type="primary" @click="add">新增患者</el-button>
          </div> -->
        </div>
        <!-- 患者列表 -->
        <div class="table">
          <el-table
            :data="tableData"
            style="width: 100%"
            size="small"
            fit
            height="100%"
            class="absolute-table">
            <el-table-column
              show-overflow-tooltip
              prop="hospitalId"
              align="center"
              label="住院号"
              :width="110">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name"
              align="center"
              label="姓名"
              :width="110">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="gender"
              align="center"
              label="性别"
              :width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.gender === '1' ? '男' : '女' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="nation"
              align="center"
              label="民族"
              :width="80">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="phoneNum"
              align="center"
              label="联系方式"
              :width="140">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
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
            background
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[5, 10, 15, 20]"
            :total="total"
            :current-page="currentPage"
            :page-size="pageSize"
            @size-change= "SizeChange"
            @current-change = "changePage"
          >
          </el-pagination>
        </div>
      </div>
      <!-- <el-dialog title="新增患者" :visible.sync="dialogTableVisible" :modal="true" append-to-body width="700px">
        <el-form ref="basicForm" :rules="rules" :model="basicInfo" label-position="right" label-width="80px">
          <el-col :span="24">
            <el-form-item label="住院号" prop="hospitalId">
              <el-input v-model="basicInfo.hospitalId" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="basicInfo.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="basicInfo.gender">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="民族">
              <text-radio v-model="basicInfo.nation" :options="['汉族','回族','藏族']"></text-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="basicInfo.idCard" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系方式" prop="phoneNum">
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
      </el-dialog> -->
    </el-card>
  </div>
</template>
<script>
import textRadio from '../../../components/textRadio/textRadio'
import {addressData} from '../../../data/address/addressData'
import {charts} from '../../../data/chartTemplates/chart'
import { getAllPatient, searchPatient, getDataByGender, getDataByArea } from '../../../api/patient/patient.js'
export default {
  name: 'patient_index',
  components: {
    textRadio
  },
  data () {
    return {
      patientAccount: 0,
      tableData: [
      ],
      searchText: '',
      dialogTableVisible: false,
      // 分页信息：
      pageSize: 10,
      currentPage: 1,
      total: 0,
      optionA: {},
      optionB: {}
      // basicInfo: {
      //   hospitalId: '',
      //   name: '',
      //   gender: '1',
      //   nation: '维吾尔族',
      //   idCard: '360731199501234567',
      //   phoneNum: '13687654321',
      //   province: '',
      //   city: '',
      //   district: '',
      //   staAddress: '芝麻街12号',
      //   address: ['浙江省', '杭州市', '滨江区']
      // },
      // rules: {
      //   name: [{
      //     required: true,
      //     message: '必填项不能为空',
      //     trigger: 'change'
      //   }],
      //   gender: [{
      //     required: true,
      //     message: '必填项不能为空',
      //     trigger: 'change'
      //   }],
      //   hospitalId: [
      //     {
      //       required: true,
      //       message: '必填项不能为空',
      //       trigger: 'change'
      //     }
      //   ],
      //   phoneNum: [
      //     { validator (rule, value, callback) {
      //       setTimeout(() => {
      //         if (value !== '') {
      //           let pattern = /^\d[\d-]{5,12}$/
      //           if (!pattern.test(value)) {
      //             callback(new Error('请输入正确的联系方式'))
      //           } else {
      //             callback()
      //           }
      //         } else {
      //           callback()
      //         }
      //       }, 1500)
      //     }}
      //   ],
      //   idCard: [
      //     { validator (rule, value, callback) {
      //       setTimeout(() => {
      //         if (value !== '') {
      //           let pattern = /^\d{17}[\dxX]$/
      //           if (!pattern.test(value)) {
      //             callback(new Error('请输入正确的身份证号'))
      //           } else {
      //             callback()
      //           }
      //         } else {
      //           callback()
      //         }
      //       }, 1500)
      //     }}
      //   ]
      // },
      // addressOption: []
    }
  },
  mounted () {
    this.addressOption = addressData
    this.getPatient(10, 1)
    this.initCharts()
  },
  methods: {
    // 初始化图表信息
    initCharts () {
      let info = charts
      this.optionA = Object.assign({}, info[1])
      this.optionB = Object.assign({}, info[2])
      this.dataByGender()
      this.dataByArea()
    },
    async dataByGender () {
      // 获取和同步根据性别统计
      let response = await getDataByGender()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        let data = response.data.entity
        this.optionA.title.text = data.title || ''
        this.optionA.title.subtext = '共计' + data.total + '人' || ''
        this.patientAccount = data.total
        this.optionA.series[0].data = data.data || []
        this.optionA.series[0].name = data.title || ''
        this.optionA.legend.data = data.types
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async dataByArea () {
      let response = await getDataByArea()
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        let data = response.data.entity
        this.optionB.title.text = data.title || ''
        this.optionB.title.subtext = '共计' + data.total + '人' || ''
        // this.patientAccount = data.total
        this.optionB.xAxis[0].data = data.types || []
        this.optionB.series[0].name = data.title || ''
        this.optionB.series[0].data = data.data
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 搜索患者
    async search () {
      let info = this.searchText
      let response = await searchPatient(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData = response.data.entity.data
        this.total = response.data.entity.total
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 查看具体患者
    viewPatient (value) {
      let data = JSON.stringify(value)
      this.$router.push(`/patient/detail/${data}`)
    },
    // 更新患者列表
    refresh () {
      this.$message.success('从医院的his系统更新患者')
    },
    // 列表页码信息
    SizeChange (size) {
      this.pageSize = size
      this.getPatient(size, this.currentPage)
    },
    changePage (page) {
      this.currentPage = page
      this.getPatient(this.pageSize, page)
    },
    async getPatient (pageSize, currentPage) {
      let info = {
        currentPage: currentPage,
        pageSize: pageSize
      }
      let response = await getAllPatient(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData = response.data.entity.data
        this.total = response.data.entity.total
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    }
    // 地区
    // handleChange (data) {
    //   if (data.length === 2) {
    //     this.basicInfo.province = data[0]
    //     this.basicInfo.city = data[0]
    //     this.basicInfo.district = data[1]
    //   } else if (data.length === 3) {
    //     this.basicInfo.province = data[0]
    //     this.basicInfo.city = data[1]
    //     this.basicInfo.district = data[2]
    //   } else {
    //     this.basicInfo.province = ''
    //     this.basicInfo.city = ''
    //     this.basicInfo.district = ''
    //   }
    // },
    // 弹出添加患者的对话框
    // add () {
    //   this.dialogTableVisible = true
    // },
    // 取消添加
    // cancel () {
    //   this.dialogTableVisible = false
    //   this.$refs.basicForm.resetFields()
    // },
    // // 确认添加患者
    // async confirmAdd () {
    //   this.$refs.basicForm.validate(async valid => {
    //     if (valid) {
    //       let info = this.basicInfo
    //       delete info.address
    //       let response = await addPatient(info)
    //       if (response.data.mitiStatus === 'SUCCESS') {
    //         this.getPatient(this.pageSize, 1)
    //         this.$refs.basicForm.resetFields()
    //         this.dialogTableVisible = false
    //       } else {
    //         this.$message.error('ERROR: ' + response.data.message)
    //       }
    //     } else {
    //       return false
    //     }
    //   })
    // }
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
  // 系统概览
  .patient-statistics{
    flex: 0 0 30%;
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
          position: relative;
        }
        .area{
          width: 70%;
          height:100%;
          float: left;
          padding: 5px 10px;
          box-sizing: border-box;
          position: relative;
        }
      }
    }
  }
  // 患者列表
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
        .operate{
          min-height: 60px;
          box-sizing: border-box;
          padding: 5px 0;
        }
        .table{
          flex:1;
          height:100px;
          position: relative;
        }
        .pagination{
          margin-top: 12px;
          min-height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  // 标题
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
