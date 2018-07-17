<template lang='pug'>
  section.section(style='display: flex; align-items: center; justify-content: center;')
    div.box
      h1.title vishnu
      div
        input.input.has-text-centered(v-model='usr' placeholder="username" required type='text')
        input.input.has-text-centered(v-model='pwd' placeholder="password" required type='password')
      button.button.is-warning(@click='login' value='submit')
</template>

<script>
import { LOGIN } from '@/store/actions.type';
export default {
	name: 'Login',
	data() {
		return {
			usr: '',
			pwd: ''
		};
	},
	methods: {
		login() {
			this.$store
				.dispatch(LOGIN, { username: this.usr, password: this.pwd })
				.then(() => this.$router.push({ name: 'Main' }))
				.catch();
		}
	}
};
</script>

<style lang='stylus' scoped>
section {
	max-width: 400px;
	min-height: 720px;
	margin: 0px auto;
}

input {
	margin: 5px auto;
}

.button {
	margin-top: 10px;
	width: 100%;
}

.box {
	margin: 0px auto;
}

code {
	font-size: 14px;
}
</style>
