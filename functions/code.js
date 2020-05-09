const { getGithubFileInfo } = require("./github.js");

exports.handler = async function(event, context, callback) {
  let fileInfo = await getGithubFileInfo("aayc/hackertyper2", "gatsby-config.js")
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(fileInfo)
  })
}
