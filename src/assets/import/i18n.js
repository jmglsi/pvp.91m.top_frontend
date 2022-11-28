import Vue from 'vue';
import VueI18n from "vue-i18n";
import { Locale } from 'vant';
import zhCN from 'vant/lib/locale/lang/zh-CN';
import enUS from 'vant/lib/locale/lang/en-US';
import zhCNLocale from './../lang/zh_cn';
import enUSLocale from './../lang/en_us';

Vue.use(VueI18n);

const messages = {
  'zh-CN': {
    ...zhCN,
    ...zhCNLocale
  },
  'en-US': {
    ...enUS,
    ...enUSLocale
  }
}

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: messages
});

function vantLocale(lang) {
  if (lang == 'zh-CN') {
    Locale.use(lang, zhCN)
  } else if (lang == 'en-US') {
    Locale.use(lang, enUS)
  }
}

export {
  i18n,
  vantLocale
}