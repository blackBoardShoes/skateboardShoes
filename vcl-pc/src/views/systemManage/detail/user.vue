<template>
  <div id="system-user">
    <div class="operate-buttons align-right">
      <el-col :span="6">
        <el-input size="medium" v-model="searchUser" placeholder="搜索成员">
          <i class="ercp-icon-general-search el-input__icon" slot="suffix" @click="search"></i>
        </el-input>
      </el-col>
      <el-button size="medium" type="primary" @click="dialogTableVisible = true">新增用户</el-button>
    </div>
    <div class="user-table">
      <el-table
        style="width: 100%"
        :data="tableData"
        height="100%"
        size="medium"
        fit
        :row-class-name="forbiddenClass"
        :default-sort = "{prop: 'createTime', order: 'descending'}"
        class="absolute-table">
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
          :filter-method="filterTag1">
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
          :filter-method="filterTag2">
        </el-table-column>
        <el-table-column
          prop="institution"
          align="center"
          label="机构"
          show-overflow-tooltip>
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
          :filter-method="filterTag3"
          width="120">
        </el-table-column>
        <el-table-column
          prop="operate"
          align="center"
          label="操作"
          fixed="right"
          width="180">
          <template slot-scope="scope" class="header-operate" v-if="showOperate(scope.row)">
            <el-button type="danger" size="small" plain @click="banUser(scope.row)" >禁用</el-button>
            <el-button type="primary" size="small" plain @click="resetUser(scope.row)">重置密码</el-button>
            <!-- <span v-else>不可操作</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增用户" :visible.sync="dialogTableVisible" :modal="true" append-to-body  width="600px" center>
      <el-form ref="newUserForm" :rules="rules" :model="newUser" label-position="left" label-width="100px">
        <el-col :span="23">
          <el-form-item label="用户类型:" prop="type">
            <el-select v-model="newUser.type"  style="width:100%;" @change="clearDepartment">
              <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <div class="tips">
            <el-popover
              placement="bottom"
              width="800"
              trigger="hover">
              <el-table :data="permissionData" border stripe>
                <el-table-column align="center"  property="page" label="页面/角色"></el-table-column>
                <el-table-column align="center"  property="administrator" label="管理员"></el-table-column>
                <el-table-column align="center"  property="doctor" label="医生"></el-table-column>
                <el-table-column align="center"  property="scientificManager" label="科研管理员"></el-table-column>
                <el-table-column align="center"  property="controller" label="临床质控员"></el-table-column>
                <el-table-column align="center"  property="dtenter" label="诊疗中心"></el-table-column>
                <el-table-column align="center"  property="nurse" label="科研护士"></el-table-column>
              </el-table>
            <span class="el-icon-question" slot="reference"></span>
            </el-popover>
          </div>
        </el-col>
        <el-col :span="23">
          <el-form-item label="用户机构:" prop="institution">
            <el-select v-model="newUser.institution"  style="width:100%;">
              <el-option label="兰州大学第一医院" value="兰州大学第一医院"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="用户姓名:" prop="name">
            <el-input v-model="newUser.name" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="用户科室:" prop="department">
            <el-select v-model="newUser.department"  style="width:100%;" :disabled="newUser.type !== '医生'">
              <el-option label="外科一" value="外科一"></el-option>
              <el-option label="外科二" value="外科二"></el-option>
              <el-option label="特需外科" value="特需外科"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="用户性别:" prop="gender">
            <el-radio-group v-model="newUser.gender" :disabled="newUser.type === '诊疗中心'">
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
// 获取所有用户/添加/禁用/重置
import { getAllUser, addUser, forbiddenUser, resetUser } from '../../../api/user/user.js'
export default {
  name: 'system_detail_user',
  data () {
    // 新增用户姓名验证
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填项不能为空'))
      } else {
        if (this.nameArr.indexOf(value) > -1) {
          callback(new Error('该用户名已存在'))
        }
        callback()
      }
    }
    return {
      searchUser: '',
      tableData: [],
      // 存储原始人员data
      memoryTable: [],
      // 新增用户
      dialogTableVisible: false,
      typeOptions: [],
      newUser: {
        name: '',
        gender: '',
        department: '',
        institution: '',
        type: ''
      },
      // 所有用户姓名
      nameArr: [],
      // 权限列表
      permissionData: [
        {
          page: '系统首页',
          administrator: '√',
          doctor: '√',
          scientificManager: '√',
          controller: '√',
          dtenter: '√',
          nurse: '√'
        },
        {
          page: '患者中心',
          administrator: '√',
          doctor: '√',
          scientificManager: '√',
          controller: '√',
          dtenter: '√',
          nurse: '√'
        },
        {
          page: '任务中心',
          administrator: '×',
          doctor: '×',
          scientificManager: '√',
          controller: '√',
          dtenter: '√',
          nurse: '√'
        },
        {
          page: '数据统计',
          administrator: '√',
          doctor: '√',
          scientificManager: '√',
          controller: '×',
          dtenter: '×',
          nurse: '×'
        },
        {
          page: '项目管理',
          administrator: '√',
          doctor: '√',
          scientificManager: '√',
          controller: '×',
          dtenter: '×',
          nurse: '×'
        },
        {
          page: '表单管理',
          administrator: '√',
          doctor: '×',
          scientificManager: '×',
          controller: '×',
          dtenter: '×',
          nurse: '×'
        },
        {
          page: '系统管理',
          administrator: '√',
          doctor: '×',
          scientificManager: '√',
          controller: '×',
          dtenter: '×',
          nurse: '×'
        },
        {
          page: '帮助中心',
          administrator: '√',
          doctor: '√',
          scientificManager: '√',
          controller: '√',
          dtenter: '√',
          nurse: '√'
        }
      ],
      rules: {
        name: [{validator: validateName, trigger: 'blur'}, {required: true}],
        institution: [{required: true, message: '必填项不能为空', trigger: 'change'}],
        type: [{required: true, message: '必填项不能为空', trigger: 'change'}]
      }
    }
  },
  methods: {
    // 搜索成员
    search () {
      if (this.searchUser) {
        let search = this.searchUser
        let arr = []
        this.tableData.forEach((item, index) => {
          if (item.username.indexOf(search) > -1 || item.name.indexOf(search) > -1) {
            arr.push(item)
          }
        })
        this.tableData = arr
      } else {
        this.tableData = this.memoryTable
      }
    },
    // 添加成员
    cancel () {
      this.dialogTableVisible = false
      this.$refs.newUserForm.resetFields()
    },
    clearDepartment () {
      this.newUser.department = ''
      this.newUser.gender = ''
    },
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
    },
    // 表格:
    forbiddenClass (row, index) {
      if (row.row.status === '禁用') {
        return 'forbidden'
      }
    },
    // 是否可操作
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
    // 三个列表筛选(用户类型/科室/状态)
    filterTag1 (value, row) {
      return row.type === value
    },
    filterTag2 (value, row) {
      return row.department === value
    },
    filterTag3 (value, row) {
      return row.status === value
    },
    // 获取所有的用户
    async getAllUser () {
      let info = {
        currentPage: 1,
        pageSize: 500
      }
      let response = await getAllUser(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.tableData = response.data.entity.data
        this.memoryTable = this.tableData
        // 名字校验
        this.nameArr = []
        this.tableData.forEach((item) => {
          this.nameArr.push(item.name)
        })
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 禁用用户
    async banUser (value) {
      this.$confirm('操作将禁用  ' + value.name + '  用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let response = await forbiddenUser(value.id)
        if (response.data.mitiStatus === 'SUCCESS') {
          this.getAllUser()
        } else {
          console.log(response.data)
        }
      }).catch(() => {
        return false
      })
    },
    // 重置用户
    async resetUser (value) {
      this.$confirm('操作将重置  ' + value.name + '  的用户密码，是否继续？', '提示', {
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
  },
  watch: {
    'searchUser': {
      handler: function (newVal) {
        this.search()
      },
      deep: true
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
    .user-table{
      flex: 1;
      position: relative;
    }
  }
  .tips{
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
</style>
