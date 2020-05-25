import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthRoutes } from '@/modules/auth/router'
import { UserRoutes } from '@/modules/user/router'
import { AuthorRoutes } from '@/modules/author/router'
import { BookRoutes } from '@/modules/book/router'
import { state } from '@/modules/auth/store'

Vue.use(VueRouter)

const routes = [...AuthRoutes, ...UserRoutes, ...AuthorRoutes, ...BookRoutes]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (state.token) {
      return next()
    }
    next('/signin')
  } else {
    next()
  }
})

export default router
