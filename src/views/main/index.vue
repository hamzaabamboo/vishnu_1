<template lang='pug'>
  section.section
    div.box(style="margin-top: 15px")
      button.button.is-warning.is-pulled-right(@click='logout') logout
      overview(v-if='user.staffView')
      baanstaff(v-if='!user.staffView' :name='user.name' :group='user.username')
    div
    // announce/
    div.box
      freshy-table(:arg-grp='user.group' :arg-atr='user.fields')
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
	components: { Overview, FreshyTable, Baanstaff, Announce, },
	created() {
		// if (!this.$store.getters.isAuthenticated)
		// 	this.$router.push({ name: 'Login' });
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

<style lang='stylus' scoped>
.section
  padding: 10px 10px;

#header
  margin: 20px auto;

.box
  @media screen and (max-width 500px)
    padding .1em
  @media screen and (max-width 900px)
    padding .3em
  @media screen and (max-width 1300px)
    padding .4em
</style>
