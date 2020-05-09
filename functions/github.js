const { doRequest } = require("./util.js");
const { getRepo } = require("./db.js");

function convertToHierarchy(paths) {
  const rootNode = {name:"root", children:[]}
  for (let path of paths) {
    buildNodeRecursive(rootNode, path.split('/'), 0);
  }
  const tree = rootNode.children;
  return tree
}

function buildNodeRecursive(node, path, idx) {
  if (idx < path.length) {
    let item = path[idx]
    let dir = node.children.find(child => child.name == item)
    if (!dir) {
      node.children.push(dir = {name: item, children:[]})
    }
    buildNodeRecursive(dir, path, idx + 1);
  }
}

module.exports = {
  getGithubFileInfo: async (repo, fname, use_db) => {
    if (use_db) {
      // TODO don't use just the first file
      info = await getRepo(repo)
      return info.files[0]
    }
    else {
      let response = await doRequest("https://api.github.com/repos/" + repo + "/contents/" + fname)
      let body = JSON.parse(response)
      let code = Buffer.from(body.content, 'base64').toString('ascii');
      return {
        name: fname,
        src: code,
      }
    }
  },
  getGithubRepoTree: async (repo, use_db) => {
    if (use_db) {
      repo = await getRepo(repo)
      return repo.tree
    }
    else {
      // TODO update the sha automatically
      let sha = "af96062bc88d567240e54f8a0be79d8853de6c3f"
      let response = await doRequest(" https://api.github.com/repos/" + repo + "/git/trees/" + sha + "?recursive=true")
      let body = JSON.parse(response)
      return convertToHierarchy(body.tree.map(entry => entry.path))
    }
  }
}
