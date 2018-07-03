import Vue from 'vue';
import Router from 'vue-router';
import 'bulma/css/bulma.css';
import Main from '@/components/Main';
import Query from '@/components/Query';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/components/Login')
		},
		{
			path: '/',
			name: 'Main',
			component: () => import('@/components/Main'),
			props: true
		},
		{
			path: '/info/:id',
			name: 'Query',
			component: Query
		}
	]
});
