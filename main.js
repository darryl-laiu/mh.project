import Vue from 'vue'
import App from './App.vue'
import Viz1 from './viz1.vue'
import BootstrapVue from 'bootstrap-vue'
import HighchartsVue from 'highcharts-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'

import firebase from "firebase";



// Initialize Firebase
const config = {
	apiKey: "AIzaSyAc5ckVrledPH5OGwpokZJRasJwLhyBg0c",
	authDomain: "mhl-database.firebaseapp.com",
	databaseURL: "https://mhl-database.firebaseio.com",
	projectId: "mhl-database",
	storageBucket: "mhl-database.appspot.com",
	messagingSenderId: "757268950135"
};
firebase.initializeApp(config);

export const database = firebase.database();

Vue.use(database)

stockInit(Highcharts)

Vue.use(HighchartsVue);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  render: h => h(Viz1),
}).$mount('#viz1')
