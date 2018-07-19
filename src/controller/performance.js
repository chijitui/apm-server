const window = {
  async get(ctx, service, app, next) {
    //ctx.body = await service.performance()
    ctx.body = 1
  },
  async post(ctx, service, app, next) {
    const perform = ctx.request.body;
    perform.base.ip = ctx.request.ip.match(/\d+.\d+.\d+.\d+/)[0];    
    ctx.body = await service.performance.window.writeFiles(JSON.stringify(perform), perform.date);
  }
};

module.exports = {
  window,
};