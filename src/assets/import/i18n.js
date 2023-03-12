import Vue from 'vue';
import VueI18n from 'vue-i18n';

//vant
import zhCN_vant from 'vant/lib/locale/lang/zh-CN';
import zhHK_vant from 'vant/lib/locale/lang/zh-HK';
import enUS_vant from 'vant/lib/locale/lang/en-US';
import jaJP_vant from 'vant/lib/locale/lang/ja-JP';

//vxe-table
import zhCN_vxe_table from 'vxe-table/lib/locale/lang/zh-CN';
import zhHK_vxe_table from 'vxe-table/lib/locale/lang/zh-HK';
import enUS_vxe_table from 'vxe-table/lib/locale/lang/en-US';
import jaJP_vxe_table from 'vxe-table/lib/locale/lang/ja-JP';

//other
import zhCN_locale from './../lang/zh_cn';
import zhHK_locale from './../lang/zh_hk';
import enUS_locale from './../lang/en_us';
import jaJP_locale from './../lang/ja_jp';

Vue.use(VueI18n);

const messages = {
  'zh-CN': {
    ...zhCN_vant,
    ...zhCN_vxe_table,
    ...zhCN_locale
  },
  'zh-HK': {
    ...zhHK_vant,
    ...zhHK_vxe_table,
    ...zhHK_locale
  },
  'en-US': {
    ...enUS_vant,
    ...enUS_vxe_table,
    ...enUS_locale
  },
  'ja-JP': {
    ...jaJP_vant,
    ...jaJP_vxe_table,
    ...jaJP_locale
  }
}

const i18n = new VueI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: messages
});

export {
  i18n,
  messages
}