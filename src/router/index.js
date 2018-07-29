import Vue from 'vue';
import Router from 'vue-router';
import 'bulma/css/bulma.css';
import '../css/kbutton.css';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/login')
		},
		{
			path: '/main',
			name: 'Main',
			component: () => import('@/views/main'),
			props: true
		},
		{
			path: '/',
			name: 'Yaay',
			component: () => import('@/views/yaay')
		},
		{
			path: '/info/:id',
			name: 'Query',
			component: () => import('@/views/query')
		}
	]
});
