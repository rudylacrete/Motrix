import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: require('@/components/Menu').default
    },
    {
      path: '/afr',
      name: 'afr',
      component: require('@/components/Afr').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
