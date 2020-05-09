const { getGithubFileInfo } = require("./github.js");

exports.handler = async function(event, context, callback) {
  let params = event.queryStringParameters
  let repo = params.repository || "aayc/hackertyper2"
  let fname = params.file || "gatsby-config.js"
  console.log("params: ", repo, fname)
  let fileInfo = await getGithubFileInfo(repo, fname, true)
  // let fileInfo = await getGithubFileInfo(params.repository, params.file)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(fileInfo)
  })
}
