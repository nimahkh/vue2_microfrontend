import Vue from 'vue'
import App from './Base.vue'
import store from './store'
import '@assets/css/style.css'

export default new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
