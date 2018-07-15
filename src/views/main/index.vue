<template>
  <section class='section'>
    <div class='box' style="margin-top: 15px">
      <button class='button is-warning is-pulled-right' @click='logout'>logout</button>
      <overview v-if='user.staffView'></overview>
      <baanstaff v-if='!user.staffView' :name='user.name' :group='user.username'></baanstaff>
    </div>
    <announce></announce>
    <div class="box">
      <freshy-table
        :arg-grp='user.group'
        :arg-atr='user.fields'
      ></freshy-table>
    </div>
</section>
</template>

<script>
import _ from 'lodash';
import FreshyTable from './components/Table.vue';
import Overview from './components/Overview.vue';
import Baanstaff from './components/Baanstaff.vue';
import Announce from './components/Announce.vue';
import { LOGOUT } from '@/store/actions.type';
import ApiService from '@/common/api.service.js';

export default {
	components: { Overview, FreshyTable, Baanstaff, Announce }, //Announce
	created() {
		if (!this.$store.getters.isAuthenticated)
			this.$router.push({ name: 'Login' });
	},
	methods: {
		logout() {
			this.$store
				.dispatch(LOGOUT)
				.then(() => this.$router.push({ name: 'Login' }));
		}
	},
	computed: {
		user() {
			return this.$store.getters.currentUser;
		}
	}
};
</script>

<style scoped>
.section {
	padding: 10px 10px;
}
#header {
	margin: 20px auto;
}
</style>
