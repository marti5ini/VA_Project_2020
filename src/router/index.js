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
    name: 'binaryDep',
    component: loadView('binaryDep')
  },
  {
    path: '/general',
    name: 'general',
    component: loadView('general')
  },
]

const router = new VueRouter({
  routes
})

export default router
