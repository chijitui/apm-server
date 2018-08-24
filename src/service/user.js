const User = require('../model/schema/user');
const Ldapauth = require('../config/ldap');
const { decrypt } = require('crypto-js/aes');
const utf8 = require('crypto-js/enc-utf8');

const login = function(params) {
  return new Promise((resolve, reject) => {
    const {
      passwd,
      token
    } = params;
    const bytes = decrypt(passwd, token);
    const plaintext = bytes.toString(utf8);
    const ldapauth = Ldapauth();
    ldapauth.fail = (info, code) => {
      resolve(Object.assign(info, {
        code
      }));
    };
    ldapauth.error = (info, code) => {
      resolve(Object.assign(info, {
        code
      }));
    };
    ldapauth.success = (userinfo) => {
      const {
        dn,
        cn: username,
        mail,
        displayName,
        description
      } = userinfo;

      const user = new User({
        name: username,
        info: {
          dn,
          mail,
          displayName,
          description,
        }
      });
      User.find({ name : username }, (err, data) => {
        if(data.length > 0){
          resolve(data[0]);
        }
        user.save((err, item) => {
          if (err) {
            reject(err);
          }
          resolve(item);
        })
      });
    };
    let {
      passwd: password,
      username
    } = JSON.parse(plaintext);
    ldapauth.authenticate({
      body: {
        username,
        password
      }
    }, (userinfo) => {
      console.log('authenticate', userinfo)
    });
  });
}

module.exports = {
  login
};
