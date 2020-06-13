'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    try {
      ctx.app.config.product.productUrl = ctx.origin;
      await ctx.render('backend/home');
    } catch (e) {
      throw new Error(e);
    }
  }
  async orders() {
    const { ctx, service } = this;
    try {
      ctx.app.config.product.productUrl = ctx.origin;
      await ctx.render('backend/orders');
    } catch (e) {
      throw new Error(e);
    }
  }
}
module.exports = HomeController;
