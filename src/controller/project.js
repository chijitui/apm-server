const add = async function(ctx, service) {
  const project = await service.project.create(ctx.request.body);
  const code = service.project.getCode(project._id);
  ctx.body = {
    project,
    code
  };
}

const getCode = function(ctx, service) {
  const { _id } = ctx.request.query;
  const code = service.project.getCode(_id);
  ctx.body = code;
}

module.exports = {
  add,
  getCode
};
