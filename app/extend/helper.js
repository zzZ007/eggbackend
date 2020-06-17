/*
* @ author Administrator
* @ time   2018/11/14/014 11:40
* @ description
* @ param
*/
'use strict';

exports.encrypt = require('simple-encryptor')('afdasf1feafsdafdsafdaf112eaffaba');

exports.isEmpty = function(obj) {
  return obj === '' || obj === null || obj === void 0 || (Array.isArray(obj) && obj.length === 0);
};

exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = 200;
};

exports.errCode = {
  ParamErr: 201,
  NotFound: 202,
};

module.exports.addPage = (res, page, pageSize = 10) => {
  res.page = page;
  res.total = parseInt((res.count / pageSize) + 1 + '');
};
