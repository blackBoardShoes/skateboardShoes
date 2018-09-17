<template>
  <div id="project-member">
    <div class="operate-buttons align-right" v-if="selfBuild">
      <el-select v-model="addedMember" filterable style="margin-right:20px;flex:1;" multiple collapse-tags  placeholder="请搜索成员或选择成员列表">
        <el-option
          v-for="(item, index) in memberOptions"
          :laebl="item.name + '/' + item.username"
          :value="item.name + '/' + item.username"
          :key="index">
          <span style="float: left; color: #8492a6; font-size: 11px">{{ '姓名：' + item.name + '(' + item.type + ')' }}</span>
          <span style="float: right; color: #8492a6; font-size: 11px;margin-right:20px;">{{'账号：' + item.username }}</span>
        </el-option>
      </el-select>
      <el-button size="medium" type="primary" @click="add" >添加成员</el-button>
    </div>
    <div class="project-info">
      <el-table
        :default-sort = "{prop: 'username', order: 'descending'}"
        class="absolute-table"
        :data="tableData"
        height="100%"
        style="width: 100%;"
        size="large"
        fit>
        <el-table-column
          prop="username"
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
          prop="username"
          align="center"
          label="角色">
          <template slot-scope="scope">
            <span>{{scope.row.username === user.username ? '负责人': '研究员'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="joinTime"
          align="center"
          label="加入日期">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="120">
          <template slot-scope="scope"  v-if="scope.row.username !== user.username && user.id === projectInfo.creator">
            <el-button type="danger" size="small" plain @click="removeMember(scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getAllUser } from '../../../../api/user/user.js'
import { addProjectMember, getMembers, removeProjectMember } from '../../../../api/project/project.js'
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
      ],
      addedMember: [],
      memberOptions: [
      ],
      projectMes: {
        creator: '王二虎'
      },
      user: {},
      memberArr: []
    }
  },
  methods: {
    async removeMember (value) {
      let info = {
        userId: this.$store.state.user.id,
        projectId: this.projectId,
        memberId: value.id
      }
      let response = await removeProjectMember(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response)
        this.getProjectMem()
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async add () {
      if (this.addedMember) {
        console.log(this.addedMember)
        let arr = []
        this.addedMember.forEach((item1, index1) => {
          this.memberOptions.forEach((item2) => {
            if (item1.split('/')[1] === item2.username) {
              arr.push(item2.id)
            }
          })
        })
        console.log(arr)
        let info = {
          userId: this.$store.state.user.id,
          projectId: this.projectId,
          members: arr
        }
        let response = await addProjectMember(info)
        if (response.data.mitiStatus === 'SUCCESS') {
          console.log(response)
          this.addedMember = []
          this.getProjectMem()
        } else {
          this.$message.error('ERROR: ' + response.data.message)
        }
      } else {
        this.$message.warning('请选择一个成员')
      }
    },
    async getAllUser () {
      let info = {
        currentPage: 1,
        pageSize: 500
      }
      let response = await getAllUser(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.memberArr = response.data.entity.data
        console.log(this.memberArr)
        this.memberOptions = []
        this.memberArr.forEach((item) => {
          if (item.status === '正常' && (item.type === '管理员' || item.type === '科研管理员' || item.type === '医生')) {
            let obj = {
              username: item.username,
              name: item.name,
              id: item.id
            }
            this.memberOptions.push(obj)
          }
        })
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async getProjectMem () {
      let info = this.projectId
      let response = await getMembers(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response.data.entity)
        let arr = response.data.entity
        let arr2 = []
        arr.forEach((item) => {
          item.t1.joinTime = item.t2
          arr2.push(item.t1)
        })
        this.getUsers()
        this.tableData = arr2
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 初始化项目成员选项列表
    initMemberOptions () {
      this.memberOptions = []
      this.memberArr.forEach((item) => {
        if (item.username !== this.user.username && item.status === '正常' && (item.type === '管理员' || item.type === '科研管理员' || item.type === '医生') && this.tableData.findIndex((n) => n.id === item.id) < 0) {
          let obj = {
            username: item.username,
            name: item.name,
            id: item.id,
            type: item.type
          }
          this.memberOptions.push(obj)
        }
      })
    },
    async getUsers () {
      let info = {
        currentPage: 1,
        pageSize: 500
      }
      let response = await getAllUser(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.memberArr = response.data.entity.data
        this.initMemberOptions(this.memberArr)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    }
  },
  mounted () {
    this.getProjectMem()
    this.user = this.$store.state.user
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
      display: flex;
      flex-direction: row;
      min-height: 40px;
      line-height: 40px;
      padding:10px 0;
    }
    .project-info{

      height: 100%;
      position: relative;
    }
    .pagination{
      margin-top: 10px;
      min-height: 30px;
      line-height: 30px;
    }
  }
</style>
