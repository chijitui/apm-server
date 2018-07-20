const window = {
  async post(ctx, service, app, next) {
    const perform = ctx.request.body;
    perform.base.ip = ctx.request.ip.match(/\d+.\d+.\d+.\d+/)[0];    
    ctx.body = await service.performance.window.writeFiles(JSON.stringify(perform), perform.date);
  }
};

module.exports = {
  window,
};