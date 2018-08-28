<template>
  <div id="project-basic">
    <div class="project-info">
      <!-- <el-form ref="infomation" :rules = "rules" lebel-position="left" :model="basciInfo" label-width="100px" :disabled="!selfBuild"> -->
      <el-form ref="infomation" :rules = "rules" lebel-position="left" :model="basciInfo" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="basciInfo.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="12">
          <el-form-item label="项目简称" prop="abbreviation">
            <el-input v-model="basciInfo.abbreviation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目负责人" prop="creator">
            <!-- <el-input v-model="basciInfo.creator.name" disabled></el-input> -->
            <el-input v-model="basciInfo.creator" disabled></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="24">
          <el-form-item label="项目简介" prop="intro">
            <el-input v-model="basciInfo.intro" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- <div class="operate-buttons" v-if="selfBuild"> -->
    <div class="operate-buttons">
      <ul class="operation-list">
        <li class="operation-item clearfix">
          <ul class="tips-list float-left">
            <li class="tips-item">保存当前修改</li>
          </ul>
          <div class="btn-wrapper float-right">
            <el-button size="medium" type="primary" @click="saveChange" :disabled="!ableModify">保存修改</el-button>
          </div>
        </li>
        <li class="operation-item clearfix">
          <ul class="tips-list float-left">
            <li class="tips-item">锁定当前项目，将无法对当前项目进行其他操作，锁定后将跳转到项目列表页面</li>
          </ul>
          <div class="btn-wrapper float-right">
            <el-button size="medium" type="primary" @click="lock" :disabled="projectInfo.status === '1'">锁定项目</el-button>
          </div>
        </li>
        <li class="operation-item clearfix">
          <ul class="tips-list float-left">
            <li class="tips-item">删除当前项目，操作不可逆，删除该项目后将跳转到项目列表页面</li>
          </ul>
          <div class="btn-wrapper float-right">
            <el-button size="medium" type="danger"  @click="deletePro">删除项目</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { modifyProject, lockProject, deleteProject } from '../../../../api/project/project'
export default {
  name: 'Project_detail_basic',
  props: {
    selfBuild: {
      type: Boolean,
      required: true
    },
    projectInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      ableModify: false,
      basciInfo: {
        name: '',
        abbreviation: '',
        creator: '',
        intro: ''
      },
      rules: {
        name: [
          {required: true, message: '必填项不能为空'}
        ],
        abbreviation: [
          {required: true, message: '必填项不能为空'}
        ]
      }
    }
  },
  methods: {
    byValue () {
      this.$emit('refreshInfo')
    },
    async saveChange () {
      this.$refs.infomation.validate(async (valid) => {
        if (valid) {
          let newInfo = this.basciInfo
          // 部分可修改的信息 ? creator ?
          let info = {
            name: newInfo.name,
            abbreviation: newInfo.abbreviation,
            // creator: newInfo,
            // status: 0,
            intro: newInfo.intro
          }
          let response = await modifyProject(info)
          if (response.data.mitiStatus === 'SUCCESS') {
            console.log(response)
          } else {
            this.$message.error('ERROR: ' + response.data.message)
          }
          // this.$message.warning('锁定该项目')
        } else {
          return false
        }
      })
    },
    async lock () {
      let info = this.projectId
      let response = await lockProject(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response)
        this.$router.push('/project/index')
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    async deletePro () {
      let info = this.projectId
      let response = await deleteProject(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        console.log(response)
        this.$router.push('/project/index')
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    }
  },
  mounted () {
    this.byValue()
  },
  watch: {
    'projectInfo': {
      handler: function (newVal, oldValue) {
        if (newVal.name) {
          this.basciInfo = {
            name: newVal.name,
            abbreviation: newVal.abbreviation,
            creator: newVal.creator.userId,
            intro: newVal.intro
          }
        }
      },
      deep: true
    },
    'basciInfo': {
      handler: function (newVal, oldValue) {
        if (newVal.name === this.projectInfo.name && newVal.abbreviation === this.projectInfo.abbreviation && newVal.intro === this.projectInfo.intro) {
          this.ableModify = false
        } else {
          this.ableModify = true
        }
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
    .operate-buttons{
      padding: 0 10px 0 40px;
      .operation-list {
        margin-top: 32px;
        .operation-item {
          padding: 16px 0;
          border-top: 1px solid $lightBorderColor;

          .tips-list {
          list-style: square inside;
          font-size: 14px;
          color: $minorTextColor;

            .tips-item {
              margin-bottom: 8px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
    .project-info{
      margin-top: 10px;
      min-height: 160px;
    }
  }
</style>
