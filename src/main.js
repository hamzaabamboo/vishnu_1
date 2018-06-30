// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
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
