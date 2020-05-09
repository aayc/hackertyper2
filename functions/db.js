const { getGithubFileInfo, getGithubRepoTree } = require('./github.js')
const {MongoClient} = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGOLAB_URI
const client = MongoClient(uri)


async function addRepo(repo, fname) {
  // repo => torvalds/linux
  // fname => kernel/audit.c
  console.log("adding repo")
  run(async (client) => {
    await client.db("github").collection("repos").insertOne({
      name: repo,
      files: [await getGithubFileInfo(repo, fname)],
      tree: await getGithubRepoTree(repo)
    });
  });
}

async function getRepo(repo) {
  run(async (client) => {
    await client.db
  })
}

async function clearRepos() {
  run(async (client) => {
    await client.db("github").collection("repos").drop()
  })
}

async function run(fn) {
    try {
        await client.connect()
        await fn(client)
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
};

(async () => { await addRepo("aayc/hackertyper2", "gatsby-config.js"); })();

/*
 * addRepo
 * getRandomRepo
 * getRepo
 * updateRepoStats
 * deleteRepo
 */
