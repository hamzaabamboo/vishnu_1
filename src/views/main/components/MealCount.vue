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
          tr(v-for='s in ["norm", "spci"]' :key='s.id')
            td: strong {{s == "norm" ? "ธรรมดา" : "พิเศษ"}}
            td: div(align="center") {{total[s]}}
            td.mcenter(v-for='m in meals' :key='m.id'): div(align="center") {{m[s]}}
</template>

<script>
import _ from 'lodash';
import { MealService } from '@/common/api.service';

export default {
  props: ['group'],
	data() {
		return {
			meals: {}
		};
	},
	created() {
		this.meals = this.group == "staff" ? MealService.getStaffMeals() : MealService.getFreshyMeals();
	},
	computed: {
		total() {
			return {
				norm: _.values(this.meals).reduce((a, b) => a + b.norm, 0),
				spci: _.values(this.meals).reduce((a, b) => a + b.spci, 0)
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
