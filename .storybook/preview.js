import 'reflect-metadata';
import Vue from 'vue';
import '../src/ioc-mock-container.ts';
import infiniteScroll from 'vue-infinite-scroll';
import '../src/ant-design.ts';
import '../src/font.css';
import '../src/tailwind.css';
import FilterRegistration from '../src/FilterRegistration';
Vue.use(infiniteScroll);

FilterRegistration.register();

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: { source: { type: 'code' } },
};
