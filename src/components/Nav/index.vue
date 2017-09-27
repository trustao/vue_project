<template>
  <div>
    <nav>
      <div @click="$router.push('/')">Hello</div>
      <div @click="$router.push('/demo')">Demo</div>
    </nav>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/mixin.less";
  div{
    width: 100%;
    nav{
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      background: #fdfdfd;
      .border-1px(#e6e6e6);
      div{
        cursor: pointer;
        text-align: center;
      }
    }
  }
</style>
