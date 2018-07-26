<template lang='pug'>
  div(style='margin: 20px auto 10px auto')
    div.cu(style='overflow-y: auto')
      h3.cu.bold.is-size-4 Others
      div.mcenter: table(align='center')
        tr(v-for='group in Object.keys(list)' v-if='list[group].other.length != 0')
          td: h4.is-inline {{ group }} :
          td: li.is-inline(v-for='it in list[group].other')  {{ it.food_allergy || 'null' }}
            // li(v-for='other in food(group)') {{ other.food_allergy }}
</template>

<script>
import _ from 'lodash';
import { MealService } from '@/common/api.service';
import translate from '@/i10n/language_translate.json';
export default {
	props: ['list'],
	// data() {},
	created() {
  },
	methods: {
		translate(word) {
			return translate[word];
		},
		food(group) {
			let otherFood = this.list[group].other.filter(e => e.food_allergy);
			return otherFood.length > 0 ? otherFood : [{ food_allergy: 'none' }];
		}
	}
};
</script>

<style scoped>
td {
	padding: 0.3em 0.4em;
}
</style>
