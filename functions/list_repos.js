const { listRepos } = require("./db.js")

exports.handler = async function (event, context, callback) {
  let repos = await listRepos()
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(repos),
  })
}
