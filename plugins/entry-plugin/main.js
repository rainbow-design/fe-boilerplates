import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import {
  Toast,
  Loading,
  Notify,
  Dialog,
  Button,
  Image as VantImage,
  Lazyload,
} from "vant";
import "vant/lib/index.css";
import "@/styles/common.scss";

import $http from "@/plugins/http/http";

// ! 注意:配置按需加载后，不允许全量引入vant
Vue.use(Toast)
  .use(Loading)
  .use(Notify)
  .use(Dialog)
  .use(Button)
  .use(VantImage)
  .use(Lazyload, {
    lazyComponent: true,
  });

let main = {
  install(Vue) {
    // 变量的内容 后期可以在vue中 this->$api.xxx 使用
    Vue.prototype.$http = $http;
    //注册全局toast和loading
    Vue.prototype.$toast = function ({ text = "", duration = 2000 }) {
      try {
        let vm = Toast({
          message: text,
          duration,
        });
        vm.$nextTick(() => {
          vm.$el.setAttribute("id", "Toast_text");
        });
      } catch (err) {
        console.log(err);
      }
    };
    Vue.prototype.$loading = {
      show(text) {
        Toast.loading({
          message: text || "加载中...",
          loadingType: "spinner",
          forbidClick: true,
          duration: 0,
        });
      },
      hide() {
        Toast.clear();
      },
    };
    //注册notify事件
    Vue.prototype.$notify.showTips = function (msg) {
      try {
        let vm = Notify({
          message: msg,
          duration: 2000,
          background: "#4fc08d",
        });
        vm.$nextTick(() => {
          vm.$el.setAttribute("id", "Notify_text");
        });
      } catch (err) {
        console.log(err);
      }
    };
  },
};
Vue.use(main); // 这里不能丢

// 这里是 为了在 asyncData 方法中使用
export default ({ store }, inject) => {
  //同时注入到vue实例和context
  if (!process.server) {
    // vuex缓存
    createPersistedState({
      key: "vuex_Storage",
      storage: window.sessionStorage,
    })(store);
  }
};
