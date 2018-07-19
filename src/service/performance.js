const path = require('path');
const fs = require('fs');
const time = require('../utils/time');

const window = {
  writeFiles(perform, date) {
    return new Promise((resolve, reject) => {
      const dir = path.join(process.cwd(), 'performance_log', time.minite(date))
      const name = `${date}-${Math.random().toFixed(4)}`

      fs.writeFile(path.join(dir, name), perform, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            fs.mkdirSync(dir)
            fs.writeFileSync(path.join(dir, name), perform)
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
  }
};

module.exports = {
  window,
};