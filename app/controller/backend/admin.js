'use strict';

const { Controller } = require('egg');
const md5 = require('md5');
const internalIp = require('internal-ip');
const svgCaptcha = require('svg-captcha');

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.UserLoginTransfer = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
    };
  }
  // 登录
  async login() {
    const { ctx } = this;
    await ctx.render('backend/login');
  }
  async logout() {
    const { ctx, service } = this;
    await service.user.logout({ id: ctx.session.userInfo.id });
    ctx.session = null;
    await ctx.redirect('/');
  }
  async loginAction() {
    const { ctx, service } = this;
    const params = ctx.request.body;
    const cap = ctx.cookies.get('captcha');
    // 校验参数
    try {
      if (ctx.helper._encrypt.decrypt(cap) !== params.validateCode) {
        ctx.throw('验证码错误');
      }
      ctx.validate(this.UserLoginTransfer);
      const res = await service.user.login(params);
      if (!res) {
        ctx.throw('账号异常');
      }
      if (res.status === 1) {
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
        await ctx.redirect('/admin/index');
      } else {
        ctx.throw('账号异常');
      }
    } catch (e) {
      const msg = e.message === null ? '登录失败' : e.message;
      return ctx.render('backend/login', {
        success: false,
        msg,
      });
    }
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
    const encrypted = ctx.helper._encrypt.encrypt(captcha.text);
    ctx.cookies.set('captcha', encrypted, { maxAge: 1800 * 1000, httpOnly: true });
    ctx.body = captcha.data;
  }
}

module.exports = UserController;
