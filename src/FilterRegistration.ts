import Vue from 'vue';
import { tableNumberFilter, percentNumberFilter, simpleNumberFilter } from './util';

class FilterRegistration {
  register(): void {
    Vue.filter('tableNumber', tableNumberFilter);
    Vue.filter('percentNumber', percentNumberFilter);
    Vue.filter('simpleNumber', simpleNumberFilter);
  }
}

export default new FilterRegistration();
