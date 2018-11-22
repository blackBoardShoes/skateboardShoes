<template>
  <div id="system-user">
    <div class="operate-buttons align-right">
      <el-col :span="6">
        <el-input size="medium" v-model="searchUser" placeholder="搜索成员" clearable>
          <i class="ercp-icon-general-search el-input__icon" slot="prefix" @click="search"></i>
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
        class="absolute-table">
        <el-table-column
          show-overflow-tooltip
          fixed
          prop="username"
          align="center"
          label="账号">
        </el-table-column>
        <el-table-column
          min-width='100'
          show-overflow-tooltip
          prop="type"
          align="center"
          label="用户类型"
          :filters="[{ text: '管理员', value: '管理员' }, { text: '科研管理员', value: '科研管理员' }, { text: '医生', value: '医生' }, { text: '诊疗中心', value: '诊疗中心' }, { text: '科研护士', value: '科研护士' }, { text: '临床质控员', value: '临床质控员' }]"
          :filter-method="filterTag1">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="name"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="gender"
          align="center"
          label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.gender || '/' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="department"
          align="center"
          label="科室"
          :filters="[{ text: '外科一', value: '外科一' }, { text: '外科二', value: '外科二' }, { text: '特需外科', value: '特需外科' }]"
          :filter-method="filterTag2">
          <template slot-scope="scope">
            <span>{{ scope.row.department || '/' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="institution"
          align="center"
          label="机构"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          min-width='100'
          show-overflow-tooltip
          prop="createDate"
          align="center"
          sortable
          label="创建日期">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
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
          <template slot-scope="scope" class="header-operate">
            <span  v-if="showOperate(scope.row)">
              <el-button type="danger" size="small" plain @click="banUser(scope.row)" >删除</el-button>
              <el-button type="primary" size="small" plain @click="resetUser(scope.row)">重置密码</el-button>
            </span>
            <span v-else> - </span>
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
              placement="bottom-start"
              width="800"
              trigger="click">
              <el-table :data="permissionData" border stripe>
                <el-table-column align="center" label="用户/页面" property="page0" width="120"></el-table-column>
                <el-table-column align="center" label="患者中心">
                  <el-table-column align="center"  property="page1" label="删除">
                  </el-table-column>
                  <el-table-column align="center"  property="page2" label="编辑">
                  </el-table-column>
                  <el-table-column align="center"  property="page3" label="查看">
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="任务中心">
                  <el-table-column align="center"  property="page4" label="新增">
                  </el-table-column>
                  <el-table-column align="center"  property="page5" label="编辑">
                  </el-table-column>
                  <el-table-column align="center"  property="page6" label="录入">
                  </el-table-column>
                  <el-table-column align="center"  property="page7" label="审核">
                  </el-table-column>
                  <el-table-column align="center"  property="page8" label="修正">
                  </el-table-column>
                  <el-table-column align="center"  property="page9" label="随访">
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center"  property="page10" label="数据管理"></el-table-column>
                <el-table-column align="center" label="表单管理">
                  <el-table-column align="center"  property="page11" label="表单库">
                  </el-table-column>
                  <el-table-column align="center"  property="page12" label="字段库">
                  </el-table-column>
                  <el-table-column align="center"  property="page13" label="术语库（查看、查询）" width="180">
                  </el-table-column>
                  <el-table-column align="center"  property="page14" label="术语库（新增、编辑）" width="180">
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="系统管理">
                  <el-table-column align="center"  property="pag15" label="用户管理">
                  </el-table-column>
                  <el-table-column align="center"  property="page16" label="日志管理">
                  </el-table-column>
                </el-table-column>
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
              <el-option label="普外二科" value="普外二科"></el-option>
              <el-option label="普外五科" value="普外五科"></el-option>
              <el-option label="特需外科" value="特需外科"></el-option>
              <el-option label="东岗院区普外科" value="东岗院区普外科"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
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
// 获取所有用户/添加/禁用/重置
import { getAllUser, addUser, forbiddenUser, resetUser } from '../../../api/user/user.js'
export default {
  name: 'system_detail_user',
  data () {
    // 新增用户姓名验证
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写用户姓名'))
      } else {
        if (this.nameArr.find((n) => n.name === value && n.type === this.newUser.type)) {
          callback(new Error('同类型用户，该用户名已存在，请输入其他用户名'))
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
          page0: '管理员',
          page1: '×',
          page2: '×',
          page3: '√',
          page4: '×',
          page5: '×',
          page6: '×',
          page7: '×',
          page8: '×',
          page9: '×',
          page10: '√',
          page11: '√',
          page12: '√',
          page13: '√',
          page14: '√',
          pag15: '√',
          page16: '√'
        },
        {
          page0: '科研管理员',
          page1: '×',
          page2: '×',
          page3: '√',
          page4: '×',
          page5: '×',
          page6: '×',
          page7: '×',
          page8: '×',
          page9: '√',
          page10: '√',
          page11: '×',
          page12: '×',
          page13: '√',
          page14: '×',
          pag15: '√',
          page16: '×'
        },
        {
          page0: '医生',
          page1: '×',
          page2: '×',
          page3: '√',
          page4: '×',
          page5: '×',
          page6: '×',
          page7: '√',
          page8: '×',
          page9: '×',
          page10: '√',
          page11: '×',
          page12: '×',
          page13: '√',
          page14: '×',
          pag15: '×',
          page16: '×'
        },
        {
          page0: '临床质控员',
          page1: '×',
          page2: '×',
          page3: '√',
          page4: '×',
          page5: '×',
          page6: '×',
          page7: '√',
          page8: '×',
          page9: '×',
          page10: '×',
          page11: '×',
          page12: '√',
          page13: '×',
          page14: '×',
          pag15: '×',
          page16: '×'
        },
        {
          page0: '诊疗中心',
          page1: '√',
          page2: '√',
          page3: '√',
          page4: '√',
          page5: '√',
          page6: '√',
          page7: '×',
          page8: '√',
          page9: '×',
          page10: '×',
          page11: '×',
          page12: '×',
          page13: '√',
          page14: '×',
          pag15: '×',
          page16: '×'
        },
        {
          page0: '科研护士',
          page1: '√',
          page2: '√',
          page3: '√',
          page4: '√',
          page5: '√',
          page6: '√',
          page7: '×',
          page8: '√',
          page9: '√',
          page10: '×',
          page11: '×',
          page12: '×',
          page13: '√',
          page14: '×',
          pag15: '×',
          page16: '×'
        }
      ],
      rules: {
        name: [{validator: validateName, trigger: 'blur'}],
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
            this.getAllUser(1)
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
    async getAllUser (add) {
      let info = {
        currentPage: 1,
        pageSize: 500
      }
      let response = await getAllUser(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        let arr1 = response.data.entity.data
        let arr2 = []
        let sort = (type) => {
          arr1.forEach((item) => {
            if (item.type === type && item.status !== '禁用') {
              arr2.push(item)
            }
          })
        }
        let obj = {
          type1: '医生',
          type2: '科研护士',
          type3: '诊疗中心',
          type4: '临床质控员',
          type5: '科研管理员',
          type6: '管理员'
        }
        for (let i in obj) {
          sort(obj[i])
        }
        this.tableData = arr2
        this.memoryTable = this.tableData
        // 名字校验
        this.nameArr = []
        this.tableData.forEach((item) => {
          if (item.status !== '禁用') {
            this.nameArr.push(item)
          }
        })
        if (add === 1) {
          this.$message.success('新增用户成功')
        } else if (add === 2) {
          this.$message.success('删除用户成功')
        } else if (add === 3) {
          // this.$message.success('重置用户密码成功')
        }
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    // 禁用用户
    async banUser (value) {
      this.$confirm('操作将删除  ' + value.name + '  用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let response = await forbiddenUser(value.id)
        if (response.data.mitiStatus === 'SUCCESS') {
          this.getAllUser(2)
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
          // this.getAllUser(3)
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
