<template>
  <div id="system-log">
    <div class="operate-buttons align-right">
      <div class="filter-conditions float-left">
        <span class="light-text">请选择日期范围：</span>
        <el-date-picker
          size="medium"
          v-model="dataRange"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="timeFilter">
        </el-date-picker>
          <el-input size="medium" v-model="searchObj" placeholder="搜索对象ID" clearable style="width:30%;" @keyup.enter.native="search">
            <i slot="prefix" class="el-input__icon el-icon-search" @click="search" style="cursor:pointer;"></i>
          </el-input>
      </div>
      <div class="buttons float-right">
        <el-button type="primary" @click="exportLog">导出日志</el-button>
        <el-button type="primary" @click="clearLog">清空日志</el-button>
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
          prop="operateTime"
          align="center"
          label="操作日期">
        </el-table-column>
        <el-table-column
          prop="ip"
          align="center"
          label="IP地址">
        </el-table-column>
        <el-table-column
          prop="operateAccount"
          align="center"
          label="操作账号">
        </el-table-column>
        <el-table-column
          prop="operate"
          align="center"
          label="操作">
        </el-table-column>
        <el-table-column
          prop="operated"
          align="center"
          label="对象">
        </el-table-column>
        <el-table-column
          prop="detail"
          align="center"
          label="详情"
          show-overflow-tooltip>
        </el-table-column>
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
// import { dateFilter, search, exportLog, clearLog, getAllLog } from '../../../api/log/log.js'
export default {
  name: 'system_detail_log',
  data () {
    return {
      tableData: [
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        },
        {
          operateTime: '2018-10-12',
          ip: '192.168.10.241',
          operateAccount: '10029',
          operate: '删除',
          operated: '32132333',
          detail: '/patient/deleted?id=32132333'
        }
      ],
      dataRange: [],
      searchObj: '',
      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 100,
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
      }
    }
  },
  methods: {
    // async getAllLog () {
    //   let info = {
    //     currentPage: this.currentpage,
    //     pageSize: this.pageSize
    //   }
    //   let response = await getAllLog(info)
    //   if (response.data.mitiStatus === 'SUCCESS') {
    //     this.tableData = response.data.entity.data
    //   } else {
    //     this.$message.error('ERROR: ' + response.data.message)
    //   }
    // },
    // async dateFilter () {
    //   let info = {
    //     currentPage: this.currentpage,
    //     pageSize: this.pageSize
    //   }
    //   let response = await dateFilter(info)
    //   if (response.data.mitiStatus === 'SUCCESS') {
    //     this.tableData = response.data.entity.data
    //   } else {
    //     this.$message.error('ERROR: ' + response.data.message)
    //   }
    // },
    // async exportLog () {
    //   let info = {
    //     currentPage: this.currentpage,
    //     pageSize: this.pageSize
    //   }
    //   let response = await getAllLog(info)
    //   if (response.data.mitiStatus === 'SUCCESS') {
    //     this.tableData = response.data.entity.data
    //   } else {
    //     this.$message.error('ERROR: ' + response.data.message)
    //   }
    // },
    // async search () {
    //   let info = {
    //     currentPage: this.currentpage,
    //     pageSize: this.pageSize
    //   }
    //   let response = await getAllLog(info)
    //   if (response.data.mitiStatus === 'SUCCESS') {
    //     this.tableData = response.data.entity.data
    //   } else {
    //     this.$message.error('ERROR: ' + response.data.message)
    //   }
    // },
    // async clearLog () {
    //   let info = {
    //     currentPage: this.currentpage,
    //     pageSize: this.pageSize
    //   }
    //   let response = await getAllLog(info)
    //   if (response.data.mitiStatus === 'SUCCESS') {
    //     this.tableData = response.data.entity.data
    //   } else {
    //     this.$message.error('ERROR: ' + response.data.message)
    //   }
    // },
    beforeToday (today) {
      console.log(today)
      return false
    },
    exportLog () {
      this.$message.success('导出日志')
    },
    clearLog () {
      this.$message.warning('清空日志')
    },
    timeFilter () {
      console.log(this.dataRange)
    },
    pageSizeChange (size) {
      console.log(size)
    },
    changePage (page) {
      console.log(page)
    },
    search () {
      console.log(this.searchObj)
    }
  },
  mounted () {
    // this.getAllLog()
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
