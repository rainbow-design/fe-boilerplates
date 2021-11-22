const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

let baseUrl = "/";
//资源路径前缀，生产环境使用cdn域名
let publicPath = process.env.PATH_TYPE !== "production" ? "/_nuxt/" : "/_nuxt/";
export default {
  mode: "universal", // 普遍的 —— 同构应用程序(服务端呈现 + 客户端路由导航)
  env: {
    PATH_TYPE: process.env.PATH_TYPE, // 在项目代码中直接使用 process.env.PATH_TYPE 直接获取环境参数
  },
  vue: {
    config: {
      productionTip: false,
      devtools: process.env.PATH_TYPE !== "production" ? true : false,
    },
  },
  router: {
    base: baseUrl, //项目访问路径
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-demo",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: `${baseUrl}css/weui.min.css`,
      },
    ],
    script: [
      {
        src: `${baseUrl}js/weui.min.js`,
      },
    ],
  },
  loading: {
    color: "rgb(0, 197, 142)",
    height: "3px",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/entry-plugin/main.js",
      ssr: true,
    },
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],
  axios: {
    proxy: true, // 表示开启代理
    // prefix: '/api/chanel', // 表示给请求url加个前缀 /api
    credentials: true, // 表示跨域请求时是否需要使用凭证
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
    extend(config, { isClient }) {
      // 为 客户端打包 进行扩展配置
      if (isClient) {
        config.externals = {};
        // config.devtool = "eval-source-map"; //需要时才放开
        // 非开发环境移除runtime打包
        if (process.env.PATH_TYPE != "development") {
          config.externals["vue"] = "Vue";
          config.externals["vuex"] = "Vuex";
          config.externals["vue-router"] = "VueRouter";
        }
      }
      // 增加别名，
      ["common", "components"].forEach(function (item) {
        config.resolve.alias["rainbow-" + item] = path.resolve(
          __dirname,
          "rainbow-common/" + item
        );
      });
      config.plugins.unshift(new LodashModuleReplacementPlugin());
      config.module.rules[2].use[0].options.plugins = ["lodash"];
    },
    publicPath: publicPath,
    transpile: [/vant.*?less/],
    babel: {
      plugins: [
        [
          "lodash",
          {
            libraryName: "lodash", //配置lodash按需加载
            libraryDirectory: "",
            camel2DashComponentName: false,
          },
          "lodash",
        ],
        [
          "import",
          {
            libraryName: "vant", //配置vant按需加载
            style: (name) => `${name}/style/less.js`,
          },
          "vant",
        ],
      ],
    },
    extractCSS: { allChunks: false },
    analyze: true,
    profile: false,
  },
  render: {
    resourceHints: false,
    asyncScripts: true,
  },
  proxy: {
    "/api": {
      target: "https://xxx.cn", // 目标接口域名
      changeOrigin: true, // 表示是否跨
    },
  },
};
