<template lang='pug'>
  div
    div.cu(style='overflow-y: auto')
        | Others
        ul(v-for='group in Object.keys(list)')
            h4 {{ group }}
            li(v-for='other in food(group)') {{ other.food_allergy }}
</template>

<script>
import _ from 'lodash';
import { MealService } from '@/common/api.service';
import translate from '@/i10n/language_translate.json';
export default {
	props: ['list'],
	// data() {},
	async created() {},
	methods: {
		translate(word) {
			return translate[word];
		},
		food(group) {
			return this.list[group].other.filter(e => e.food_allergy);
		}
	}
};
</script>

<style scoped>
td {
	padding: 0.3em 0.4em;
}
</style>
