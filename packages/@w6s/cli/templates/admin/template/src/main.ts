import Vue from 'vue';

import 'normalize.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';

import '@/styles/element-variables.scss';
import '@/styles/index.scss';

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import '@/icons/components';
import '@/permission';

import axios from 'axios';
import service from '@/utils/request';
import i18n from './i18n';

const w6sConfig = require('../w6s.config.js');

const opts = w6sConfig.pluginOptions.outputConfigFile || {};
const fileName = opts.fileName || 'config.json';

Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

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
