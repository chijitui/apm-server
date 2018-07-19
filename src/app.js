const Koa = require('./core');
const cors = require('koa-cors');
const koaBody = require('koa-bodyparser');
const logger = require('koa-logger');

const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(logger());
app.setRouters();

process.on('uncaughtException', (err) => {
  console.log('Caught exception: ' + err);
});

app.listen(5000);