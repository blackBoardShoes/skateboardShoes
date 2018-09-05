<template>
  <div id="receive">
    <div class="left-nav">
      <div class="page-title">
        <h4>消息中心</h4>
        <h5 class="light-text">Message Center</h5>
      </div>
      <div
        v-for="(item, index) in navCase"
        :key="index"
        :class="{'nav-case': true, active: $route.path.split('/')[3] === item.eng.toLowerCase()}" @click="$router.push(item.eng.toLowerCase())">
        <div class="left-icon">
          <span :class=item.icon></span>
        </div>
        <div class="right-text nav-light-text">
          <div class="title">{{item.text}}</div>
          <div class="count">{{item.eng}}</div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'message_index',
  data () {
    return {
      navCase: [
        {
          text: '收件箱',
          eng: 'Receive',
          icon: 'ercp-icon-general-inbox'
        },
        {
          text: '发件箱',
          eng: 'Send',
          icon: 'ercp-icon-general-outbox'
        },
        {
          text: '写消息',
          eng: 'Write',
          icon: 'ercp-icon-general-send'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/variable';
  #receive{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    .left-nav{
      height: 100%;
      width: 160px;
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
        transition: all .5s linear;
        height: 80px;
        .left-icon{
          height: 80px;
          width: 80px;
          float: left;
          color: #606266;
          font-size:36px;
          line-height: 80px;
          text-align: center;
        }
        .right-text{
          font-size:14px;
          height: 80px;
          width: 80px;
          box-sizing: border-box;
          float: left;
          text-align: left;
          padding: 15px 15px 15px 0;
          line-height: 25px;
        }
      }
      .active{
        background-color: #F3F4F5;
        .left-icon{
          color: $themeColor;
        }
        .count{
          color: $themeColor;
        }
        .title{
          color: #000;
          font-weight: 900;
        }
      }
    }
    .right-content{
      flex: 1;
    }
  }
</style>
