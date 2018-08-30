<template>
  <keep-alive>
    <div id="project-detail">
      <div class="left-nav">
        <div class="page-title">
          <h4>项目详情</h4>
          <h5 class="light-text">Project Detail</h5>
        </div>
        <div :class="{'project-name': true, 'text-overflow-ellipsis': true, 'self-build': selfBuild}">
          {{projectInfo.name}}
        </div>
        <div v-for="(item, index) in navOptions" :key="index" :class="{active: $route.path.split('/')[4] === item.path}" class="nav-case" @click="changeIndex(item, index)">
          <span class="left-icon nav-light-text" :class="item.icon">
          </span>
          <span class="right-text nav-light-text">
            {{item.title}}
          </span>
        </div>
      </div>
      <div class="right-content">
        <router-view :selfBuild="selfBuild" :projectInfo="projectInfo" :projectId="projectId" v-on:refreshInfo="getInfo"></router-view>
      </div>
    </div>
  </keep-alive>
</template>
<script>
import { getProjectInfo } from '../../../api/project/project'
export default {
  name: 'Project_detail',
  data () {
    return {
      navOptions: [
        {
          icon: 'ercp-icon-module-create',
          title: '基本信息',
          path: 'basic'
        },
        {
          icon: 'ercp-icon-module-user',
          title: '项目成员',
          path: 'member'
        },
        {
          icon: 'ercp-icon-module-patient',
          title: '入组病案',
          path: 'patientCase'
        },
        {
          icon: 'ercp-icon-module-data',
          title: '项目统计',
          path: 'projectStatistics'
        },
        {
          icon: 'ercp-icon-module-export',
          title: '数据导出',
          path: 'projectExport'
        }
      ],
      creator: '',
      projectInfo: {}
    }
  },
  methods: {
    changeIndex (item, index) {
      this.$router.push(item.path)
    },
    async getProject (projectId) {
      let info = projectId
      let response = await getProjectInfo(info)
      if (response.data.mitiStatus === 'SUCCESS') {
        this.projectInfo = response.data.entity
        this.navOptions[0].icon = this.selfBuild ? 'ercp-icon-module-create' : 'ercp-icon-module-join'
      } else {
        this.$message.error('ERROR: ' + response.data.message)
      }
    },
    getInfo () {
      this.getProject(this.projectId)
    }
  },
  mounted () {
    this.creator = this.$store.state.user.id
    this.getProject(this.projectId)
    console.log(this.creator)
    console.log(this.projectInfo)
  },
  computed: {
    projectId () {
      return this.$route.path.split('/')[3]
    },
    selfBuild () {
      if (this.projectInfo.creator && this.projectInfo.creator === this.creator) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/variable';
  #project-detail{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .left-nav{
      height: 100%;
      // min-width: 160px;
      width: 160px;
      flex: 0 0 160px;
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
      .project-name{
        // border-top: 2px solid #fff;
        border-bottom: 2px solid #fff;
        padding: 0 10px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-weight:600;
      }
      .self-build{
        color: $themeColor;
      }
      .nav-case{
        cursor: pointer;
        transition: all .25s linear;
        height: 48px;
        line-height: 48px;
        text-align: center;
        .right-text{
          font-size:15px;
          margin-left: 5px;
        }
      }
      .active{
        background-color: #F3F4F5;
        .left-icon{
          color: $themeColor;
        }
        .right-text{
          color: #000;
        }
      }
    }
    .right-content{
      flex:1;
    }
  }
</style>
