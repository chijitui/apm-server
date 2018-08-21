const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const koaRoute = require('koa-router');

class CoreLoader {
  loader(path) {
    const dir = fs.readdirSync(path);
    return dir.map((filename) => {
      const module = require(path + '/' + filename);
      return { 
        name: filename.split('.')[0],
        module 
      };
    });
  }

  loadController() {
    const url = path.join(__dirname, 'controller');
    return this.loader(url);
  }

  loadService() {
    const url = path.join(__dirname, 'service');
    return this.loader(url);
  }

  loadConfig() {
    const url = path.join(__dirname, 'config');
    return this.loader(url);
  }
}

class Core extends Koa {
  constructor(props) {
    super(props);
    this.router = new koaRoute();
    this.loader = new CoreLoader();

    const controllers = this.loader.loadController();
    this.controller = {};
    controllers.forEach((crl) => {
      this.controller[crl.name] = crl.module;
    });

    this.config = {};
    this.loader.loadConfig().forEach((config) => {
      this.config = { ...this.config, ...config.module };
    });
  }

  setRouters() {
    const _setRouters = (app) => {
      const routers = require('./routers')(app);
      const svs = {};
      app.loader.loadService().forEach((service) => {
        svs[service.name] = service.module;
      });
      Object.keys(routers).forEach((key) => {
        const [method, path] = key.split(' ');
        app.router[method](path, async (ctx, next) => {
          try {
            const handler = routers[key];
            await handler(ctx, svs, app, next);
          } catch(error) {
            console.log(error)
            ctx.body = {
              code: 50001,
              error
            };
          }
        });
      });
      return app.router.routes();
    }
    this.use(_setRouters(this));
  }
}

module.exports = Core;