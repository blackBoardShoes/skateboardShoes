<template>
  <div id="error">
    {{errorMap[errorCode] && errorMap[errorCode].message || '请求失败'}}
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
  #error{
    height: 100%;
    line-height: 600px;
    color: teal;
    width: 100%;
    font-weight:900;
    font-size: 50px;
    text-align: center;
    // margin:200px 0;
    // background:repeating-linear-gradient(135deg, #fff 0%, #fff 2%, #000 2%, #000 4%);
  }
</style>
