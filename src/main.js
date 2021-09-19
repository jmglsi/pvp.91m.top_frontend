import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

Vue.config.productionTip = false;
//阻止启动生产消息

import VueMeta from 'vue-meta';
Vue.use(VueMeta);

import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

import 'vant/lib/index.less';
//less

import './assets/import/antd';
import './assets/import/vant';

import 'xe-utils';
import './assets/import/vxe-table';
//js

import './assets/js/app.config';
import './assets/js/bilibili.config';

import appApi from './assets/js/api.config';
Vue.prototype.$appApi = appApi;

import appMsg from './assets/js/code.config';
Vue.prototype.$appMsg = appMsg;

import store from './assets/js/store.config';
router.beforeEach((to, from, next) => {
    store.state.previousPage.push(from);

    document.title = to.meta.title + " | " + Vue.prototype.$appConfigInfo.appInfo.name;
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    next();
})

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        document.dispatchEvent(new Event('render-event'));
        //预渲染
    }
}).$mount('#app')