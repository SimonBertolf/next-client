import Vue from 'vue';
import Vuex from 'vuex';
import * as modules from './modules';
import { AuthLoader, AssetLoader } from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules,
  plugins: [AuthLoader, AssetLoader],
});
