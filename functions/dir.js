const { getGithubRepoTree } = require('./github.js')

exports.handler = async function(event, context, callback) {
  let params = event.queryStringParameters
  let tree = await getGithubRepoTree("aayc/hackertyper2")

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(tree)
  })
}
