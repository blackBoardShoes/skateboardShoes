<template>
  <div id="system-user">
    <div class="operate-buttons align-right">
      <el-col :span="6">
        <el-input size="medium" v-model="searchUser" placeholder="搜索成员" @keyup.enter.native="search">
          <i class="ercp-icon-general-search el-input__icon" slot="suffix" @click="search"></i>
        </el-input>
      </el-col>
      <el-button size="medium" type="primary" @click="add">新增用户</el-button>
    </div>
    <div class="system-user">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        size="medium"
        fit
        :row-class-name="forbiddenClass"
        :default-sort = "{prop: 'createTime', order: 'descending'}"
        header-row-class-name="er-header">
        <el-table-column
          fixed
          prop="username"
          align="center"
          label="账号">
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="用户类型"
          :filters="[{ text: '管理员', value: '管理员' }, { text: '科研管理员', value: '科研管理员' }, { text: '医生', value: '医生' }, { text: '诊疗中心', value: '诊疗中心' }, { text: '科研护士', value: '科研护士' }, { text: '临床质控员', value: '临床质控员' }]"
          :filter-method="filterTag2">
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
          label="科室"
          :filters="[{ text: '外科一', value: '外科一' }, { text: '外科二', value: '外科二' }, { text: '特需外科', value: '特需外科' }]"
          :filter-method="filterTag3">
        </el-table-column>
        <el-table-column
          prop="institution"
          align="center"
          label="机构">
        </el-table-column>
        <el-table-column
          prop="createDate"
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
          <template slot-scope="scope" class="header-operate"  v-if="showOperate(scope.row)">
            <el-button type="danger" size="small" plain @click="banUser(scope.row)">禁用</el-button>
            <el-button type="primary" size="small" plain @click="resetUser(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增用户" :visible.sync="dialogTableVisible" :modal="true" append-to-body  width="500px" center>
      <el-form ref="newUserForm" :rules="rules" :model="newUser" label-position="left" label-width="100px">
        <el-col :span="24">
          <el-form-item label="用户类型:" prop="type">
            <el-select v-model="newUser.type"  style="width:100%;">
              <el-option
                v-for="(item, index) in typeOptions"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户机构:" prop="institution">
            <el-select v-model="newUser.institution"  style="width:100%;">
              <el-option
                label="兰州大学第一医院"
                value="兰州大学第一医院">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户姓名:" prop="name">
            <el-input v-model="newUser.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户科室:" prop="department">
            <el-select v-model="newUser.department"  style="width:100%;">
              <el-option
                label="外科一"
                value="外科一">
              </el-option>
              <el-option
                label="外科二"
                value="外科二">
              </el-option>
              <el-option
                label="特需外科"
                value="特需外科">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户性别:" prop="gender">
            <el-radio-group v-model="newUser.gender">
              <el-radio label="男" value="男"></el-radio>
              <el-radio label="女" value="女"></el-radio>
            </el-radio-group>
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
import { getAllUser, addUser, forbiddenUser, resetUser } from '../../../api/user/user.js'
export default {
  name: 'system_detail_user',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.nameArr.indexOf(value) > -1) {
          callback(new Error('该用户名已存在'))
        }
        callback()
      }
    }
    return {
      nameArr: [],
      tableData: [
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
        institution: '',
        type: ''
      },
      typeOptions: [],
      rules: {
        name: [{
          validator: validateName,
          trigger: 'blur'
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
        institution: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }],
        type: [{
          required: true,
          message: '必填项不能为空',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    forbiddenClass (row, index) {
      console.log(row.row)
      if (row.row.status === '禁用') {
        console.log(row.row.status)
        return 'forbidden'
      }
    },
    async getAllUser () {
      let info = {
        currentPage: 1,
        pageSize: 500
      }
      let response = await getAllUser(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData = response.data.entity.data
        this.memoryTable = this.tableData
        this.nameArr = []
        this.tableData.forEach((item) => {
          this.nameArr.push(item.name)
        })
        console.log(this.nameArr)
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async banUser (value) {
      this.$confirm('操作将禁用该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let response = await forbiddenUser(value.id)
        if (response.data.mitiStatus === 'SUCCESS') {
          console.log(response)
          this.getAllUser()
        } else {
          console.log(response.data)
        }
      }).catch(() => {
        return false
      })
    },
    showOperate (value) {
      let status = value.status
      let bantype = value.type
      let user = this.$store.state.user.type
      let tfboys = false
      if (status === '禁用') {
        tfboys = false
      } else if (bantype === '管理员') {
        tfboys = false
      } else if (user === '管理员') {
        tfboys = true
      } else if (user === '科研管理员' && bantype !== '科研管理员') {
        tfboys = true
      } else {
        tfboys = false
      }
      return tfboys
    },
    filterTag (value, row) {
      return row.status === value
    },
    filterTag2 (value, row) {
      return row.type === value
    },
    filterTag3 (value, row) {
      return row.department === value
    },
    async resetUser (value) {
      this.$confirm('操作将重置该用户密码，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let response = await resetUser(value.id)
        if (response.data.mitiStatus === 'SUCCESS') {
          console.log(response)
          this.getAllUser()
        } else {
          console.log(response.data)
        }
      }).catch(() => {
        return false
      })
    },
    search () {
      this.tableData = this.memoryTable
      if (this.searchUser) {
        let search = this.searchUser
        let arr = []
        this.tableData.forEach((item, index) => {
          if (item.username.indexOf(search) > -1 || item.name.indexOf(search) > -1) {
            arr.push(item)
          }
        })
        this.tableData = arr
      }
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
    async confirmAdd () {
      this.$refs.newUserForm.validate(async valid => {
        if (valid) {
          let info = this.newUser
          info.institution_name = info.institution
          let response = await addUser(info)
          if (response.data.mitiStatus === 'SUCCESS') {
            this.getAllUser()
            this.$refs.newUserForm.resetFields()
            this.dialogTableVisible = false
          } else {
            this.$message.error('ERROR: ' + response.data.message)
          }
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    if (this.$store.state.user !== null) {
      if (this.$store.state.user.codetype === 1) {
        this.typeOptions = ['科研管理员', '科研护士', '诊疗中心', '临床质控员', '医生']
        this.getAllUser()
      } else if (this.$store.state.user.codetype === 2) {
        this.typeOptions = ['科研护士', '诊疗中心', '临床质控员', '医生']
        this.getAllUser()
      } else {
        this.$router.push('/error:401')
      }
    }
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
  .el-table .forbidden {
    background-color: red !important;
  }
</style>
