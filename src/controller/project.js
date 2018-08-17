const acquisitor = require('../utils/acquisitor');
const uglifyjs = require("uglify-js");

const add = async function (ctx, service) {
  const project = await service.porject.create(ctx.request.body);
  const codeBeforeBuild = acquisitor(project._id);
  const code = uglifyjs.minify(codeBeforeBuild);
  ctx.body = {
    project,
    code
  };
}

module.exports = {
  add
};