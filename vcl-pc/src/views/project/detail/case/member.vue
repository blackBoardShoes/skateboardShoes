<template>
  <div id="project-member">
    <div class="operate-buttons align-right" v-if="selfBuild">
      <el-select v-model="addedMember" filterable style="margin-right:20px;width:260px;" placeholder="请搜索成员或选择成员列表">
        <el-option
          v-for="(item, index) in memberOptions"
          :laebl="item.name"
          :value="item.username"
          :key="index">
          <span style="float: left; color: #8492a6; font-size: 11px">{{ '账号：' + item.username }}</span>
          <span style="float: right; color: #8492a6; font-size: 11px">{{ '姓名：' + item.name }}</span>
        </el-option>
      </el-select>
      <el-button size="medium" type="primary" @click="add" >添加成员</el-button>
    </div>
    <div class="project-info">
      <el-table
        class="absolute-table"
        :data="tableData"
        height="100%"
        style="width: 100%;"
        size="large"
        fit>
        <el-table-column
          prop="account"
          align="center"
          label="账号">
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
          prop="department"
          align="center"
          label="科室">
        </el-table-column>
        <el-table-column
          prop="role"
          align="center"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="joinTime"
          align="center"
          label="加入日期">
        </el-table-column>
        <el-table-column
          prop="operate"
          align="center"
          label="操作"
          fixed="right"
          width="120"
          v-if="userName === projectInfo.creator">
          <template slot-scope="scope">
            <el-button type="danger" size="small" plain @click="removeMember(scope.row)">移除</el-button>
          </template>
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
        @size-change= "SizeChange"
        @current-change = "changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Project_detail_member',
  props: {
    selfBuild: {
      type: Boolean,
      required: true
    },
    projectInfo: {
      type: Object,
      required: true
    },
    projectId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tableData: [
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室1',
          role: '医生',
          joinTime: '2018-09-10'
        },
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室2',
          role: '医生',
          joinTime: '2018-09-10'
        },
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室3',
          role: '医生',
          joinTime: '2018-09-10'
        },
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室4',
          role: '科研管理员',
          joinTime: '2018-09-10'
        },
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室1',
          role: '科研管理员',
          joinTime: '2018-09-10'
        },
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室2',
          role: '科研管理员',
          joinTime: '2018-09-10'
        },
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室3',
          role: '科研管理员',
          joinTime: '2018-09-10'
        }
      ],
      addedMember: '',
      memberOptions: [
        {
          username: '111111',
          name: '王小虎'
        },
        {
          username: '222222',
          name: '王二虎'
        },
        {
          username: '333333',
          name: '王三虎'
        }
      ],
      projectMes: {
        creator: '王二虎'
      },
      // 分页信息
      pageSize: 10,
      currentPage: 1,
      total: 40,
      userName: ''
    }
  },
  methods: {
    removeMember (value) {
      this.$message.warning('移除成员' + value.department + '的' + value.name)
    },
    add () {
      if (this.addedMember) {
        this.$message.success(this.addedMember)
      } else {
        this.$message.warning('请选择一个成员')
      }
    },
    // 列表页码信息
    SizeChange (size) {
      console.log(size)
      // this.getProject(size, this.currentPage)
    },
    changePage (page) {
      console.log(page)
      // this.getProject(this.pageSize, page)
    }
  },
  mounted () {
    console.log(this.selfBuild)
    console.log(this.projectInfo)
    console.log(this.projectId)
    this.userName = this.$store.state.user.name
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
      // flex: 1;
      height: 100%;
      // display: table;
      position: relative;
    }
    .pagination{
      margin-top: 10px;
      min-height: 30px;
      line-height: 30px;
    }
  }
</style>
