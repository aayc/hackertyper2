const { getGithubFileInfo } = require("./github.js")

exports.handler = async function (event, context, callback) {
  let params = event.queryStringParameters
  let fileInfo = await getGithubFileInfo(
    "aayc/hackertyper2",
    "gatsby-config.js"
  )
  // let fileInfo = await getGithubFileInfo(params.repository, params.file)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(fileInfo),
  })
}
