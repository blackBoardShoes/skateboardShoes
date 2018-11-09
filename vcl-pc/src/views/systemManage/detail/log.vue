<template>
  <div id="system-log">
    <div class="operate-buttons">
      <div class="filter-conditions float-left">
        <el-input size="medium" v-model="searchObj" placeholder="搜索操作账号" clearable style="flex:1;">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search" style="cursor:pointer;"></i>
        </el-input>
        <el-select v-model="operateType" style="flex:1;margin:0 20px;" size="medium" placeholder="请选择操作方式" clearable>
          <el-option label="GET" value="GET"></el-option>
          <el-option label="POST" value="POST"></el-option>
          <el-option label="DELETE" value="DELETE"></el-option>
          <el-option label="PUT" value="PUT"></el-option>
        </el-select>
        <el-date-picker
          style="flex:2;margin-right: 20px;"
          size="medium"
          v-model="dataRange"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-button @click="search" size="small" type="primary">搜索</el-button>
      </div>
      <div class="buttons float-right">
      </div>
    </div>
    <div class="system-log">
      <el-table
        :data="tableData"
        size="medium"
        fit
        height="100%"
        class="absolute-table">
        <el-table-column
          show-overflow-tooltip
          prop="time"
          align="center"
          label="操作日期">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="uriMessage"
          align="center"
          label="接口地址">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="username"
          align="center"
          label="操作账号">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="methodType"
          align="center"
          label="操作">
        </el-table-column>
        <!-- <el-table-column
          show-overflow-tooltip
          prop="operated"
          align="center"
          label="对象">
        </el-table-column> -->
        <!-- <el-table-column
          prop="bodyMessage"
          align="center"
          label="详情"
          show-overflow-tooltip>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination align-right">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 15, 20]"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change= "pageSizeChange"
        @current-change = "changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { dateFilter, getLog, exportLog, clearLog } from '../../../api/log/log.js'
export default {
  name: 'system_detail_log',
  data () {
    return {
      tableData: [
      ],
      dataRange: [],
      searchObj: '',
      // 分页
      pageSize: 20,
      currentPage: 1,
      total: 0,
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      operateType: ''
    }
  },
  methods: {
    async dateFilter (startTime, endTime) {
      let info = {
        startTime: startTime,
        endTime: endTime,
        currentPage: 1,
        pageSize: this.pageSize
      }
      let response = await dateFilter(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.total = response.data.entity.total
        this.tableData = response.data.entity.data
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async exportLog () {
      let info = {
        currentPage: this.currentpage,
        pageSize: this.pageSize
      }
      let response = await exportLog(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData = response.data.entity.data
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async getLog (currentPage, pageSize) {
      let info = {
        currentPage: currentPage,
        pageSize: pageSize,
        username: this.searchObj,
        type: this.operateType,
        startTime: this.dataRange === null ? '' : this.dataRange[0] + ' 00:00:00',
        endTime: this.dataRange === null ? '' : this.dataRange[0] + ' 00:00:00'
      }
      let response = await getLog(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData = response.data.entity.data
        this.total = response.data.entity.total
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async clearLog () {
      let info = {
        currentPage: this.currentpage,
        pageSize: this.pageSize
      }
      let response = await clearLog(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData = response.data.entity.data
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    search () {
      this.getLog(1, this.pageSize)
    },
    beforeToday (today) {
      return false
    },
    // timeFilter () {
    //   console.log(this.dataRange)
    //   if (this.dataRange) {
    //     this.dateFilter(this.dataRange[0] + ' 00:00:00', this.dataRange[1] + ' 00:00:00')
    //   } else {
    //     this.getLog(1, this.pageSize)
    //   }
    // },
    pageSizeChange (size) {
      this.pageSize = size
      this.getLog(this.currentPage, this.pageSize)
    },
    changePage (page) {
      this.currentPage = page
      this.getLog(this.currentPage, this.pageSize)
    }
  },
  mounted () {
    this.getLog(1, this.pageSize)
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/variable';
  #system-log{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:16px;
    display: flex;
    flex-direction: column;
    .operate-buttons{
      height: 40px;
      min-height: 40px;
      width: 100%;
      line-height: 40px;
      padding:10px 0;
      display: flex;
      flex-direction: row;
      .filter-conditions{
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .buttons{
        width: auto;
      }
    }
    .system-log{
      flex: 1;
      width: 100%;
      overflow: auto;
      position: relative;
    }
    .pagination{
      margin-top: 10px;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
