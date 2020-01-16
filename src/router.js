// in case when Vue don't render your app, just make some changes in your router "push". This is trouble tightly bind with VueRouter

import Vue from 'vue'
import Router from 'vue-router'

import Application from './components/Application.vue'
import Authorization from './components/Authorization.vue'

Vue.use(Router)

export const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{path: '/',  component: Application},
		{path: '/authorization', component: Authorization},
	]
})


/*{
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" *//* './views/About.vue')
}*/