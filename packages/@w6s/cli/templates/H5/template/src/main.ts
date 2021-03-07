import Vue from 'vue';
import i18n from './i18n';

import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
import service from '@/utils/http/https';

const w6sConfig = require('../w6s.config.js');
const opts = w6sConfig.pluginOptions.outputConfigFile || {};
const fileName = opts.fileName || 'config.json';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'production') {
  axios.get(`/${fileName}`).then(({ data }) => {
    service.defaults.baseURL = data.VUE_APP_BASE_API;
    new Vue({
      router,
      store,
      i18n,
      render: (h) => h(App),
    }).$mount('#app');
  });
} else {
  service.defaults.baseURL = process.env.VUE_APP_BASE_API;
  new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
  }).$mount('#app');
}
