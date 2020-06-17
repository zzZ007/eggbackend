'use strict';

module.exports = app => {
  const { router, controller } = app;
  const backend = controller.backend;
  const front = controller.front;

  router.redirect('/', '/index');
  router.get('/error', front.index.error);
  // 后端
  router.all('/admin', backend.login.login);
  router.get('/captcha', backend.login.captcha);
  router.get('/logout', backend.login.logout);
  router.get('/admin/index', backend.home.index);
  router.get('/admin/users', backend.home.users);
  router.get('/admin/modify', backend.home.modify);
  router.post('/admin/modifyAction', backend.home.modifyAction);
  router.get('/admin/error', backend.home.error);
  // 前端
  router.get('/index', front.index.index);
};
