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
    </el-card>
  </div>
</template>
<script>
import textRadio from '../../../components/textRadio/textRadio'
import {addressData} from '../../../data/address/addressData'
import {initChart} from '../../../data/chartTemplates/chart'
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
      this.dataByGender()
      this.dataByArea()
    },
    async dataByGender () {
      // 获取和同步根据性别统计
      let response = await getDataByGender()
      if (response.data.mitiStatus === 'SUCCESS') {
        let data = response.data.entity
        this.patientAccount = data.total
        let obj = {
          text: data.title,
          subtext: '共计' + data.total + '人',
          classes: data.types,
          data: data.data
        }
        this.optionA = initChart(this.optionA, obj, 2)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async dataByArea () {
      let response = await getDataByArea()
      if (response.data.mitiStatus === 'SUCCESS') {
        let data = response.data.entity
        let obj = {
          text: data.title,
          subtext: '共计' + data.total + '人',
          classes: data.types,
          data: data.data
        }
        this.optionB = initChart(this.optionB, obj, 3)
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
  overflow: auto;
  // 系统概览
  .patient-statistics{
    flex: 0 0 30%;
    min-height: 280px;
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
    // min-height: 500px;
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
