<template>
  <div id="data-center">
    <div class="left-nav">
      <div class="page-title">
        <h4>数据中心</h4>
        <h5 class="light-text">Data Center</h5>
      </div>
      <div v-for="(item, index) in navOptions" :key="index" :class="{active: $route.path.split('/')[3] === item.path}" class="nav-case" @click="changeIndex(item, index)">
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
  name: 'System_manage',
  data () {
    return {
      // activeIndex: 0,
      navOptions: [
        {
          icon: 'ercp-icon-module-report',
          title: '数据统计',
          path: 'charts'
        },
        {
          icon: 'ercp-icon-module-export',
          title: '数据导出',
          path: 'export'
        }
      ]
    }
  },
  methods: {
    changeIndex (item, index) {
      console.log(index)
      console.log(item)
      this.$router.push(item.path)
      // this.activeIndex = index
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/variable';
  #data-center{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .left-nav{
      height: 100%;
      min-width: 160px;
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
      height: 100%;
    }
  }
</style>
