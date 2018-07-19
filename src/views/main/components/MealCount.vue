<template lang='pug'>
  div
    div.cu(style='overflow-y: auto')
      table.table.is-striped._cred(align='center')
        thead
          tr
            td: strong FOOD
            td: strong รวม
            td.mcenter(v-for='m in Object.keys(meals)' :key='m.id')
              div(align="center"): strong {{m}}
        tbody
          tr(v-for='s in fields' :key='s.id')
            td: strong {{ translate(s) || s }}
            td: div(align="center") {{total[s]}}
            td.mcenter(v-for='m in meals' :key='m.id'): div(align="center") {{m[s]}}
</template>

<script>
import _ from 'lodash';
import { MealService } from '@/common/api.service';
import translate from '@/other/language_translate.json';
export default {
	props: ['group'],
	data() {
		return {
			meals: {}
		};
	},
	async created() {
		this.meals =
			(this.group == 'staff'
				? await MealService.getStaffMeals()
				: await MealService.getMeals()
			).data || [];
	},
	methods: {
		translate(word) {
			return translate[word];
		},
		sum(property) {
			return _.values(this.meals).reduce((a, b) => a + b[property], 0);
		},
		fields() {
			return Object.keys(Object.values(this.meals)[0] || {});
		}
	},
	computed: {
		total() {
			return {
				normal: this.sum('normal'),
				islamic: this.sum('islamic'),
				veg: this.sum('veg'),
				total: this.sum('total')
			};
		}
	}
};
</script>

<style scoped>
td {
	padding: 0.3em 0.4em;
}
</style>
