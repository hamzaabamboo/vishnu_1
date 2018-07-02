<template>
  <section class='section'>
    <div class='box' style="margin-top: 15px">
      <button class='button is-warning is-pulled-right' @click='logout'>logout</button>
      <overview v-if='args.tot'></overview>
      <!-- <announce></announce> -->
      <baanstaff v-if='!args.tot' :name='args.nme' :group='args.usr'></baanstaff>
    </div>
    <div class="box">
      <freshy-table
        :arg-grp='args.grp'
        :arg-atr='args.atr'
      ></freshy-table>
    </div>
</section>
</template>

<script>
import _ from 'lodash';
import FreshyTable from './Table.vue';
import Overview from './Overview.vue';
import Baanstaff from './Baanstaff.vue';
import Annuounce from './Announce.vue';
import ApiService from '@/common/api.service.js';

export default {
	components: { Overview, FreshyTable, Baanstaff, Announce },
	props: {
		args: {
			type: Object,
			require: true,
			default: () => JSON.parse(localStorage.getItem('args'))
		}
	},
	created() {
		// let test = ApiService.query('/articles', null).then(res =>
		// 	console.log(res.data)
		// ); // Test Api Sending
		if (!this.args) {
			this.$router.push('/login');
		}
	},
	methods: {
		logout() {
			localStorage.clear();
			this.$router.push('/login');
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
