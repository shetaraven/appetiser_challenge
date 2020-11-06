import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Verification from '@/components/Verification'
import Success from '@/components/Success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/verification',
      name: 'Verification',
      component: Verification
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    }
  ]
})
