<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import "assets/less/mixin";
  #app {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
