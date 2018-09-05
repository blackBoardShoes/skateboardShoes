<template>
  <div id="project-manage">
    <div class="left-nav">
      <div class="page-title">
        <h4>项目管理</h4>
        <h5 class="light-text">Project Management</h5>
      </div>
      <div :class="{'nav-case': true, active: selfBuild === true}" @click="selfBuild = true">
        <div class="left-icon">
          <span class="ercp-icon-module-create"></span>
        </div>
        <div class="right-text nav-light-text">
          <div class="title">自建项目</div>
          <div class="count">{{selfProjectTotals}} 项</div>
        </div>
      </div>
      <div :class="{'nav-case': true, active: selfBuild === false}" @click="selfBuild = false">
        <div class="left-icon">
          <span class="ercp-icon-module-join"></span>
        </div>
        <div class="right-text nav-light-text">
          <div class="title">参与项目</div>
          <div class="count">{{joinProjectTotals}} 项</div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="content-operate">
        <div class="search float-left">
          <el-input size="medium" v-model="searchMyProject" placeholder="检索自建项目" clearable @keyup.enter.native="search" v-if="selfBuild === true">
            <i class="ercp-icon-general-search el-input__icon" slot="prefix"  @click="search"></i>
          </el-input>
          <el-input size="medium" v-model="searchJoinProject" placeholder="检索参与项目" clearable @keyup.enter.native="search2" v-if="selfBuild === false">
            <i class="ercp-icon-general-search el-input__icon" slot="prefix"  @click="search2"></i>
          </el-input>
        </div>
        <el-button type="primary" @click="dialogTableVisible = true" class="float-right" size="medium" v-if="selfBuild === true">新增项目</el-button>
      </div>
      <div class="content">
        <el-table
          :data="selfBuild === true ? tableData : tableData2"
          style="width: 100%"
          size="medium"
          fit
          height="100%"
          class="absolute-table">
          <el-table-column
            prop="name"
            show-overflow-tooltip
            align="center"
            label="项目名称">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="abbreviation"
            align="center"
            label="项目简称"
            width="160">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="creatorSta"
            align="center"
            label="项目负责人"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.creatorSta.username }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="members"
            align="center"
            label="项目成员数"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.members.length }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="项目状态"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.status === '1' ? '正常' : '锁定' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="patients"
            align="center"
            label="入组患者"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.patients.length }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="creatTime"
            align="center"
            label="创建日期"
            width="100">
          </el-table-column>
          <el-table-column
            prop="operate"
            align="center"
            label="操作"
            width="120"
            fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="small" plain @click="viewProject(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 列表分页 -->
      <div class="pagination align-right" v-if="selfBuild === true">
        <el-pagination
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
      <div class="pagination align-right" v-if="selfBuild === false">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 15, 20]"
          :total="total2"
          :current-page="currentPage2"
          :page-size="pageSize2"
          @size-change= "SizeChange2"
          @current-change = "changePage2"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="添加项目" :visible.sync="dialogTableVisible" append-to-body :close-on-click-modal="false">
      <el-form ref="newProject" :rules="rules" :model="addedProject" label-position="right" label-width="100px">
        <el-form-item label="项目名称:" prop="name">
          <el-input v-model="addedProject.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="项目简称:" prop="abbreviation">
          <el-input v-model="addedProject.abbreviation" size="small"></el-input>
        </el-form-item>
        <el-form-item label="项目简介:" prop="intro">
          <el-input v-model="addedProject.intro" type="textarea" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div class="operate align-center">
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllProject, addMProject } from '../../../api/project/project'
export default {
  name: 'projectManage',
  data () {
    return {
      selfBuild: true,
      searchMyProject: '',
      searchJoinProject: '',
      tableData: [
      ],
      tableData2: [
      ],
      dialogTableVisible: false,
      addedProject: {},
      rules: {
        name: [{
          required: true, message: '必填项不能为空'
        }],
        abbreviation: [{
          required: true, message: '必填项不能为空'
        }]
      },
      // 分页信息
      pageSize: 10,
      currentPage: 1,
      total: 30,
      pageSize2: 10,
      currentPage2: 1,
      total2: 20,
      gotMyTotal: false,
      gotJoinTotal: false,
      selfProjectTotals: 0,
      joinProjectTotals: 0
    }
  },
  methods: {
    search () {
      this.getMyProject(this.pageSize, 1, this.searchMyProject)
    },
    search2 () {
      this.getJoinProject(this.pageSize2, 1, this.searchJoinProject)
    },
    viewProject (value) {
      this.$router.push(`/project/detail/${value.id}/basic`)
    },
    // 取消添加
    cancel () {
      this.dialogTableVisible = false
      this.$refs.newProject.resetFields()
    },
    // 确认添加
    async confirmAdd () {
      this.$refs.newProject.validate(async valid => {
        if (valid) {
          let info = this.addedProject
          info.creator = this.$store.state.user.id
          let response = await addMProject(info)
          if (response.data.mitiStatus === 'SUCCESS') {
            this.getMyProject(10, 1, this.searchMyProject)
            // this.tableData = response.data.entity.data
            // this.total = response.data.entity.total
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
      this.pageSize = size
      this.getMyProject(size, 1, this.searchMyProject)
    },
    changePage (page) {
      this.currentPage = page
      this.getMyProject(this.pageSize, page, this.searchMyProject)
    },
    // 列表页码信息
    SizeChange2 (size) {
      this.pageSize2 = size
      this.getJoinProject(size, 1, this.searchJoinProject)
    },
    changePage2 (page) {
      this.currentPage2 = page
      this.getJoinProject(this.pageSize2, page, this.searchJoinProject)
    },
    async getMyProject (perPage, currentPage, searchMyProject) {
      let info = {
        // @change --- id
        userId: this.$store.state.user.id,
        projectType: 'create',
        perPage: perPage,
        currentPage: currentPage,
        searchText: searchMyProject
      }
      let response = await getAllProject(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData = response.data.entity.data
        this.total = response.data.entity.total
        if (!this.gotMyTotal) {
          this.selfProjectTotals = response.data.entity.total
          this.gotMyTotal = true
        }
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async getJoinProject (perPage, currentPage, searchJoinProject) {
      let info = {
        // @change --- id
        userId: this.$store.state.user.id,
        projectType: 'join',
        perPage: perPage,
        currentPage: currentPage,
        searchText: searchJoinProject
      }
      let response = await getAllProject(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData2 = response.data.entity.data
        this.total2 = response.data.entity.total
        if (!this.gotJoinTotal) {
          this.joinProjectTotals = response.data.entity.total
          this.gotJoinTotal = true
        }
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    }
  },
  mounted () {
    // 初始化项目信息
    this.getMyProject(10, 1, this.searchMyProject)
    this.getJoinProject(10, 1, this.searchJoinProject)
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/variable';
  #project-manage{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .left-nav{
      height: 100%;
      width: 160px;
      background-color:#E8E9EA;
      .page-title{
        width: 160px;
        height: 50px;
        padding: 30px 0;
        text-align: center;
        line-height: 25px;
        background: url('../../../assets/images/标题栏.png') center center no-repeat;
        h4{
          font-size: 26px;
        }
        h5{
          font-weight: 300;
        }
      }
      .nav-case{
        cursor: pointer;
        transition: all .25s linear;
        height: 80px;
        .left-icon{
          height: 80px;
          width: 80px;
          float: left;
          color: #606266;
          font-size:36px;
          line-height: 80px;
          text-align: center;
        }
        .right-text{
          font-size:14px;
          height: 80px;
          width: 80px;
          box-sizing: border-box;
          float: left;
          text-align: right;
          padding: 15px 15px 15px 0;
          line-height: 25px;
        }
      }
      .active{
        background-color: #F3F4F5;
        .left-icon{
          color: $themeColor;
        }
        .count{
          color: $themeColor;
        }
        .title{
          color: #000;
          font-weight: 900;
        }
      }
    }
    .right-content{
      flex:1;
      height: 100%;
      transition: all .25s linear;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .content-operate{
        height: 60px;
        width: 100%;
        .search{
          width: 300px;
        }
      }
      .content{
        position: relative;
        flex: 1;
        overflow-y: auto;
      }

      .pagination{
        margin-top: 10px;
        min-height: 30px;
        line-height: 30px;
      }
    }
  }
</style>
