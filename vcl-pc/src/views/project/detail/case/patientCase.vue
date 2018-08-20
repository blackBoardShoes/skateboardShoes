<template>
  <div id="project-member">
    <div class="operate-buttons align-right">
      <el-button size="medium" type="primary" @click="clear">清空案例</el-button>
      <el-button size="medium" type="primary" @click="add">添加案例</el-button>
    </div>
    <div class="project-info">
      <el-table
        :data="tableData"
        style="width: 100%"
        size="medium"
        fit>
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="hospNum"
          align="center"
          label="住院号">
        </el-table-column>
        <el-table-column
          prop="serialNum"
          align="center"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="gender"
          align="center"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="dischargeStatus"
          align="center"
          label="出院状态">
        </el-table-column>
        <el-table-column
          prop="joinTime"
          align="center"
          label="入组日期">
        </el-table-column>
        <el-table-column
          prop="operate"
          align="center"
          label="操作"
          fixed="right"
          width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain @click="viewCase(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Project_detail_member',
  data () {
    return {
      tableData: [
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '健康',
          joinTime: '2018-09-10'
        },
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '不健康',
          joinTime: '2018-09-10'
        },
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '健康',
          joinTime: '2018-09-10'
        },
        {
          hospNum: '2321323232',
          serialNum: '654564321123',
          name: '王小虎',
          gender: '男',
          dischargeStatus: '健康',
          joinTime: '2018-09-10'
        }
      ]
    }
  },
  methods: {
    viewCase (value) {
      this.$message.warning('查看的是' + value.department + '的' + value.name)
    },
    removeMember (value) {
      this.$message.warning('移除成员')
    },
    add () {
      this.$message.warning('添加案例')
    },
    clear () {
      this.$message.warning('清空案例')
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/variable';
  #project-member{
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
    .project-info{
      flex: 1;
      position: relative;
    }
  }
</style>
