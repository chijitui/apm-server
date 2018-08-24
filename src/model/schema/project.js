const mongoose = require('../db');

const projectSchema = mongoose.Schema({
  name: String,
  description: String,
  domain: String,
  version: { type: String, default: '0.1.0' },
  create_date: { type: Date, default: Date.now },
  permission: {
    owner: Array,
    editor: Array,
    observer: Array
  },
  last_editor: String
});

let project;
try {
  project = mongoose.model('project');
} catch (e) {
  project = mongoose.model('project', projectSchema);
}

module.exports = project;