<template>
  <div id="edit-input">
    <h2 style="position:absolute;top:5px;left:45%;color:#fff;">文本域编辑：</h2>
    <div class="text-area">

    </div>
  </div>
</template>
<script>
export default {
  name: 'editInput',
  data () {
    return {
      name: 'input'
    }
  },
  mounted () {
    this.hello()
  },
  methods: {
    hello () {
      console.log('hello Jerry')
    }
  }
}
</script>
<style lang="scss" scoped>
// 本页样式
  #edit-input{
    width:100%;
    height:100%;
    padding:40px;
    box-sizing: border-box;
    background-color:darkcyan;
    .text-area{
      height: 100%;
      width:100%;
      background-color: #fff;
    }
  }
</style>
<style lang="scss">
// 本页局部样式修改
</style>
