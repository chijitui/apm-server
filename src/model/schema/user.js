const mongoose = require('../db');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  info: {
    dn: { type: String, required: true },
    mail: { type: String, required: true },
    displayName: { type: String, required: true },
    description: { type: String, required: true, unique: true },
  },
  create_date: { type: Date, default: Date.now },
  description: {type: String, default: null },
  deleted: { type:Boolean, default: false}
});

let user;
try {
  user = mongoose.model('user');
} catch (e) {
  user = mongoose.model('user', userSchema);
}

module.exports = user;