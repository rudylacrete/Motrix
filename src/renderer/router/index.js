import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/Main').default,
      children: [
        {
          path: '/task',
          alias: '/',
          component: require('@/components/Task/Index').default,
          props: {
            status: 'active'
          }
        },
        {
          path: '/task/:status',
          name: 'task',
          component: require('@/components/Task/Index').default,
          props: true
        },
        {
          path: '/preference',
          name: 'preference',
          component: require('@/components/Preference/Index').default,
          props: true,
          children: [
            {
              path: 'basic',
              alias: '/',
              components: {
                form: require('@/components/Preference/Basic').default
              }
            },
            {
              path: 'advanced',
              components: {
                form: require('@/components/Preference/Advanced').default
              }
            },
            {
              path: 'lab',
              components: {
                form: require('@/components/Preference/Lab').default
              }
            }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
