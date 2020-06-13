'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    const product = app.config.product;
    const ctx = app.createAnonymousContext();
    let text = `
     ██████    ██████    ██████          ██████    ██████
    ██    ██  ██    ██  ██    ██        ██    ██  ██    ██
    ██        ██    ██    ██            ██        ██
    ██  ████  ██    ██      ██          ██        ██       
    ██    ██  ██    ██  ██    ██  █ ██  ██    ██  ██    ██
     ██████    ██████    ██████   ██ █   ██████    ██████
    `;
    await console.log(` ${text} Power By Gos.cc 半夏科技 版本号:${product.version}`);
  });
};
