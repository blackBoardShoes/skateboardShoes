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
          message: '抱歉，您无权访问该页面'
        },
        404: {
          message: '抱歉，您访问的页面不存在'
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
    font-weight:900;
    font-size: 50px;
    text-align: center;
    padding:200px 0;
  }
</style>
