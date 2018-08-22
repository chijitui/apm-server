const Project = require('../model/schema/project');
const acquisitor = require('../utils/acquisitor');
const uglifyjs = require("uglify-js");

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

const getCode = function(_id) {
  const codeBeforeBuild = acquisitor(_id);
  const codeAfterBuild = uglifyjs.minify(codeBeforeBuild);
  return codeAfterBuild.code;
}

module.exports = {
  create,
  getCode
};