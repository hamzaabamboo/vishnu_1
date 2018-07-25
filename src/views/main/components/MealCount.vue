<template lang='pug'>
  div
    div.cu(style='overflow-y: auto')
      table.table.is-striped._cred(align='center')
        thead
          tr
            td: strong ประเภท
            td: strong รวม
            td.mcenter(v-for='group in Object.keys(meals)' :key='group')
              div(align="center"): strong {{group}}
        tbody
          tr(v-for='field in fields' :key='field')
            td: strong {{ translate(field) || field  }}
            td: div(align="center") {{total[field]}}
            td.mcenter(v-for='group in Object.keys(meals)' :key='group + field')
              div(align="center") {{getValue(meals[group][field])}}
    others-list(v-if='isWelfare && group != "staff"' :list='meals')
</template>

<script>
import _ from 'lodash';
import { MealService } from '@/common/api.service';
import translate from '@/i10n/language_translate.json';
import OthersList from './OthersList';
export default {
	props: ['group'],
	components: { OthersList },
	data() {
		return {
			meals: {}
		};
	},
	async created() {
		this.meals =
			(this.group == 'staff'
				? await MealService.getAllStaffMeals()
				: await MealService.getMeals()
			).data || [];
	},
	methods: {
		translate(word) {
			return translate[word];
		},
		sum(property) {
			return _.values(this.meals).reduce(
				(a, b) => a + this.getValue(b[property]),
				0
			);
		},
		getValue(value) {
			if (!value) return 0;
			return isNaN(value) || value.length === 0 ? value.length : value;
		}
	},
	computed: {
		fields() {
			return Object.keys(Object.values(this.meals)[0] || {}).filter(
				key => key != 'updated_at'
			).sort();
		},
		total() {
			return {
				normal: this.sum('normal'),
				islamic: this.sum('islamic'),
				veg: this.sum('veg'),
				total: this.sum('total'),
				other: this.sum('other')
			};
		},
		isWelfare() {
			const roles = this.$store.getters.getRoles;
			return roles.includes('welfare');
		}
	}
};
</script>

<style scoped>
td {
	padding: 0.3em 0.4em;
}
</style>
