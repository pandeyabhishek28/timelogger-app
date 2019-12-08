import Vue from "vue";
import App from './App.vue';
import store from "./store";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleLeft,faArrowAltCircleRight,faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCircle,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue);

//Date time format filter
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format(store.state.DefaultDateTimeFormat)
  }
});

const app = new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
