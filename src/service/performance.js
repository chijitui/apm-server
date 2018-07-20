const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const time = require('../utils/time');
const WindowPerformance = require('../model/schema/windowPerformance');

const window = {
  /*
   * Method: writeFiles
   * Element: perform 初始性能数据 <Object>
   *          date 测试日期 <Number>
   * Description: 初始性能数据写入日志，并且调用 consumeLogs 一次入库，减少数据库压力
  **/
  writeFiles(perform, date) {
    return new Promise((resolve, reject) => {
      const dir = path.join(process.cwd(), 'performance_log', time.minite(date));
      const name = `${date}-${Math.random().toFixed(4)}.log`;

      fs.writeFile(path.join(dir, name), perform, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            fs.readdir(path.join(process.cwd(), 'performance_log'), (err, dirs) => {
              if (err) {
                throw Error(err);
              }
              setTimeout(() => {
                this.consumeLogs(dirs);
              }, 3000);
              fs.mkdirSync(dir);
              fs.writeFileSync(path.join(dir, name), perform);
            });
          } else {
            reject(err);
          }
        }
        resolve({
          code: 20000,
          message: 'success!'
        });
      });
    });
  },

  /*
   * Method: consumeLogs
   * Element: dirs 入库文件夹列表 <Array>
   * Description: 文件夹内日志一次入库，并且入库成功之后删除对应日志
  **/
  consumeLogs(dirs) {
    dirs.map(dir => {
      const dirPath = path.join(process.cwd(), 'performance_log', dir)
      fs.readdir(dirPath, (err, files) => {
        if (err) {
          throw Error(err);
        }
        const data = files.map(file => {
          return JSON.parse(fs.readFileSync(path.join(dirPath, file)));
        });
        const windowPerformance = new WindowPerformance({
          dateline: dir,
          data
        })
        windowPerformance.save(err => {
          if(err) {
            throw Error(err);
          }
          console.log('成功存入数据库！');
          shell.rm('-rf', dirPath);
        })
      });
    });
  },
};

module.exports = {
  window,
};