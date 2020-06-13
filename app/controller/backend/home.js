'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    await this.ctx.render('backend/home', {
      info: this.ctx.app.config.info,
    });
  }
  async orders() {
    await this.ctx.render('backend/orders', {
      info: this.ctx.app.config.info,
    });
  }
}
module.exports = HomeController;
