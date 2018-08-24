const create = async function(ctx, service) {
  const {
    name,
    description,
    domain,
    version,
    permission,
    last_editor
  } = ctx.request.body;
  const project = await service.project.create({
    name,
    description,
    domain,
    version,
    permission,
    last_editor
  });
  ctx.body = project;
}

const find = async function(ctx, service) {
  const {
    _id
  } = ctx.request.query;
  const params = _id ? { _id } : {}
  const project = await service.project.find(params);
  ctx.body = project;
}

const getCode = function(ctx, service) {
  const { 
    _id 
  } = ctx.request.query;
  const code = service.project.getCode(_id);
  ctx.body = code;
}

module.exports = {
  create,
  find,
  getCode
};
