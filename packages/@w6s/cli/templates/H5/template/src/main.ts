import Vue from "vue";
import CordovaImport from "@w6s/cordova-import";
import i18n from "./i18n";

import App from "./App.vue";
import router from "./router";
import store from "./store";

CordovaImport.init("//workplus.io/"); // URI 无需带上访问协议，必须以斜杠结尾

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
