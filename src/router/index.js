import Vue from 'vue'
import Router from 'vue-router'
import Student from '@/components/Student'
import Teacher from '@/components/Teacher'
import Class from '@/components/Class'
import Classroom from '@/components/Classroom'
import Postgraduate from '@/components/Postgraduate'
import Basicinfo from '@/components/Basicinfo'
import Credits from '@/components/Credits'
import Login from '@/components/Login'
import Main from '@/components/Main'
import store from '@/store/store'

Vue.use(Router)

const routes = [
  {
    path:'/login',
    name:'Login',
    component: Login
  },{
    path:'/main',
    name:'Main',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Main,
    children:[
      {
        path: '/student',
        name: 'Student',
        component: Student
      },
      {//需要跳转的页面
         path: '/teacher',
         name: 'Teacher',
         component: Teacher
      },
      {//需要跳转的页面
        path: '/class',
        name: 'Class',
        component: Class
     },
     {//需要跳转的页面
      path: '/classroom',
      name: 'Classroom',
      component: Classroom
     },
     {//需要跳转的页面
      path: '/postgraduate',
      name: 'Postgraduate ',
      component: Postgraduate 
     },{
       path:'/basicinfo',
       name:'Basicinfo',
       meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
       },
       component: Basicinfo
     },{
      path:'/credits',
      name:'Credits',
      component: Credits
    }
    ]
  }
];

const router = new Router({
    routes
});
// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  else {
    next();
  }
})
export default router