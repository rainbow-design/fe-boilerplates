const AutoPrefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
module.exports = ({ file }) => {
  let libDirNames = ["vant"];
  let remUnit = 100;
  //对于第三方UI库vant,使用设计图稿为375,换算比例应为50
  if (
    file &&
    file.dirname &&
    libDirNames.findIndex((item) => file.dirname.includes(item)) != -1
  ) {
    remUnit = 50;
  } else {
    remUnit = 100;
  }
  return {
    plugins: [
      AutoPrefixer({
        overrideBrowserslist: ["last 20 versions", "android >= 4.0"],
      }),
      pxtorem({
        rootValue: remUnit,
        propList: ["*"],
        // 转换rem会导致ios手机转圈异常
        selectorBlackList: ["van-circle__layer", "van-loading__spinner"],
      }),
    ],
  };
};
