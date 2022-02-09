import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/detail=:movieId&page=:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
/* eslint-disable */
router.beforeEach((to, from, next) => {
  if (from.name === null && to.name === "Home") {
    to.params.id = 1
  } else if (from.name !== null && to.name === "Home") {
    to.params.id = from.params.id
  }
  next()
})
/* eslint-disable */
export default router
