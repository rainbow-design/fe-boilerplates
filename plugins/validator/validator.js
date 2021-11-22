import { isString, isFunction, isBoolean } from "lodash";
import * as baseRule from "./base-rule";

class Validator {
  constructor(opt) {
    Object.assign(this, opt);
    if (!opt.rule || isString(opt.rule)) {
      this.rule = Validator.rules[opt.rule];
    }
    if (!isFunction(this.rule)) {
      console.warn(
        `验证器"${this.rule}"未定义或不是一个函数，请检查或定义该验证器`
      );
      this.rule = Validator.noop;
    }
  }

  static noop = () => true;

  // 验证
  async verify(val, form) {
    var tmp = await this.rule(val, form);
    var pass = isBoolean(tmp) ? tmp : !tmp;
    return {
      pass,
      validator: this,
      errMsg: pass
        ? "ok"
        : isFunction(this.errMsg)
        ? this.errMsg(tmp, { data: form, val })
        : this.errMsg || tmp
    };
  }

  // 判断对错
  test(val, form, other) {
    let tmp = this.rule(val, form, other);
    return isBoolean(tmp) ? tmp : !tmp;
  }
}

Validator.rules = {};

Validator.addRule = function(ruleName, fn) {
  Validator.rules[ruleName] = fn;
};

Validator.verify = async function(val, verify = [], form) {
  for (let verifyItem of verify) {
    var verified = await verifyItem.verify(val, form);
    if (!verified.pass) {
      return verified;
    }
  }
  return {
    errMsg: "ok",
    pass: true
  };
};

// 添加全局rule
for (let name in baseRule) {
  Validator.addRule(name, baseRule[name]);
}
export default Validator;
