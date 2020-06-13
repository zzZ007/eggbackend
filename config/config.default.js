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
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.ico')),
  };
  // 项目描述
  config.product = {
    productName: 'GosBackend',
    productDescription: '后台管理系统',
    copyright: '2018-2020',
    productUrl: '',
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
    'interceptor',
    'errorHandler',
  ];
  config.compress = {
    threshold: 2048,
  };
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
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };
  // 配置mysql信息
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    dialectOptions: {
      charset: 'utf8',
      // collate: 'utf8_general_ci',
      dateStrings: true,
      typeCast: true,
    },
    underscored: true,
    timezone: '+08:00',
    port: 3306,
    database: 'gos_backend', // mysql database dir
    username: 'root',
    password: 'root',
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };
  // config.redis = {
  //     client: {
  //         port: 6379,          // Redis port
  //         host: '127.0.0.1',   // Redis host
  //         password: '',
  //         db: 0,
  //     },
  // };
  config.multipart = {
    fileExtensions: [
      '.xlsx',
      '.apk',
    ],
  };
  // config.sms = {
  //     client: {
  //         accessKeyId: 'your access key',
  //         secretAccessKey: 'your access secret'
  //     }
  // }
  // config.oss = {
  //     client: {
  //         accessKeyId: 'your access key',
  //         accessKeySecret: 'your access secret',
  //         bucket: 'your bucket name',
  //         endpoint: 'oss-cn-hongkong.aliyun.com',
  //         timeout: '60s',
  //     },
  // };
  config.console = {
    // local 环境下默认值均为 true，prod 环境下均为 false
    debug: true,
    error: true,
  };
  // email配置
  config.mail = {
    host: 'smtp.163.com',
    port: 465,
    auth: {
      user: '',
      pass: '',
    },
    from: '',
  };
  return config;
};
