<template>
  <div class="err-page">
    <div class="main-logo">
      <div class="img-box">
        <img class="logo" src="../../assets/images/ldyy.png" v-for="(item, index) in 90" :key="index">
      </div>
    </div>
    <div class="error-main">
      <div class="err-message">
        <img class="logo" src="../../assets/images/error_daqie.png">
        <div class="err-code">
          <span>ERROR</span>
          <br>
          <span>{{errorCode}}</span>
        </div>
      </div>
      <div class="err-reason">{{ errorMap[errorCode] && errorMap[errorCode].message || '请求失败'}}</div>
      <div class="tips">
        不要着急，你可以返回
        <a class="click-page" @click="backPrev"> 上一页 </a> 或
        <a class="click-page" @click="toHome"> 首页 </a> 或进行
        <a class="click-page" @click="toFeedback"> 反馈 </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
  },
  data () {
    return {
      errorCode: this.$route.params.code,
      errorMap: {
        403: {
          message: '抱歉，您无权访问该页面'
        },
        404: {
          message: '抱歉，您访问的页面或请求的资源不存在'
        },
        500: {
          message: '抱歉，服务器出错了'
        },
        503: {
          message: '503'
        }
      }
    }
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/home' })
    },
    toFeedback () {
      this.$router.push({ path: '/helpCenter' })
    },
    backPrev () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/variable';
  @keyframes touch {
    form{transform: rotate(14deg)}
    to{transform: rotate(-14deg)}
  }
  .err-page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(230, 230, 230);
    overflow: hidden;
    z-index: 1;

    .main-logo {
      z-index: -1;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      font-weight: 900;
      .img-box {
        margin-top: -32%;
        margin-left: -27%;
        width: 150%;
        height: 150%;
        transform: rotate(45deg);
        // animation: touch 3s ease-in-out infinite alternate;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        filter: blur(16px);
        img{
          transform: rotate(-45deg);
          margin-left: 120px;
          margin-top: 120px;
          width: 120px;
          height: 120px;
        }
      }
    }

    .error-main {
      z-index: 12;
      position: absolute;
      left: 0;
      top: 50%;
      // margin-top: 50%;
      margin-top: -240px;
      height: 310px;
      width: 100%;
      // height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;

      .err-message {
        // display: inline-block;
        margin: 0px auto;
        width: 300px;
        height: 180px;
        color: #ffffff;
        font-size: 20px;
        position: relative;
        .err-code{
          overflow: hidden;
          animation: touch 3s ease-in-out infinite alternate;
          position: absolute;
          width: 120px;
          height: 70px;
          line-height: 25px;
          right: -30px;
          top: 86px;
          padding: 10px 0;
          box-sizing: border-box;
          // transform: rotate(-14deg);
          background-color: #92d6cd;
          border-radius: 15px;
          span:nth-of-type(2){
            font-size: 26px;
            // line-height: 50px;
            font-weight:900;
          }
          span:nth-of-type(1){
            line-height: 20px;
          }
        }
        img{
          width: 230px;
          height: 175px;
        }
      }
      .err-reason {
        margin: 30px 0 20px 0;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        height: 60px;
        width: 500px;
        line-height: 60px;
        font-size: 26px;
        font-weight: 600;
      }
      .err-reason::before {
        content: '';
        width: 500px;
        height: 4px;
        position: absolute;
        top: 0px;
        left: 0px;
        background: linear-gradient(to bottom, #999999, #eeeeee);
        border-radius: 50% / 100% 100% 0 0;
        transform: rotateX(180deg);
      }
      .err-reason::after {
        content: '';
        width: 500px;
        height: 4px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        background: linear-gradient(to bottom, #999999, #eeeeee);
        border-radius: 50% / 100% 100% 0 0;
      }
      .tips {
        font-size: 18px;
        .click-page {
          color: rgb(2, 131, 141);
          font-weight: 600;
        }
        .click-page:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
