import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/productdetail/:slug',
    name: 'ProductDetail',
    component: () => import('../components/ProductDetail.vue')
  },
  {
    path: '/category/:id',
    name: 'CategoryProduct',
    component: () => import('../components/CategoryProduct.vue')
  },
  {
    path: '/search/:search',
    name: 'SearchProduct',
    component: () => import('../components/SearchProduct.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../components/Cart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
