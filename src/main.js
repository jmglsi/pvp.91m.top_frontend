import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import './assets/js/app.config';

import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

import VueMeta from 'vue-meta';
Vue.use(VueMeta);

import watermark from 'vue-watermark-directive';
Vue.use(watermark);

import store from './assets/import/store';
Vue.prototype.$store = store;

import appApi from './assets/js/api.config';
Vue.prototype.$appApi = appApi;

import appMsg from './assets/js/code.config';
Vue.prototype.$appMsg = appMsg;

import { i18n } from './assets/import/i18n';

import 'v-charts/lib/style.css';

import 'xe-utils';
import './assets/import/vxe-table';

import './assets/import/antd';
import './assets/import/vant';

router.afterEach(() => {
  Vue.prototype.$appInitMiniapp();
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | ' + Vue.prototype.$appConfigInfo.appInfo.name;
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  next();
})

Vue.config.productionTip = false;
//阻止启动时生成生产提示

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
  /*
    mounted() {
      document.dispatchEvent(new Event('render-event'));
      //预渲染
    }
  */
}).$mount('#app')