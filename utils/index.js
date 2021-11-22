export default (function() {
  return {
    jweixin: function() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://res2.wx.qq.com/open/js/jweixin-1.4.0.js";
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    },
    /*判断是否是微信小程序环境*/
    isMinProgram: function() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        if (
          this.getQueryString("mpEnv") ||
          window.__wxjs_environment === "miniprogram"
        ) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    /*判断是否是微信内置浏览器*/
    isWeixin: function() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      }
      return false;
    },
    /* 判断是否在app中 */
    isApp: function() {
      return (
        window.hasOwnProperty("android") ||
        (window.hasOwnProperty("webkit") &&
          window.webkit.messageHandlers.hasOwnProperty("iphone"))
      );
    },
    /**
     * isDefined 校验传入值是否有效
     * @param {*} value
     * @return {bool} 校验结果
     */
    isDefined: function(value) {
      if (
        value == null ||
        value == "" ||
        value == "undefined" ||
        value == undefined ||
        value == "null" ||
        value == "(null)" ||
        value == "NULL" ||
        typeof value == "undefined"
      ) {
        return false;
      } else {
        value = value + "";
        value = value.replace(/\s/g, "");
        if (value == "") {
          return false;
        }
        return true;
      }
    },
    /**
     * getQueryString  从url中拿参数值param
     * @param {str} param 要拿的参数名  字符
     * @param {str} url  要从什么链接上面拿参数  字符  支持密文  可选填
     * @return {str} 参数值
     */
    getQueryString: function(param, url) {
      var searchUrl = window.location.search;
      if (url) {
        searchUrl = url.indexOf("?") ? url.substr(url.indexOf("?")) : searchUrl;
      }
      var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
      var r = searchUrl.substr(1).match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      }
      return "";
    },
    /**
     * 从页面url中获取json（url是未被编码的明文格式）
     * <pre>url格式：http://www.baidu.com?action=1&toobar=0
     * @param {str} url  页面的url, 选传, 默认当前页面地址（url是未被编码的明文格式）
     * @returns {obj} json    json对象
     */
    getQueryJson: function(url) {
      var json = {};
      var urlStr = this.isDefined(url) ? url : location.href;
      var splits = urlStr.split("?");
      if (splits && splits.length >= 2) {
        var array = splits[1].split("&");
        if (array && array.length > 0) {
          for (var i = 0; i < array.length; i++) {
            var params = array[i].split("="); // 拆分形式为key=value形式的参数
            json[params[0]] = params[1]; // 第一个参数表示key，第二个参数表示value
          }
        }
      }
      return json;
    },
    /* 判断是否为数组 */
    isArray: function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    },
    /**
     * isFunction 校验传入值是否为function
     * @param {*} value
     * @return {Boolean} 校验结果
     */
    isFunction: function(obj) {
      return Object.prototype.toString.call({ obj }) === "[object Function]";
    },
  };
})();
