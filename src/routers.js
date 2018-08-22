function getRoutes(app) {
  const { project } = app.controller;
  return {
    'post /api/project/add': project.add,
    'get /api/project/code': project.getCode,
  };
}

module.exports = getRoutes;