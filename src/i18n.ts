import Vue from 'vue';
import VueI18n from 'vue-i18n';
import './ioc-container';
import { container, cid } from 'inversify-props';
import { IEventBus } from '@/services';
import { SupportedLocalesList } from './types';

const supportedLocales = SupportedLocalesList;

const eventBus: IEventBus = container.get<IEventBus>(cid.IEventBus);

Vue.use(VueI18n);

function getBrowserLocale(options = {}) {
  const defaultOptions = { countryCodeOnly: false };
  const opt = { ...defaultOptions, ...options };
  const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
  if (!navigatorLocale) {
    return undefined;
  }
  return opt.countryCodeOnly ? navigatorLocale.trim().split(/-|_/)[0] : navigatorLocale.trim();
}

function supportedLocalesInclude(locale: string | undefined) {
  if (locale) return Object.keys(supportedLocales).includes(locale);
  return undefined;
}

function getStartingLocale() {
  const browserLocale: string | undefined = getBrowserLocale({ countryCodeOnly: true });
  if (supportedLocalesInclude(browserLocale)) {
    return browserLocale;
  }
  return process.env.VUE_APP_I18N_LOCALE || 'de';
}

const i18n = new VueI18n({
  locale: getStartingLocale(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'de',
  messages: {},
});

const loadedLanguages: Array<string> = [];

export function loadLocaleMessages(locale: string): Promise<string> {
  eventBus.$emit('i18n-load-start');
  if (loadedLanguages.length > 0 && i18n.locale === locale) {
    eventBus.$emit('i18n-load-complete');
    return Promise.resolve(locale);
  }
  // If the language was already loaded
  if (loadedLanguages.includes(locale)) {
    i18n.locale = locale;
    eventBus.$emit('i18n-load-complete');
    return Promise.resolve(locale);
  }
  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`).then((messages) => {
    i18n.setLocaleMessage(locale, messages.default);
    loadedLanguages.push(locale);
    i18n.locale = locale;
    eventBus.$emit('i18n-load-complete');
    return Promise.resolve(locale);
  });
}

export default i18n;
