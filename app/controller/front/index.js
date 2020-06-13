'use strict';

const { Controller } = require('egg');

class IndexController extends Controller {
  async index() {
    const { ctx, service } = this;
    try {
      ctx.app.config.product.productUrl = ctx.origin;
      await ctx.render('front/index');
    } catch (e) {
      throw new Error(e);
    }
  }
}
module.exports = IndexController;
