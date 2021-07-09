import Vue from 'vue';
import Vuex from 'vuex';
import * as modules from './modules';
import { AuthLoader, AssetLoader, DashboardLoader, ReportLoader } from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules,
  plugins: [AuthLoader, AssetLoader, DashboardLoader, ReportLoader],
});
