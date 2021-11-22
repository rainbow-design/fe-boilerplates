import { trim, isNumber, isNaN } from "lodash";

export const required = function(val) {
  return !!(val && trim(val));
};

export const text = function(val) {
  var { maxLength, minLength } = this;
  var len = val.toString().length;
  if (isNumber(minLength) && minLength > len) {
    return false;
  }

  if (isNumber(maxLength) && maxLength < len) {
    return false;
  }
  return true;
};

export const number = function(val) {
  val = +val;
  if (isNaN(val)) {
    return "no_number";
  }

  var { max, min } = this;
  if (isNumber(min) && min > val) {
    return "min";
  }

  if (isNumber(max) && max < val) {
    return "max";
  }

  return true;
};

export const mobile = function(number = "") {
  if (number.length == 0) {
    return "手机号码不能为空";
  }
  if (!/^1[3456789]\d{9}$/.test(number)) {
    if (number.length != 11) {
      return "请输入11位手机号";
    }
    return "手机号码格式不符合规范，请重新填写";
  }
  if (/(123456789|987654321)$/.test(number)) {
    return "手机号码不能连续";
  }
  return true;
};

export const captcha = function(number = "") {
  if (!number) {
    return "请您输入验证码";
  }
  if (!/^\d{6}$/.test(number)) {
    return "请输入4位数字验证码";
  }
  return true;
};
