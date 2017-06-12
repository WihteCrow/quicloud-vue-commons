import Vue from 'vue'
import Router from 'vue-router'
import components from '@/page/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'components',
      component: components
    }
  ]
})
