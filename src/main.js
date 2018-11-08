import Vue from 'vue'
import App from './App.vue'
import Viz1 from './viz1.vue'
import BootstrapVue from 'bootstrap-vue'
import HighchartsVue from 'highcharts-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
