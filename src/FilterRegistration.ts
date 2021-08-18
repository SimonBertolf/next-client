import Vue from 'vue';
import {
  tableNumberFilter,
  percentNumberFilter,
  simpleNumberFilter,
  dateTimeFilter,
  dateFormatFilter,
  dateMonthFilter,
} from './util/filters';

class FilterRegistration {
  register(): void {
    Vue.filter('tableNumber', tableNumberFilter);
    Vue.filter('percentNumber', percentNumberFilter);
    Vue.filter('simpleNumber', simpleNumberFilter);
    Vue.filter('dateTime', dateTimeFilter);
    Vue.filter('dateFormatFilter', dateFormatFilter);
    Vue.filter('dateMonth', dateMonthFilter);
  }
}

export default new FilterRegistration();
