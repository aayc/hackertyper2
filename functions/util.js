const request = require('request')

module.exports = {
  doRequest: (url) => {
    var options = {
      url: url,
      headers: {
        'User-Agent': 'request'
      }
    };

    return new Promise(function (resolve, reject) {
      request(options, (error, res, body) => {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
}
