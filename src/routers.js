function getRoutes(app) {
  const { performance } = app.controller;
  return {
    'get /api/performance/window': performance.window.get,
    'post /api/performance/window': performance.window.post,
  };
}

module.exports = getRoutes;