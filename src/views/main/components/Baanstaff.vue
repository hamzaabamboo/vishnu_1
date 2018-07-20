<template lang='pug'>
  div.cu
    div
      h1.is-size-3.cu.bold {{name}}
    div(v-if="hasMealGroup")
      span.is-size-6  ธรรมดา
        input.cu(@keyup='edit = true' type='number' v-model.lazy.number='meal.normal')
      span.is-size-6  อิสลาม
        input.cu(@keyup='edit = true' type='number' v-model.lazy.number='meal.islamic')
      span.is-size-6  มังสวิรัติ
        input.cu(@keyup='edit = true' type='number' v-model.lazy.number='meal.veg')
      button.button.is-warning.is-small(v-if='edit' @click='submit') update
</template>

<script>
import { MealGroupStorage } from '@/common/jwt.service';
import { StaffService } from '@/common/api.service';
export default {
	props: {
		group: String,
		name: {
			default: 'ไม่ระบุชื่อ'
		}
	},
	watch: {
		deep: true,
		meal() {}
	},
	data() {
		return {
			edit: false,
			meal: {
				norm: '',
				spic: ''
			}
		};
	},
	async created() {
		if (this.hasMealGroup) {
			this.meal = await StaffService.getStaffMeals();
			this.edit = false;
		}
	},
	methods: {
		submit() {
			this.edit = false;
			StaffService.setStaffMeals(this.meal);
		}
	},
	computed: {
		hasMealGroup() {
			return MealGroupStorage.get !== 'null';
		}
	}
};
</script>

<style scoped>
input {
	font-size: 20px;
	border: none;
	width: 40px;
	text-align: center;
	border-bottom: 1px solid rgb(212, 212, 212);
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
.button.is-warning.is-small {
	margin-left: 6px;
}
</style>
