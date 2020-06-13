'use strict';

const { Service } = require('egg');
const md5 = require('md5');
const dayjs = require('dayjs');

class UserService extends Service {
  async login(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.User.findOne({
        where: {
          username: params.username,
        },
      });
      if (res === null || res === undefined) {
        ctx.throw('用户不存在');
      }
      if (res.password !== md5(params.password)) {
        ctx.throw( '账号或密码错误');
      }
      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async logout(params) {
    const { ctx } = this;
    try {
      const response = await ctx.model.User.update({
        updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        where: { id: params.id },
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
  async update(params) {
    const { ctx } = this;
    try {
      const response = await ctx.model.User.update({
        ip: params.ip,
      }, {
        where: { id: params.id },
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = UserService;
