'use strict';

const { Service } = require('egg');

class UserService extends Service {
  async login(params) {
    const res = await this.ctx.model.User.findOne({
      where: {
        username: params.username,
      },
    });
    if (res === null || res === undefined) {
      this.ctx.throw(this.ctx.helper.errCode.NotFound, '用户不存在');
    }
    const validatePass = await this.ctx.compare(params.password, res.password);
    if (!validatePass) {
      this.ctx.throw(this.ctx.helper.errCode.ParamErr, '账号或密码错误');
    }
    return res;
  }
  async logout(params) {
    return await this.ctx.model.User.update({
      updated_at: new Date(),
    }, {
      where: { id: params.id },
    });
  }
  async update(params) {
    return await this.ctx.model.User.update({
      ip: params.ip,
    }, {
      where: { id: params.id },
    });
  }

  async create(params) {
    params.password = await this.ctx.genHash(params.password);
    return this.ctx.model.User.create(params);
  }

  async resetPsw(payload) {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(ctx.session.userInfo.id);
    if (!user) {
      ctx.throw(ctx.helper.errCode.NotFound, '用户不存在');
    }
    const verifyPsw = await ctx.compare(payload.oldpass, user.password);
    if (!verifyPsw) {
      ctx.throw(ctx.helper.errCode.NotFound, '账号或密码错误');
    } else {
      // 重置密码
      const data = { nickname: payload.nickname };
      data.password = await ctx.genHash(payload.password);
      return ctx.model.User.update(
        data, {
          where: { id: ctx.session.userInfo.id },
        }
      );
    }
  }
}

module.exports = UserService;
