'use strict';

module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 判断Ajax请求
      app.emit('error', err, this);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && app.config.env === 'prod' ?
        'Internal Server Error' : err.message;
      if (ctx.request.headers['x-requested-with'] !== undefined && ctx.request.headers['x-requested-with'].toLowerCase === 'XMLHttpRequest'.toLowerCase){
        // app.config.env === 'prod'
        ctx.body = {
          code: status, // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
          msg: error,
        };
        if (status === 422) {
          ctx.body.detail = err.errors;
        }
        ctx.status = 200;
      } else {
        return ctx.render('error/error', {
          code: status,
          error,
        });
      }
    }
  };
};
