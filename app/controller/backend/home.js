'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    await this.ctx.render('backend/home', {
      info: this.ctx.app.config.info,
    });
  }
  async users() {
    let { page } = this.ctx.request.query;
    if (page === undefined){
      page = 1;
    } else {
      page = parseInt(page);
    }
    const res = await this.service.user.findAll(page);
    await this.ctx.render('backend/users', res);
  }
  async error() {
    this.ctx.throw(404, '错误页面测试');
    return this.ctx.render('backend/orders');
  }
  async modify() {
    await this.ctx.render('backend/modify', {
      info: this.ctx.app.config.info,
    });
  }
  async chart() {
    await this.ctx.render('backend/chart');
  }
  async general() {
    await this.ctx.render('backend/general');
  }
  async buttons() {
    await this.ctx.render('backend/buttons');
  }
  async modals() {
    await this.ctx.render('backend/modals');
  }
  async generalForm() {
    await this.ctx.render('backend/generalForm');
  }
  async advanced() {
    await this.ctx.render('backend/advanced');
  }
  async editors() {
    await this.ctx.render('backend/editors');
  }

  // 修改密码
  async modifyAction() {
    const { ctx, service } = this;
    const params = ctx.request.body;
    if (params.nickname === undefined || params.nickname.length > 10) {
      ctx.throw(ctx.helper.errCode.ParamErr, '用户昵称有误');
    }
    if (params.oldpass === undefined || params.oldpass.length > 10) {
      ctx.throw(ctx.helper.errCode.ParamErr, '原密码有误');
    }
    if (params.password === undefined || params.password.length > 10) {
      ctx.throw(ctx.helper.errCode.ParamErr, '新密码有误');
    }
    await service.user.resetPsw(params);
    // 退出登录
    await service.user.logout({ id: this.ctx.session.userInfo.id });
    this.ctx.session = null;
    ctx.helper.success({ ctx });
  }
}
module.exports = HomeController;
