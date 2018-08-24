const login = async function(ctx, service) {
  const { name } = ctx.params;
  const { passwd, token } = ctx.request.body;
  const user = await service.user.login({
    name,
    passwd,
    token
  });
  ctx.body = user;
};

module.exports = {
  login
};