<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  console.log(this.$electron.ipcRenderer.sendSync('synchronous-message', 'ping'))
  this.$electron.ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg)
  })
  this.$electron.ipcRenderer.send('asynchronous-message', 'ping')
export default {
  name: 'App',
  methods: {
  },
  created () {
    console.log(this)
    console.log(this.$electron)
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app, html, body{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100%;
  width: 100%;
  /* min-width: 1280px;
  min-height: 720px;
  max-width: 1920px;
  max-height: 1080px; */
}
</style>
