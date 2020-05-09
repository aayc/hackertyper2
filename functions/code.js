const { getGithubFileInfo } = require("./github.js");

exports.handler = async function(event, context, callback) {
  let params = event.queryStringParameters
  console.log("Params: ", params)
  let fileInfo = await getGithubFileInfo("aayc/hackertyper2", "gatsby-config.js")
  console.log("fileInfo: ", fileInfo)
  // let fileInfo = await getGithubFileInfo(params.repository, params.file)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(fileInfo)
  })
}
