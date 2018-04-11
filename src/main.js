// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import GoodsPage from './components/goods/goods'
import SellerPage from './components/seller/seller'
import RatingsPage from './components/ratings/ratings'
import Router from 'vue-router'

Vue.use(Router)
Vue.use(VueResource)
Vue.config.productionTip = false

var router = new Router({
	mode:'history',
	routes:[	
		{
			path:'/goods',
			component:GoodsPage
		},
		{
			path:'/seller',
			component:SellerPage
		},
		{
			path:'/ratings',
			component:RatingsPage
		},
		{ path: '/',  redirect: '/goods' }
	]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
