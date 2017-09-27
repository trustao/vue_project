import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import Demo from '@/views/Demo'
import Login from '@/views/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 这里写权限相关代码
  next()
})

window.$router = router

export default router
