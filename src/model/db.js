const mongoose = require('mongoose');
const { mongoAddress } = require('../config/mongodb');

mongoose.connect(mongoAddress);

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function () {
  console.log('数据库连接出错！');
});
db.on('open', function () {
  console.log('数据库连接成功！');
});

module.exports = mongoose;