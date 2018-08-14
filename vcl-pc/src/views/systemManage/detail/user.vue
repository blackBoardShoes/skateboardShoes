<template>
  <div id="system-user">
    <div class="operate-buttons align-right">
      <el-col :span="6">
        <el-input size="medium" v-model="searchUser" placeholder="搜索成员" @keyup.enter.native="search">
          <i class="ercp-icon-general-search el-input__icon" slot="suffix" @click="search"></i>
        </el-input>
      </el-col>
      <el-button size="medium" type="primary" @click="addUser">新增用户</el-button>
    </div>
    <div class="system-user">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        size="medium"
        fit
        stripe
        :default-sort = "{prop: 'createTime', order: 'descending'}"
        header-row-class-name="er-header">
        <el-table-column
          fixed
          prop="account"
          align="center"
          label="账号">
        </el-table-column>
        <el-table-column
          prop="roleType"
          align="center"
          label="用户类型">
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
          prop="organization"
          align="center"
          label="机构">
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          sortable
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="状态"
          :filters="[{ text: '正常', value: '正常' }, { text: '禁用', value: '禁用' }]"
          :filter-method="filterTag"
          width="120">
        </el-table-column>
        <el-table-column
          prop="operate"
          align="center"
          label="操作"
          fixed="right"
          width="180">
          <template slot-scope="scope" class="header-operate"  v-if="scope.row.status === '正常'">
            <el-button type="danger" size="small" plain @click="banUser(scope.row)">禁用</el-button>
            <el-button type="primary" size="small" plain @click="resetUser(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增用户" :visible.sync="dialogTableVisible" :modal="true" append-to-body  width="700px">
      <el-form ref="newUserForm" :rules="rules" :model="newUser" label-position="left" label-width="100px" style="height:206px;">
        <el-col :span="11">
          <el-form-item label="用户类型:" prop="userType">
            <el-select v-model="newUser.userType">
              <el-option
                label="用户类型一"
                value="用户类型一">
              </el-option>
              <el-option
                label="用户类型二"
                value="用户类型二">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item label="用户机构:" prop="organization">
            <el-select v-model="newUser.organization">
              <el-option
                label="机构一"
                value="机构一">
              </el-option>
              <el-option
                label="机构二"
                value="机构二">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="用户姓名:" prop="name">
            <el-input v-model="newUser.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item label="用户性别:" prop="gender">
            <el-radio-group v-model="newUser.gender">
              <el-radio label="男" value="0"></el-radio>
              <el-radio label="女" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="用户科室:" prop="department">
            <el-select v-model="newUser.department">
              <el-option
                label="科室一"
                value="科室一">
              </el-option>
              <el-option
                label="科室二"
                value="科室二">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="operate align-center clearfix" style="width:100%;">
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'system_detail_user',
  data () {
    return {
      tableData: [
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室一',
          organization: '天和高科',
          roleType: '科研护士',
          createTime: '2018-10-01',
          status: '禁用'
        },
        {
          account: '10220',
          name: '王大虎',
          gender: '男',
          department: '科室一',
          organization: '天和高科',
          roleType: '科研护士',
          createTime: '2018-10-03',
          status: '正常'
        },
        {
          account: '10030',
          name: '胖大海',
          gender: '男',
          department: '科室一',
          organization: '天和高科',
          roleType: '科研护士',
          createTime: '2018-10-03',
          status: '正常'
        },
        {
          account: '12010',
          name: '胖小海',
          gender: '男',
          department: '科室一',
          organization: '天和高科',
          roleType: '科研护士',
          createTime: '2018-12-09',
          status: '正常'
        }
      ],
      // 存储原始人员data
      memoryTable: [],
      searchUser: '',
      // 新增用户
      dialogTableVisible: false,
      newUser: {
        name: '',
        gender: '',
        department: '',
        organization: '',
        userType: ''
      },
      rules: {
        name: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        gender: [{
          required: false,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        department: [{
          required: false,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        organization: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        userType: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    banUser (value) {
      this.$message.warning('禁用' + value.name)
    },
    filterTag (value, row) {
      return row.status === value
    },
    resetUser (value) {
      this.$message.warning('重置成员密码' + value.name)
    },
    search () {
      this.tableData = this.memoryTable
      if (this.searchUser) {
        let search = this.searchUser
        let arr = []
        this.tableData.forEach((item, index) => {
          if (item.account.indexOf(search) > -1 || item.name.indexOf(search) > -1) {
            arr.push(item)
          }
        })
        this.tableData = arr
      }
    },
    addUser () {
      this.dialogTableVisible = true
    },
    add () {
      this.dialogTableVisible = true
    },
    // 取消添加
    cancel () {
      this.dialogTableVisible = false
      this.$refs.newUserForm.resetFields()
    },
    // 确认添加成员
    confirmAdd () {
      this.$refs.newUserForm.validate(valid => {
        if (valid) {
          console.log(this.newUser)
          this.dialogTableVisible = false
          // if success
          // this.$refs.newUserForm.resetFields()
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.memoryTable = this.tableData
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/variable';
  #system-user{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:16px;
    display: flex;
    flex-direction: column;
    .operate-buttons{
      flex: 0 0 40px;
      min-height: 40px;
      line-height: 40px;
      padding:10px 0;
    }
    .system-user{
      flex: 1;
      height: 100px;
    }
  }
  deep .er-header{
    background-color: red;
  }
</style>
