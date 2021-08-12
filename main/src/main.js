import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/main'

import routes from './routes'
import routes1 from 'account/Routes'
import store from "account/Store"
import '@assets/css/style.css'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes.concat(routes1)
})

Vue.component("counter", () => import("account/Content"));
Vue.component("button-count", () => import("account/Button"));
Vue.component("todo-input", () => import("account/TodoInput"));
Vue.component("todo-list", () => import("account/TodoList"));


export default new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
