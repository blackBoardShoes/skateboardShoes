<template>
  <div class="blank"></div>
</template>
<script>
export default {
  mounted () {
    let ipc = this.$electron.ipcRenderer
    ipc.send('mainResize')
    this.$router.push('/home')
  },
  data () {
    return {
      env: ''
    }
  }
}
</script>
<style lang="scss" scoped>
    .blacnk{
        width: 0;
        height: 0;
    }
</style>
