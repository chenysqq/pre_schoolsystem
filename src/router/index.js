import Vue from 'vue'
import Router from 'vue-router'
import Student from '@/components/Student'
import Teacher from '@/components/Teacher'
import Class from '@/components/Class'
import Classroom from '@/components/Classroom'
import Postgraduate from '@/components/Postgraduate'


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
   }
  ]
})
