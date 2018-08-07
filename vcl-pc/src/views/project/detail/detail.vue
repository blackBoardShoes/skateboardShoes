<template>
  <div id="project-detail">
    <div class="left-nav">
      <div class="page-title">
        <h4>项目详情</h4>
        <h5 class="light-text">Project Detail</h5>
      </div>
      <div class="project-name">
        用药影响综合评估
      </div>
      <div v-for="(item, index) in navOptions" :key="index" :class="{active: activeIndex === index}" class="nav-case" @click="changeIndex(item, index)">
        <span class="left-icon nav-light-text" :class="item.icon">
        </span>
        <span class="right-text nav-light-text">
          {{item.title}}
        </span>
      </div>
    </div>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Project_detail',
  data () {
    return {
      activeIndex: 0,
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
      ]
    }
  },
  methods: {
    changeIndex (item, index) {
      console.log(index)
      console.log(item)
      this.$router.push(item.path)
      this.activeIndex = index
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/variable';
  #project-detail{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    .left-nav{
      height: 100%;
      min-width: 160px;
      width: 160px;
      background-color:#E8E9EA;
      .page-title{
        width: 160px;
        height: 50px;
        padding: 30px 0;
        text-align: center;
        line-height: 25px;
        background: url('../../../assets/标题栏.png') center center no-repeat;
        h4{
          font-size: 26px;
        }
        h5{
          font-weight: 300;
        }
      }
      .project-name{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-weight:600;
        // background: linear-gradient(to right, #fff, #eee);
      }
      .nav-case{
        cursor: pointer;
        transition: all .25s linear;
        height: 48px;
        line-height: 48px;
        text-align: center;
        .right-text{
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
