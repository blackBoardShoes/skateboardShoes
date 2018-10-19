<template>
  <div id="error">
    <div class="wall el-card">
      <!-- <img src="../../assets/images/登录框@2x.png" alt=""> -->
    </div>
    <!-- {{errorMap[errorCode] && errorMap[errorCode].message || '请求失败'}} -->
  </div>
</template>
<script>
export default {
  name: 'error',
  data () {
    return {
      errorCode: this.$route.params.code,
      errorMap: {
        403: {
          message: '抱歉，您无权访问该页面，请自重'
        },
        404: {
          message: '抱歉，您访问的页面/资源不存在，建议返回上一页'
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
  mounted () {
    console.log(this.$route.params.code)
  }
}
</script>
<style lang="scss" scoped>
  @keyframes move {
    form{background-position: 75px ,100px}
    to{background-position: 300px, 400px}
  }
  #error{
    height: 100%;
    line-height: 600px;
    // color: teal;
    width: 100%;
    // font-weight:900;
    // font-size: 50px;
    // text-align: center;
    .wall{
      // width: 100%;
      // height:100%;
      position: absolute;
      left: 16px;
      right: 16px;
      top: 16px;
      bottom: 16px;
      box-sizing: border-box;
      // background-color:silver;
      // background-image: radial-gradient(circle at 100% 150%, silver 24%, white 25%, white 28%, silver 29%, silver 36%, white 36%, white 40%, transparent 40%, transparent),radial-gradient(circle at 0    150%, silver 24%, white 25%, white 28%, silver 29%, silver 36%, white 36%, white 40%, transparent 40%, transparent),radial-gradient(circle at 50%  100%, white 10%, silver 11%, silver 23%, white 24%, white 30%, silver 31%, silver 43%, white 44%, white 50%, silver 51%, silver 63%, white 64%, white 71%, transparent 71%, transparent),radial-gradient(circle at 100% 50%, white 5%, silver 6%, silver 15%, white 16%, white 20%, silver 21%, silver 30%, white 31%, white 35%, silver 36%, silver 45%, white 46%, white 49%, transparent 50%, transparent),radial-gradient(circle at 0    50%, white 5%, silver 6%, silver 15%, white 16%, white 20%, silver 21%, silver 30%, white 31%, white 35%, silver 36%, silver 45%, white 46%, white 49%, transparent 50%, transparent);
      // background-size:100px 50px;
      // background: radial-gradient(circle at 100% 50%, transparent 20%, rgba(255,255,255,.3) 21%, rgba(255,255,255,.3) 34%, transparent 35%, transparent),radial-gradient(circle at 0% 50%, transparent 20%, rgba(255,255,255,.3) 21%, rgba(255,255,255,.3) 34%, transparent 35%, transparent) 0 -50px;
      // background-color: slategray;
      // background-size:75px 100px;
      // animation: move 12s infinite alternate linear;
      // background-color:#000;
      // filter:Alpha(Opacity=60);
      // opacity:0.2;
      // img{
      //   width: 100%;
      //   height: 100%;
      //   filter: grayscale(90%);
      // }
      // padding: 16px;
    }
    // margin:200px 0;
    // background:repeating-linear-gradient(135deg, #fff 0%, #fff 2%, #000 2%, #000 4%);
  }
</style>
