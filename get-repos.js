// Do not run this code in production
const request = require('request')
var options = {
  url: "https://api.github.com/repos/torvalds/linux/contents/kernel/audit.c",
  headers: {
    'User-Agent': 'request'
  }
};

request(options, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info)
  }
})
