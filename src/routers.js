function getRoutes(app) {
  const { project, user } = app.controller;
  return {
    'post /api/project/create': project.create,
    'get /api/project/find': project.find,
    'get /api/project/code': project.getCode,

    'post /api/user/:name': user.login,
  };
}

module.exports = getRoutes;