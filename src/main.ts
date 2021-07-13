import 'reflect-metadata';
import { sync } from 'vuex-router-sync';
import Vue, { VNode } from 'vue';
import infiniteScroll from 'vue-infinite-scroll';
import './axiosClient';
import { initIocContainer } from './ioc-container';
import './ant-design';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './tailwind.css';
import './font.css';
import FilterRegistration from './FilterRegistration';

initIocContainer();

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (h: (arg: any) => VNode) => h(App),
}).$mount('#app');
