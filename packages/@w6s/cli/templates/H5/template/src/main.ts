import Vue from 'vue';
import i18n from './i18n';

import App from './App.vue';
import router from './router';
import store from './store';

import getEnvConfig from '@/utils/getEnvConfig';
import service from '@/utils/http/https';

Vue.config.productionTip = false;

getEnvConfig().then((baseUrl) => {
  service.defaults.baseURL = baseUrl;
  new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
  }).$mount('#app');
});
