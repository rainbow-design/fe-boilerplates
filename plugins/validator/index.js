import Validator from "./validator";

/**
 * 验证配置
 * @param {Array<Object{value, vaild}>} validatorArr
 * @param {*} data
 */
export const verifyData = async (validatorArr, data) => {
  for (let item of validatorArr) {
    let { value, vaild } = item;
    let err = await Validator.verify(value, vaild, data);
    if (!err.pass) {
      return err;
    }
  }
  return {
    pass: true
  };
};

export const UserPhone = [new Validator({ rule: "mobile" })];

export const UserCaptcha = [new Validator({ rule: "captcha" })];

export default Validator;
