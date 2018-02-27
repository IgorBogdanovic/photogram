import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import infiniteScroll from 'vue-infinite-scroll'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import router from './router'
import { store } from './store/store'

Vue.use(Vuelidate);
Vue.use(infiniteScroll);
Vue.component('icon', Icon);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
