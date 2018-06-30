// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// only import the icons you use to reduce bundle size
// import 'vue-awesome/icons/flag'
// or import all icons if you don't care about bundle size
// import 'vue-awesome/icons'
/* Register component with one of 2 methods */
// import Icon from 'vue-awesome/components/Icon'
import 'font-awesome/css/font-awesome.css'
// globally (in your main .js file)
// Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  filters: {
    unescape: v => unescape(v)
  }
})

// import firebase from 'firebase'
// firebase.initializeApp({
//   apiKey: "AIzaSyDXzaV2gJNVP1b5S-tL-i1gclClaomkQu8",
//   authDomain: "vishnu-en102-a88d3.firebaseapp.com",
//   databaseURL: "https://vishnu-en102-a88d3.firebaseio.com",
//   projectId: "vishnu-en102-a88d3",
//   storageBucket: "vishnu-en102-a88d3.appspot.com",
//   messagingSenderId: "872139643039"
// })
// var fbref = firebase.database().ref('/')
// export {fbref}
