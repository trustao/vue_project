<template>
  <div>
    <label>用户名：</label><input type="text" v-model="username"><br>
    <label>密码：</label><input type="password" v-model="password"><br>
    <input type="button" @click="loginCheck" value="登录">
  </div>
</template>

<script>
  import utils from '../../utils/http'
  export default {
    data () {
      return {
        username: 'oubolai0102',
        password: '18701627060'
      }
    },
    methods: {
      loginCheck () {
        utils.get('/login/json_login?param={"u":"' + this.username + '","p":"' + this.password + '"%20,"r":0%20}')
          .then((d) => {
            if (d.data.data && d.data.data.login === true) {
              this.$router.push('/')
            }
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/mixin.less";
  div{
    width: 100%;
    height: 300px;
    text-align: center;
    font-size: 30px;
    line-height: 40px;
    input{
      border: 1px solid #81c0ff;
      &:last-child{
          cursor: pointer;
       }
    }
  }
</style>
