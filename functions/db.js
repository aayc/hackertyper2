const { getGithubFileInfo, getGithubRepoTree } = require("./github.js")
const { MongoClient } = require("mongodb")
require("dotenv").config()
const uri = process.env.MONGOLAB_URI
var connected = false;
const client = MongoClient(uri)

async function addRepo(repo, fname) {
  dbo = await getClient()
  let fileInfo = await getGithubFileInfo(repo, fname, false)
  fileInfo["n_hacked_on"] = 0
  fileInfo["n_lines_written"] = 0
  await dbo.db("github").collection("repos").insertOne({
    name: repo,
    files: [fileInfo],
    tree: await getGithubRepoTree(repo, false)
  });
}

async function getRepo(repo) {
  dbo = await getClient()
  return await dbo.db("github").collection("repos").findOne({
    "name": repo
  })
}

async function updateRepoStats(repo, fname, stats) {
  dbo = await getClient()

  // TODO use fname instead of just the first file
  console.log("stats: ", stats)
  await dbo.db("github").collection("repos").updateOne({
    "name": repo
  }, {
    "$max": {
      "files.0.n_hacked_on": stats.n_hacked_on || 0,
      "files.0.n_lines_written": stats.n_lines_written || 0
    }
  })
  console.log(await dbo.db("github").collection("repos").findOne({
    "name": repo
  }))
}

async function listRepos() {
  // TODO Terribly inefficient
  dbo = await getClient()
  arr = await dbo.db("github").collection("repos").find({}).toArray()
  return arr.map(repo => repo.name)
}

async function clearRepos() {
  dbo = await getClient()
  await dbo.db("github").collection("repos").drop()
}

module.exports = {
  getRepo: getRepo,
  listRepos: listRepos,
  updateRepoStats: updateRepoStats
}

async function getClient() {
  if (!connected) {
    await client.connect()
    connected = true
  }
  return client
}

//(async () => { await clearRepos() })();
//(async () => { await addRepo("azl397985856/leetcode", "daily/answers/647.palindromic-substrings.js"); })();
//(async () => { console.log(await getRepo("aayc/hackertyper2")); })();
/*
(async () => { console.log(await updateRepoStats("aayc/hackertyper2", "gatsby-config.js", {
  n_hacked_on: 1,
  n_lines_written: 10
})); })();*/
