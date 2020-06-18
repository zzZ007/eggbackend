'use strict';
const path = require('path');
const fs = require('fs');
module.exports = appInfo => {
  const config = exports = {};
  config.keys = appInfo.name + '_aslkfdjsoajfdoajo';
  // 项目启动ip和端口
  config.cluster = {
    listen: {
      port: 8080,
    },
  };
  // session配置
  config.session = {
    key: 'safdafqf1fafa',
    maxAge: 1800 * 1000,
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  exports.bcrypt = {
    saltRounds: 10, // default 10
  };
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.ico')),
  };
  // 项目描述
  config.info = {
    name: 'GosBackend',
    desc: '后台管理系统',
    version: '1.0.0',
  };
  // 项目资源路径
  config.asserts = {
    webStatic: 'app/public/upload/web',
  };
  // 项目静态模板设置
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.middleware = [
    'interceptor', // 用户拦截
    'errorHandler', // 错误拦截
  ];
  // 不检查用户登录
  config.interceptor = {
    ignore(ctx) {
      const ignoreUrl = [
        '/',
        '/admin',
        '/index',
        '/captcha',
        '/admin/login',
        '/logout',
      ];
      const url = ctx.request.url;
      return ignoreUrl.some(item => {
        return url === item;
      });
    },
  };
  // 跨站配置
  config.security = {
    csrf: {
      useSession: false,
      enable: false,
      ignoreJSON: false,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
      headerName: 'x-csrf-token',
      bodyName: '_csrf',
      queryName: '_csrf',
    },
    domainWhiteList: [ 'http://localhost:7001' ],
  };
  // 跨越配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };
  // 异常页面跳转
  // config.onerror = {
  //   // 线上页面发生异常时，重定向到这个页面上
  //   errorPageUrl: 'error/error.html',
  // };
  config.notfound = {
    pageUrl: '/error',
  };
  // 配置mysql信息
  config.sequelize = {
    dialect: 'mysql',
    host: '47.105.204.69',
    dialectOptions: { // 配置日期返回格式化
      charset: 'utf8',
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+08:00',
    underscored: true,
    port: 3306,
    database: 'simple_zy', // mysql database dir
    username: 'simpley_zy',
    password: '5wn3WKtZaXncZaci',
    pool: {
      max: 5, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };
  config.multipart = {
    fileExtensions: [
      '.xlsx',
      '.apk',
    ],
  };
  config.console = {
    // local 环境下默认值均为 true，prod 环境下均为 false
    debug: true,
    error: true,
  };
  return config;
};
