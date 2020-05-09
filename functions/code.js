const { doRequest } = require("./util.js");
const {MongoClient} = require('mongodb');
//const client = MongoClient(uri)

exports.handler = async function(event, context, callback) {
  let response = await doRequest("https://api.github.com/repos/aayc/hackertyper2/contents/gatsby-config.js")
  let body = JSON.parse(response)
  let code = Buffer.from(body.content, 'base64').toString('ascii');
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      code: code
    })
  })
}

/*async function tryDatabase() {
    try {
        await client.connect()
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};*/
