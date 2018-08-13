<template>
  <div id="system-log">
    <div class="operate-buttons align-right">
      <!-- <el-col :span="6"> -->
        <!-- <el-input size="medium" v-model="searchlog" placeholder="搜索成员" @keyup.enter.native="search">
          <i class="ercp-icon-general-search el-input__icon" slot="suffix" @click="search"></i>
        </el-input> -->
      <!-- </el-col> -->
      <div class="filter-conditions float-left">
        筛选条件
      </div>
      <div class="buttons">
        <el-button type="primary" @click="exportLog">导出日志</el-button>
        <el-button type="primary" @click="clearLog">清空日志</el-button>
      </div>
    </div>
    <div class="system-log">
      <el-table
        :data="tableData"
        style="width: 100%"
        size="medium"
        fit>
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
          label="详情">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
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
        }
      ]
    }
  },
  methods: {
    exportLog () {
      this.$message.success('导出日志')
    },
    clearLog () {
      this.$message.warning('清空日志')
    }
  },
  mounted () {
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
      // height: 40px;
      min-height: 40px;
      line-height: 40px;
      padding:10px 0;
    }
    .system-log{
      flex: 1;
    }
  }
</style>
