import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import infiniteScroll from 'vue-infinite-scroll';
// importing just needed icons for smaller bundle size
import 'vue-awesome/icons/user-o';
import 'vue-awesome/icons/lock';
import 'vue-awesome/icons/envelope-o';
import 'vue-awesome/icons/times-circle';
import 'vue-awesome/icons/close';
import 'vue-awesome/icons/check-circle';
import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/cloud-upload';
import 'vue-awesome/icons/spinner';
import 'vue-awesome/icons/ellipsis-h';
import 'vue-awesome/icons/trash-o';
import 'vue-awesome/icons/chevron-left';
import 'vue-awesome/icons/chevron-right';
import Icon from 'vue-awesome/components/Icon';

import router from './router';
import { store } from './store/store';

Vue.use(Vuelidate);
Vue.use(infiniteScroll);
Vue.component('icon', Icon);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
