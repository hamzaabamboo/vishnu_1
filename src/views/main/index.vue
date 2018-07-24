<template lang='pug'>
  section.section
    div.box(style="margin-top: 15px")
      button.button.is-warning.is-pulled-right(@click='logout' style='margin-left: -80%') logout
      baanstaff(:name='user')
    div.box(v-if='isWelfare')
      strong.is-size-4 STAFF
      meal-count(group = 'staff')
    div.box(v-if='isWelfare')
      strong.is-size-4 FRESHY
      meal-count(group = 'freshy')
    announce
    div.box(v-if='isReg')
      freshy-table(:admin='isAdmin')
</template>

<script>
import _ from 'lodash';
import FreshyTable from './components/Table.vue';
import MealCount from './components/MealCount.vue';
import Baanstaff from './components/Baanstaff.vue';
import Announce from './components/Announce.vue';
import { LOGOUT, ERROR } from '@/store/actions.type';
import ApiService, { AuthService } from '@/common/api.service.js';

export default {
	components: { MealCount, FreshyTable, Baanstaff, Announce },
	created() {
		AuthService.ping().catch(error =>
			this.$store
				.dispatch(ERROR, error)
				.then(() => this.$router.push({ name: 'Login' }))
		);
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
		},
		isWelfare() {
			const roles = this.$store.getters.getRoles;
			return roles.includes('welfare');
		},
		isReg() {
			const roles = this.$store.getters.getRoles;
			return (
				roles.includes('house_reg') ||
				roles.includes('admin') ||
				roles.includes('reg')
			);
    },
    isAdmin() {
			const roles = this.$store.getters.getRoles;
			return roles.includes('admin');
		}
	}
};
</script>

<style lang='stylus' scoped>
.section {
	padding: 10px 10px;
}

#header {
	margin: 20px auto;
}

.box {
	@media screen and (max-width: 500px) {
		padding: 0.1em;
	}

	@media screen and (max-width: 900px) {
		padding: 0.3em;
	}

	@media screen and (max-width: 1300px) {
		padding: 0.4em;
	}
}
</style>
