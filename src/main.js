// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from '@/router';
import store from '@/store';

import ApiService from '@/common/api.service';
import ErrorFilter from '@/common/error.filter';
import 'font-awesome/css/font-awesome.css'
import './css/chulafont.css'
import './css/vishnu.css'

import VueDragDrop from 'vue-drag-drop';
Vue.use(VueDragDrop);

import VishnuBtn from '@/components/VishnuBtn.vue'
Vue.component('vishnu-btn', VishnuBtn)

import 'animate.css';

Vue.config.productionTip = false;
Vue.config.errorHandler = err => {
	console.log('handling error:', err);
};

Vue.filter('error', ErrorFilter);

ApiService.init();

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>',
	filters: {
		unescape: v => unescape(v)
	}
});
