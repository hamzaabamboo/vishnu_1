import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth.module';
import freshmen from './freshmen.module';
import error from './error.module';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth,
		freshmen,
		error
	}
});
