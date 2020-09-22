import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Route } from "vue-router";
import router from "./router";
import { UserModule } from "./store/modules/user";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start();
  if (UserModule.token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login?redirect=${to.path}`);
    NProgress.done();
  }
});

router.afterEach(() => {
  // Finish progress bar
  NProgress.done();
});
