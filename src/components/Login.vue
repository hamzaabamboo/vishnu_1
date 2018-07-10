<template>
  <section class='section'>
    <div class="box">
      <h1 class='title'>vishnu</h1>
      <code>user : A, pwd : A</code><br>
      <code>user : B, pwd : B</code><br>
      <code>user : staff, pwd : staff</code><br>
      <code>user : nurse, pwd : nurse</code><br>
      <code>user : supply, pwd : supply</code>
      <div>
        <input v-model='usr' class='input has-text-centered' placeholder="username" required type='text'>
        <input v-model='pwd' class='input has-text-centered' placeholder="password" required type='password'>
      </div>
      <input @click='login' type="submit" class='button is-warning' tag="button" value='submit'>
    </div>
  </section>
</template>

<script>
import md5 from 'md5';
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
				.dispatch(LOGIN, { username: this.usr, password: md5(this.pwd) })
				.then(() => this.$router.push({ name: 'Main' }))
				.catch();
		}
	}
};
</script>

<style scoped>
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
