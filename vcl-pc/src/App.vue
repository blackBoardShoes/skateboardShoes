<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.commit('GET_USER')
    this.$store.commit('GET_TOKEN')
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
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  /* min-width: 1366px;
  min-height: 768px; */
}
</style>
