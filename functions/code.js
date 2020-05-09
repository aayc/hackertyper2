const { getGithubFileInfo } = require("./github.js")

exports.handler = async function (event, context, callback) {
  let params = event.queryStringParameters
  let repo = params.repository || "aayc/hackertyper2"
  let fname = params.file || "gatsby-config.js"
  let fileInfo = await getGithubFileInfo(repo, fname, true)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(fileInfo),
  })
}
