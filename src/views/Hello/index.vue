<template>
  <div>
    <v-nav></v-nav>
    <h1>hello word!</h1>
  </div>
</template>

<script>
  import utils from '../../utils/http'
  import Nav from '../../components/Nav'
  export default {
    data () {
      return {
      }
    },
    components: {
      'v-nav': Nav
    },
    mounted () {
      utils.get('/user/json_get_info')
        .then((d) => {
          console.log(d)
        })
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/mixin.less";
  div{
    width: 100%;
    height: 300px;
    h1{
      color: blue;
      line-height: 100px;
      font-size: 40px;
      text-align: center;
    }
  }
</style>
