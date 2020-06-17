'use strict';

const { Controller } = require('egg');

class IndexController extends Controller {
  async index() {
    const password = await this.ctx.genHash('123456');
    console.log(password);
    await this.ctx.render('front/index', {
      info: this.ctx.app.config.info,
    });
  }
  async error() {
    await this.ctx.render('error/error');
  }
}
module.exports = IndexController;
