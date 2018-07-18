<template lang='pug'>
  div.errorModal(v-if='isOpen')
    div.card
        div.card-content(v-if='errors.length == 1')
            h3 {{ errors[0].title }}
            p {{ errors[0].message }}
        div.card-content(v-else)
            h3 You got following getErrors
            ul
                li(v-for="error in errors" :key="error.title - error.message") {{ error.message }}
        div.cardFooter
            button.button.is-warning(v-on:click="close") Close
</template>

<script>
import { CLEAR_ERROR } from '@/store/actions.type';
export default {
	data() {
		return {};
	},
	methods: {
		close() {
			return this.$store.dispatch(CLEAR_ERROR);
		}
	},
	computed: {
		isOpen() {
			return this.$store.getters.hasErrors;
		},
		errors() {
			return this.$store.getters.getErrors;
		}
	}
};
</script>



<style scoped>
.errorModal {
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.2);
	position: fixed;
	top: 0;
	left: 0;
}
.card {
	margin: 10vh auto;
	width: 80%;
	background-color: white;
	border-radius: 10px;
	text-align: left;
	padding: 20px;
}
.card h3 {
	font-size: 2.4em;
	font-weight: 500;
}
.card p {
	font-size: 1.2em;
	min-height: 100px;
}
.cardFooter {
	text-align: right !important;
}
</style>
