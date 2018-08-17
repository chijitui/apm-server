const Project = require('../model/schema/project');

const create = function(projectInfo) {
  return new Promise((resolve, reject) => {
    const {
      name,
      description
    } = projectInfo;
    const project = new Project({
      name,
      description
    });

    project.save((err, item) => {
      if(err) {
        reject(err);
      }
      resolve(item);
    })
  });
}

module.exports = {
  create
};