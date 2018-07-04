<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
