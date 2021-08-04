import Vue from 'vue';
import { tableNumberFilter, percentNumberFilter, simpleNumberFilter, dateTimeFilter, dateFormatFilter } from './util';

class FilterRegistration {
  register(): void {
    Vue.filter('tableNumber', tableNumberFilter);
    Vue.filter('percentNumber', percentNumberFilter);
    Vue.filter('simpleNumber', simpleNumberFilter);
    Vue.filter('dateTime', dateTimeFilter);
    Vue.filter('dateFormatFilter', dateFormatFilter);
  }
}

export default new FilterRegistration();
