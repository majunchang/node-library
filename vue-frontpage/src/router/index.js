import Vue from 'vue'
import Router from 'vue-router'


// 引入登录注册组件
import login from '../pages/login/login.vue'
import register from '../pages/register/register'
import index from '../pages/index/index.vue'

// 引入添加书籍的页面
import dashboard from '../pages/dashboard/dashboard.vue'
import addBook from '../pages/addBook/addBook.vue'

Vue.use(Router)

var router = new Router({
  routes: [
    // 在页面初始化的时候  有一个重定向
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/index',
          name: 'dashboard',
          component: dashboard
        },
        {
          path: '/addBook',
          name: 'addBook',
          component: addBook
        },
      ]
    },

  ]
})


// router.beforeEach((to, from, next) => {
//   var username = Vue.prototype.$routerStore.state.user.name;
//   if(to.fullPath.indexOf('/login') != -1){
//     next();
//   }else {
//     if(username){
//       next()
//     }else if(!username){
//       next({
//         path:'/login'
//       })
//     }
//   }
//   console.log(Vue.prototype.$routerStore);
//   console.log(router);
//
// })

export default router;
