import Vue from 'vue'
import Router from 'vue-router'

// 引入登录注册组件
import login from '../pages/login/login.vue'
import register from '../pages/register/register'
import index from '../pages/index/index.vue'
// 引入忘记密码 组件
import forgetPassWord from '../pages/forgetPassword/forgetPassword.vue'

// 引入添加书籍的页面
import dashboard from '../pages/dashboard/dashboard.vue'
import addBook from '../pages/addBook/addBook.vue'
// 引入藏书总览的页面
import libraryOverView from '../pages/libraryOverView/libraryOverView.vue'
// 引入分类总览的页面 使用3d的图标来显示每一类的总数
import overviewOfClassify from '../pages/overviewOfClassify/overviewOfClassify.vue'
// 引入更新书籍的页面
import updateBook from '../pages/updateBook/updateBook.vue'
// 引入借书的页面
import lendBook from '../pages/lendBook/lendBook.vue'
// 引入借还书的列表页面
import lengbackList from '../pages/lendbackList/lendbackList.vue'
// 引入当前热门书籍
import currentHot from '../pages/currentHot/currentHot.vue'

// 引入个人信息设置页面
import personnalSetting from '../pages/personalSetting/personalSetting.vue'

// 引入播放音乐 舒缓一刻的页面

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
      path: '/forgetPassWord',
      name: 'forgetPassWord',
      component: forgetPassWord
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/homePage',
          name: 'dashboard',
          component: dashboard
        },
        {
          path: '/addBook',
          name: 'addBook',
          component: addBook
        },
        {
          path: '/libraryOverView',
          name: 'libraryOverView',
          component: libraryOverView
        },
        {
          path: '/overviewOfClassify',
          name: 'overviewOfClassify',
          component: overviewOfClassify
        },
        {
          path: '/updateBook/:id',
          name: 'updateBook',
          component: updateBook
        },
        {
          path: '/lendBook/:id',
          name: 'lendBook',
          component: lendBook
        },
        {
          path: '/lengbackList',
          name: 'lengbackList',
          component: lengbackList
        },
        {
          path: '/currentHot',
          name: 'currentHot',
          component: currentHot
        },
        {
          path: '/personnalSetting',
          name: 'personnalSetting',
          component: personnalSetting
        }
      ]
    }

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
// })

export default router
