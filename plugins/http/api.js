import http from "./http.js";

// 保费测算
export const postCalculator = (params, config) =>
  http.post(`/api/v2/insure/premium/calculator`, params, config);
