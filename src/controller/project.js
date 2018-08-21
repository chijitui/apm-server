const acquisitor = require('../utils/acquisitor');
const uglifyjs = require("uglify-js");

const add = async function (ctx, service) {
  const project = await service.project.create(ctx.request.body);
  const codeBeforeBuild = acquisitor(project._id);
  const codeAfterBuild = uglifyjs.minify(codeBeforeBuild);
  console.log(codeAfterBuild);
  ctx.body = {
    project,
    code: codeAfterBuild.code
  };
}

module.exports = {
  add
};