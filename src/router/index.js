import Vue from 'vue'
import Router from 'vue-router'
import 'bulma/css/bulma.css'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Query from '@/components/Query'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      props: true
    },
    {
      path: '/query/:id',
      name: 'Query',
      component: Query
    }
  ]
})
