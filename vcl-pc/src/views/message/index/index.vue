<template>
  <div id="receive">
    <div class="left-nav">
      <div class="page-title">
        <h4>消息中心</h4>
        <h5 class="light-text">Message Center</h5>
      </div>
      <div :class="{'nav-case': true, active: $route.path.split('/')[3] === 'receive'}" @click="$router.push('receive')">
        <div class="left-icon">
          <span class="ercp-icon-general-inbox"></span>
        </div>
        <div class="right-text nav-light-text">
          <div class="title">收件箱</div>
          <div class="count">32 条</div>
        </div>
      </div>
      <div :class="{'nav-case': true, active: $route.path.split('/')[3] === 'send'}" @click="$router.push('send')">
        <div class="left-icon">
          <span class="ercp-icon-general-outbox"></span>
        </div>
        <div class="right-text nav-light-text">
          <div class="title">发件箱</div>
          <div class="count">4 条</div>
        </div>
      </div>
      <div :class="{'nav-case': true, active: $route.path.split('/')[3] === 'write'}" @click="$router.push('write')">
        <div class="left-icon">
          <span class="ercp-icon-general-send"></span>
        </div>
        <div class="right-text nav-light-text">
          <div class="title">写消息</div>
          <div class="count">Send</div>
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
  name: 'message_index'
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
        transition: all .25s linear;
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
          text-align: right;
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
