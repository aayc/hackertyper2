const { updateRepoStats } = require("./db.js")

exports.handler = async function (event, context, callback) {
  let params = event.queryStringParameters
  let repo = params.repository || "aayc/hackertyper2"
  let fname = params.file || "gatsby-config.js"
  let stats = JSON.parse(event.body)
  console.log(repo, fname, stats)
  await updateRepoStats(repo, fname, stats)

  callback(null, {
    statusCode: 200,
    body: ""
  })
}
