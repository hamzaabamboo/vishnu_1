<template>
  <section class='section' style='display: flex; align-items: center; justify-content: center;'>
    <div class="box">
      <h1 class='title'>vishnu</h1>
      <code>user : A, pwd : A</code><br>
      <code>user : B, pwd : B</code><br>
      <code>user : staff, pwd : staff</code><br>
      <code>user : nurse, pwd : nurse</code><br>
      <code>user : supply, pwd : supply</code>
      <code>{{md5_pwd}}</code><br/>
      <div>
        <input v-model='usr' class='input has-text-centered' placeholder="username" required type='text'>
        <input v-model='pwd' class='input has-text-centered' placeholder="password" required type='password'>
      </div>
      <input @click='router_table' type="submit" class='button is-warning' tag="button" value='submit'>
    </div>
  </section>
</template>

<script>
import md5 from 'md5';
export default {
	name: 'Login',
	data() {
		return {
			usr: '',
			pwd: ''
		};
	},
	created() {
		localStorage.clear();
	},
	methods: {
		router_table() {
			if (this.valid_user) {
				let data = require('../other/login_user.json')[this.usr];
				localStorage.setItem('args', JSON.stringify(data));
				this.$router.push('/');
			} else {
				alert('user not valid');
			}
		}
	},
	computed: {
		md5_pwd() {
			return md5(this.pwd);
		},
		valid_user() {
			let lgn = require('../other/login_user.json');
			return this.usr in lgn && md5(this.pwd) == lgn[this.usr].pwd;
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
