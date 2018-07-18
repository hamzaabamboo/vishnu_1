<template>
  <div id="app">
    <router-view/>
    <error-modal />
  </div>

</template>

<script>
import './App.css';
import ErrorModal from '@/components/ErrorModal';
export default {
	components: { ErrorModal },
	name: 'App'
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: #9e1028;
}
</style>
