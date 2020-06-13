/*
* @ author Administrator
* @ time   2018/11/13/013 18:41
* @ description
* @ param
*/
'use strict';
module.exports = options => {
  return async function interceptor(ctx, next) {
    const userInfo = ctx.session.userInfo;
    if (!userInfo) {
      return ctx.redirect('/');
    }
    // 模板引擎配置全局的变量
    ctx.state = Object.assign(ctx.state, { user: userInfo });
    await next();
  };
};
