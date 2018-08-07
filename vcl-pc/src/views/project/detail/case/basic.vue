<template>
  <div id="project-basic">
    <div class="operate-buttons align-right">
      <el-button size="medium" type="primary" @click="saveChange">保存修改</el-button>
      <el-button size="medium" type="danger"  @click="deletePro">删除</el-button>
    </div>
    <div class="project-info">
      <el-form ref="infomation" :rules = "rules" lebel-position="left" :model="projectInfo" label-width="80px">
        <el-col :span="24">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="projectInfo.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="项目简称" prop="abbreviation">
            <el-input v-model="projectInfo.abbreviation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="项目负责" prop="leader">
            <el-input v-model="projectInfo.leader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目状态" prop="status">
            <el-switch
              v-model="projectInfo.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              active-text="锁定"
              inactive-text="未锁定">
            </el-switch>
          </el-form-item>
        </el-col>
         <el-col :span="24">
          <el-form-item label="项目简介" prop="introduction">
            <el-input v-model="projectInfo.introduction"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Project_detail_basic',
  data () {
    return {
      projectInfo: {
        name: 'ERCP患者用药对出院状态的影响',
        abbreviation: '用药影响评估',
        leader: '上官玛利亚',
        status: 0,
        introduction: '患者手术后,跟踪患者的各阶段状态,进行评估'
      },
      rules: {
        name: [
          {required: true, message: '必填项不能为空'}
        ],
        abbreviation: [
          {required: true, message: '必填项不能为空'}
        ],
        leader: [
          {required: true, message: '必填项不能为空'}
        ],
        status: [
          {required: true, message: '必填项不能为空'}
        ],
        introduction: [
          {required: true, message: '必填项不能为空'}
        ]
      }
    }
  },
  methods: {
    saveChange () {
      this.$refs.infomation.validate((valid) => {
        if (valid) {
          this.$message.warning('修改成功')
        } else {
          return false
        }
      })
    },
    deletePro () {
      this.$message.warning('确定删除了哦')
    }
  },
  mounted () {
  },
  watch: {
    'projectInfo': {
      handler: function (newVal) {
        console.log(newVal)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../../assets/css/variable';
  #project-basic{
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
    }
  }
</style>
