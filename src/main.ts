import 'reflect-metadata';
import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import './axiosClient';
import infiniteScroll from 'vue-infinite-scroll';
import './ioc-container';
import './ant-design';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './tailwind.css';
import './font.css';
import FilterRegistration from './FilterRegistration';

Vue.config.errorHandler = (err, vm) => {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
  vm.$message.error(err.message);
};

Vue.config.productionTip = false;

Vue.use(infiniteScroll);

FilterRegistration.register();

const unsync = sync(store, router);

window.onbeforeunload = () => {
  unsync();
};

new Vue({
  router,
  store,
  render: (h: Function) => h(App),
}).$mount('#app');
