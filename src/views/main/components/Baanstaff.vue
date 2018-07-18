<template lang='pug'>
  div
    h1.is-size-4 พี่บ้าน
      | {{name}} : ช
      input(@keyup='edit = true' v-model.lazy='ช')
      | , ญ
      input(@keyup='edit = true' v-model.lazy='ญ')
      | , ข้าวพิเศษ
      input(@keyup='edit = true')
      button.button.is-warning.is-small(v-if='edit' @click='update') update
</template>

<script>
export default {
	props: ['name', 'group'],
	data() {
		return {
			edit: false,
			ช: 23,
			ญ: 12
		};
	},
	methods: {
		update() {
			console.log(this.ช + ' ' + this.ญ);
			this.edit = false;
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
</style>
