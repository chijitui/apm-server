const mongoose = require('../db');

const projectSchema = mongoose.Schema({
  name: String,
  description: String
});

let project;
try {
  project = mongoose.model('project');
} catch (e) {
  project = mongoose.model('project', projectSchema);
}

module.exports = project;