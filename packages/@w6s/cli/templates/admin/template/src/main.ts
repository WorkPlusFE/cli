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

import getEnvConfig from '@/utils/getEnvConfig';
import service from '@/utils/request';
import i18n from './i18n';

Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

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
