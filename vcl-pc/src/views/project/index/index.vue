<template>
  <div id="project-manage">
    <div class="left-nav">
      <div class="page-title">
        <h4>项目管理</h4>
        <h5 class="light-text">Project Management</h5>
      </div>
      <div :class="{active: selfBuild === true}" class="nav-case" @click="selfBuild = true">
        <div class="left-icon">
          <span class="ercp-icon-module-create"></span>
        </div>
        <div class="right-text nav-light-text">
          <div class="title">自建项目</div>
          <div class="count">{{tableData.length}} 项</div>
        </div>
      </div>
      <div :class="{active: selfBuild === false}" class="nav-case" @click="selfBuild = false">
        <div class="left-icon">
          <span class="ercp-icon-module-join"></span>
        </div>
        <div class="right-text nav-light-text">
          <div class="title">参与项目</div>
          <div class="count">2项</div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="content-operate">
        <div class="search float-left">
          <el-input size="medium" v-model="searchText" placeholder="检索项目" @keyup.enter.native="search">
            <i class="ercp-icon-general-search el-input__icon" slot="suffix" @click="search"></i>
          </el-input>
        </div>
        <el-button type="primary" @click="addProject" class="float-right" size="medium">添加项目</el-button>
      </div>
      <div class="content">
        <el-table
          :data="selfBuild === true ? tableData : tableData2"
          style="width: 100%"
          size="medium"
          fit>
          <el-table-column
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="项目名称">
          </el-table-column>
          <el-table-column
            prop="abbreviation"
            align="center"
            label="项目简称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="leader"
            align="center"
            label="项目负责人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="members"
            align="center"
            label="项目成员数"
            width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="项目状态"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.status === 0 ? '未锁定' : '锁定' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="patients"
            align="center"
            label="入组患者"
            width="80">
          </el-table-column>
          <el-table-column
            prop="createData"
            align="center"
            label="创建日期"
            width="100">
          </el-table-column>
          <el-table-column
            prop="operate"
            align="center"
            label="操作"
            width="220"
            fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="small" plain @click="viewProject(scope.row)">查看</el-button>
              <el-button type="danger" size="small" plain @click="deleteProject(scope.row)">删除</el-button>
              <el-button type="primary" size="small" plain @click="lockProject(scope.row)" v-if="scope.row.status === 1">锁定</el-button>
              <el-button type="primary" size="small" plain @click="relockProject(scope.row)" v-else>解锁</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="添加项目" :visible.sync="dialogTableVisible" :modal="true" append-to-body>
      <el-form ref="addProject" :rules="rules" :model="addedProject" label-position="right" label-width="100px">
        <el-form-item label="项目名称:" prop="name">
          <el-input v-model="addedProject.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="项目简称:" prop="abbreviation">
          <el-input v-model="addedProject.abbreviation" size="small"></el-input>
        </el-form-item>
        <el-form-item label="项目负责:" prop="leader">
          <el-input v-model="addedProject.leader" size="small"></el-input>
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
export default {
  name: 'projectManage',
  data () {
    return {
      selfBuild: true,
      searchText: '',
      tableData: [
        {
          name: 'ERCP患者用药对出院状态的影响',
          abbreviation: '用药影响评估',
          leader: '王小虎',
          members: 8,
          status: 0,
          patients: 108,
          createData: '2018-01-02',
          id: '10101010'
        },
        {
          name: 'ERCP患者用药对出院状态的影响',
          abbreviation: '用药影响评估',
          leader: '王小虎',
          members: 8,
          status: 1,
          patients: 108,
          createData: '2018-01-02',
          id: '10101010'
        },
        {
          name: 'ERCP患者用药对出院状态的影响',
          abbreviation: '用药影响评估',
          leader: '王小虎',
          members: 8,
          status: 0,
          patients: 108,
          createData: '2018-01-02',
          id: '10101010'
        }
      ],
      tableData2: [
        {
          name: 'ERCP患者用药对出院状态的影响',
          abbreviation: '用药影响评估',
          leader: '王小虎',
          members: 8,
          status: 0,
          patients: 108,
          createData: '2018-01-02',
          id: '10101012'
        },
        {
          name: 'ERCP患者用药对出院状态的影响',
          abbreviation: '用药影响评估',
          leader: '王小虎',
          members: 8,
          status: 0,
          patients: 108,
          createData: '2018-01-02',
          id: '10101012'
        }
      ],
      addedProject: {},
      dialogTableVisible: false,
      rules: {
        name: [{
          required: true, message: '必填项不能为空'
        }],
        abbreviation: [{
          required: true, message: '必填项不能为空'
        }],
        leader: [{
          required: true, message: '必填项不能为空'
        }]
      }
    }
  },
  methods: {
    search () {
      this.$message.success(this.searchText)
    },
    viewProject (value) {
      this.$router.push(`/project/detail/${value.id}/basic`)
    },
    deleteProject (value) {
      this.$message.warning('删除操作')
    },
    lockProject (value) {
      this.$message.warning('解锁操作')
    },
    relockProject (value) {
      this.$message.warning('锁定操作')
    },
    addProject () {
      this.dialogTableVisible = true
    },
    // 取消添加
    cancel () {
      this.dialogTableVisible = false
      this.$refs.addProject.resetFields()
    },
    // 确认添加患者
    confirmAdd () {
      this.$refs.addProject.validate(valid => {
        if (valid) {
          console.log(this.addedProject)
          this.dialogTableVisible = false
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/variable';
  #project-manage{
    // position: absolute;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // top: 0;
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
    }
  }
</style>
