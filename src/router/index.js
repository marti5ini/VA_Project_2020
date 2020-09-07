import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('Home')
  },
  {
    path: '/home',
    name: 'home',
    component: loadView('Home')
  },
  {
    path: '/binary',
    name: 'bivariateCase',
    component: loadView('bivariateCase')
  },
  {
    path: '/general',
    name: 'multivariateCase',
    component: loadView('multivariateCase')
  },
]

const router = new VueRouter({
  routes
})

export default router
