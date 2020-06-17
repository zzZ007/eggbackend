'use strict';

const { Controller } = require('egg');
const internalIp = require('internal-ip');
const svgCaptcha = require('svg-captcha');

class LoginController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.UserLoginTransfer = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
    };
  }
  // 登录
  async login() {
    const { ctx, service } = this;
    if (ctx.request.method === 'GET') {
      const userInfo = ctx.session.userInfo;
      if (userInfo) {
        return ctx.redirect('/admin/index');
      }
      return ctx.render('backend/login');
    }
    // 开始登录
    const params = ctx.request.body;
    const cap = ctx.cookies.get('captcha');
    if (ctx.helper.encrypt.decrypt(cap) !== params.validateCode) {
      return ctx.render('backend/login', {
        msg: '验证码有误',
      });
    }
    // 参数验证、登录验证
    let res;
    try {
      ctx.validate(this.UserLoginTransfer);
      res = await service.user.login(params);
    } catch (e) {
      const msg = e.message === null ? '登录失败' : e.message;
      return ctx.render('backend/login', {
        msg,
      });
    }
    if (res.status !== 1) {
      return ctx.render('backend/login', {
        msg: '状态异常,请联系管理员',
      });
    }
    // 更新用户登录信息
    await internalIp.v4().then(async ip => {
      await service.user.update({ id: res.id, ip });
    });
    ctx.session.userInfo = {
      id: res.id,
      avatar: res.avatar,
      username: res.username,
      nickname: res.nickname,
      roleId: res.roleId,
    };
    return ctx.redirect('/admin/index');
  }

  // 退出登录
  async logout() {
    await this.service.user.logout({ id: this.ctx.session.userInfo.id });
    this.ctx.session = null;
    await this.ctx.redirect('/');
  }

  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.createMathExpr({
      width: 96,
      height: 44,
      noise: 3,
      background: '#f0f1f5',
      color: true,
    });
    const encrypted = ctx.helper.encrypt.encrypt(captcha.text);
    ctx.cookies.set('captcha', encrypted, { maxAge: 1800 * 1000, httpOnly: true });
    ctx.body = captcha.data;
  }
}

module.exports = LoginController;
