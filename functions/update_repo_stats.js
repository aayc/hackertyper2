const { updateRepoStats } = require("./db.js")

exports.handler = async function (event, context, callback) {
  let params = event.queryStringParameters
  let repo = params.repository || "aayc/hackertyper2"
  let fname = params.file || "gatsby-config.js"
  let stats = params.stats
  await updateRepoStats(repo, fname, stats)

  callback(null, {
    statusCode: 200,
  })
}
