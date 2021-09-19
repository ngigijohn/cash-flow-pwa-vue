import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: () => import('../views/Contribute.vue')
  },
  {
    path: '/tables',
    name: 'Tables',
    component: () => import('../views/Tables.vue')
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () => import('../views/Charts.vue')
  }, {
    path: '/create-user',
    name: 'Create User',
    component: () => import('../views/CreateUser.vue')

  }
]

const router = new VueRouter({
  routes
})

export default router