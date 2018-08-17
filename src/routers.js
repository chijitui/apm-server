function getRoutes(app) {
  const { project } = app.controller;
  return {
    'post /api/project/add': project.add,
  };
}

module.exports = getRoutes;