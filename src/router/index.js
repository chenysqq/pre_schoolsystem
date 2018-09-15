import Vue from 'vue'
import Router from 'vue-router'
import Student from '@/components/Student'
import Teacher from '@/components/Teacher'
import Class from '@/components/Class'
import Classroom from '@/components/Classroom'
import Postgraduate from '@/components/Postgraduate'
import Basicinfo from '@/components/Basicinfo'
import Credits from '@/components/Credits'

Vue.use(Router)

export default new Router({
  routes: [
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
     component: Basicinfo
   },{
    path:'/credits',
    name:'Credits',
    component: Credits
  }
  ]
})
