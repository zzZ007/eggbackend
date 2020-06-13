'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    const info = app.config.info;
    const ctx = app.createAnonymousContext();
    let text = `
     ██████    ██████    ██████          ██████    ██████
    ██    ██  ██    ██  ██    ██        ██    ██  ██    ██
    ██        ██    ██    ██            ██        ██
    ██  ████  ██    ██      ██          ██        ██       
    ██    ██  ██    ██  ██    ██  █ ██  ██    ██  ██    ██
     ██████    ██████    ██████   ██ █   ██████    ██████
    `;
    await console.log(` ${text} Power By Gos.cc 半夏科技 版本号:${info.version}`);
  });
};
