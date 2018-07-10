<template>
  <section class='section'>
    <div class='box' style="margin-top: 15px">
      <button class='button is-warning is-pulled-right' @click='logout'>logout</button>
<<<<<<< HEAD
      <overview v-if='args.tot'></overview>
      <baanstaff v-if='!args.tot' :name='args.nme' :group='args.usr'></baanstaff>
=======
      <overview v-if='user.staffView'></overview>
      <!-- <announce></announce> -->
      <baanstaff v-if='!user.staffView' :name='user.name' :group='user.username'></baanstaff>
>>>>>>> 027d00c508d5295ac4d8539a627d8214b0ec045d
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
import FreshyTable from './Table.vue';
import Overview from './Overview.vue';
import Baanstaff from './Baanstaff.vue';
<<<<<<< HEAD
import Announce from './Announce.vue';
=======
// import Annuounce from './Announce.vue';
import { LOGOUT } from '@/store/actions.type';
>>>>>>> 027d00c508d5295ac4d8539a627d8214b0ec045d
import ApiService from '@/common/api.service.js';

export default {
	components: { Overview, FreshyTable, Baanstaff, }, //Announce 
	created() {
		if ( !this.$store.getters.isAuthenticated ) this.$router.push({ name: "Login" })
	},
	methods: {
		logout() {
			this.$store.dispatch(LOGOUT);
			this.$router.push({ name: "Login" })
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
