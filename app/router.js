'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/index');
  // 后端
  router.get('/admin', controller.backend.admin.login);
  router.post('/admin/login', controller.backend.admin.loginAction);
  router.get('/captcha', controller.backend.admin.captcha);
  router.get('/logout', controller.backend.admin.logout);
  router.get('/admin/index', controller.backend.home.index);
  router.get('/admin/orders', controller.backend.home.orders);

  // 前端
  router.get('/index', controller.front.index.index);
};
