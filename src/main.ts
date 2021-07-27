import 'reflect-metadata';
import { sync } from 'vuex-router-sync';
import Vue, { VNode } from 'vue';
import infiniteScroll from 'vue-infinite-scroll';
import * as am4core from '@amcharts/amcharts4/core';
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
import { environment } from './config';

const { AMCHART_LICENSE_KEY } = environment;

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

am4core.addLicense(AMCHART_LICENSE_KEY);

new Vue({
  router,
  store,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (h: (arg: any) => VNode) => h(App),
}).$mount('#app');
