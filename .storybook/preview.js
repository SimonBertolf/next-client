import 'reflect-metadata';
import Vue from 'vue';
import infiniteScroll from 'vue-infinite-scroll';
import { mockContainer } from '../src/ioc-mock-container.ts';
import '../src/ant-design.ts';
import '../src/font.css';
import '../src/tailwind.css';
import FilterRegistration from '../src/FilterRegistration';
Vue.use(infiniteScroll);

FilterRegistration.register();

mockContainer();

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: { source: { type: 'code' } },
};
