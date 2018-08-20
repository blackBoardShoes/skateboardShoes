<template>
  <div id="project-member">
    <div class="operate-buttons align-right">
      <el-select v-model="addedMember" style="margin-right:20px;">
        <el-option
          v-for="(item, index) in memberOptions"
          :laebl="item.label"
          :value="item.value"
          :key="index">
        </el-option>
      </el-select>
      <el-button size="medium" type="primary" @click="add">添加成员</el-button>
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
          width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain @click="viewMember(scope.row)">查看</el-button>
            <el-button type="danger" size="small" plain @click="removeMember(scope.row)">移除</el-button>
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
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室1',
          role: '科研护士',
          joinTime: '2018-09-10'
        },
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室2',
          role: '科研护士',
          joinTime: '2018-09-10'
        },
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室3',
          role: '科研护士',
          joinTime: '2018-09-10'
        },
        {
          account: '10000',
          name: '王小虎',
          gender: '男',
          department: '科室4',
          role: '科研护士',
          joinTime: '2018-09-10'
        }
      ],
      addedMember: '',
      memberOptions: [
        {label: '王小虎', value: '王小虎'},
        {label: '王小虎', value: '王小虎'},
        {label: '王小虎', value: '王小虎'},
        {label: '王小虎', value: '王小虎'}
      ]
    }
  },
  methods: {
    viewMember (value) {
      this.$message.warning('查看的是' + value.department + '的' + value.name)
    },
    removeMember (value) {
      this.$message.warning('移除成员')
    },
    add () {
      if (this.addedMember) {
        this.$message.success(this.addedMember)
      } else {
        this.$message.warning('请选择一个成员')
      }
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
