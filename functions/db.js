const { getGithubFileInfo, getGithubRepoTree } = require('./github.js')
const {MongoClient} = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGOLAB_URI
const client = MongoClient(uri)


async function addRepo(repo, fname) {
  // repo => torvalds/linux
  // fname => kernel/audit.c
  run(async (client) => {
    let fileInfo = await getGithubFileInfo(repo, fname)
    fileInfo["n_hacked_on"] = 0
    fileInfo["n_lines_written"] = 0
    await client.db("github").collection("repos").insertOne({
      name: repo,
      files: [fileInfo],
      tree: await getGithubRepoTree(repo)
    });
  });
}

async function getRepo(repo) {
  return await run(async (client) => {
    let result =  await client.db("github").collection("repos").findOne({
      "name": repo
    })
    return result;
  })
}

async function updateRepoStats(repo, fname, stats) {
  // TODO use fname
  run(async (client) => {
    await client.db("github").collection("repos").updateOne({
      "name": repo
    }, {
      "$set": {
        "files.0.n_hacked_on": stats.n_hacked_on || 0,
        "files.0.n_lines_written": stats.n_lines_written || 0
      }
    })
  })
}

async function clearRepos() {
    run(async (client) => {
        await client.db("github").collection("repos").drop()
    })
}

async function run(fn) {
    var result;
    try {
        await client.connect()
        result = await fn(client)
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return result
}


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//(async () => { await clearRepos() })();
//(async () => { await addRepo("aayc/hackertyper2", "gatsby-config.js"); })();
//(async () => { console.log(await getRepo("aayc/hackertyper2")); })();
(async () => { console.log(await updateRepoStats("aayc/hackertyper2", "gatsby-config.js", {
  n_hacked_on: 1,
  n_lines_written: 10
})); })();
