<template lang='pug'>
  div.cu
    div
      h1.is-size-3.cu.bold {{name}}
    div
      span.is-size-6  ธรรมดา
        input.cu(@keyup='edit = true' type='number' v-model.lazy.number='meal.norm')
      span.is-size-6  พิเศษ
        input.cu(@keyup='edit = true' type='number' v-model.lazy.number='meal.spci')
      button.button.is-warning.is-small(v-if='edit' @click='submit') update
</template>

<script>
export default {
  props: {
    group: String,
    name: {
      default: 'ฝ่ายทะเบียน'
    }
  },
  watch: {
    deep: true,
    meal() {
      this.edit = true
    }
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
	methods: {
		submit() {
      this.edit = false
      // handle submit meal
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
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.button.is-warning.is-small {
  margin-left: 6px;
}
</style>
