const Project = require('../model/schema/project');
const acquisitor = require('../utils/acquisitor');
const uglifyjs = require("uglify-js");

const create = function(projectInfo) {
  return new Promise((resolve, reject) => {
    const project = new Project(projectInfo);
    project.save((err, item) => {
      if(err) {
        reject(err);
      }
      resolve(item);
    })
  });
};

const find = function(params) {
  return new Promise((resolve, reject) => {
    Project.find(params, (err, data) => {
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

const getCode = function(_id) {
  const codeBeforeBuild = acquisitor(_id);
  const codeAfterBuild = uglifyjs.minify(codeBeforeBuild);
  return codeAfterBuild.code;
};

module.exports = {
  create,
  find,
  getCode
};