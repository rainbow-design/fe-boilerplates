import { required, idCard } from "./base-rule";
import { checkBirthDate } from "tk-common/util/insured";

// 保单生效日等待时间
const waitingTime = 1; //  TODO

export const applicantId = (id, form) => {
  if (!required(id)) {
    return "请填写投保人身份证号";
  }
  // 脱敏信息验证
  let { applicantIdEncrypt, applicantId } = form.encryptInfo;
  // 校验年龄
  if (!applicantIdEncrypt || applicantId !== id) {
    if (!idCard(id)) {
      return "投保人身份证号码格式错误";
    }
  }
  // 根据其它条件判断是不是要验证生日，性别等
  if (true) {
    let {
      applicationInfo: { applicantBirth: birth }
    } = form;
    return applicantBirth(birth, form);
  }
};

export const applicantBirth = (brith, form) => {
  let { insureType } = form;

  // 一、 生日判断
  // 1. 生日必填
  if (!required(brith)) {
    return "请选择投保人出生日期";
  }

  // 二、 生日对应的年龄判断

  // 1. 为自己投保
  if (insureType === "01") {
    if (
      !checkBirthDate(
        brith,
        { year: 18, day: -waitingTime },
        { year: 65, day: -waitingTime }
      )
    ) {
      return "为本人投保，投保人年龄应为18-65岁";
    }
  } else {
    //为他人投保校验
    if (
      !checkBirthDate(
        brith,
        { year: 18, day: -waitingTime },
        { year: 105, day: -waitingTime }
      )
    ) {
      return "为他人投保，投保人年龄应为18-105岁";
    }
  }
  return true;
};
