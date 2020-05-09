const { doRequest } = require("./util.js");

function convertToHierarchy(paths) {
  const rootNode = {name:"root", children:[]}
  for (let path of paths) {
    buildNodeRecursive(rootNode, path.split('/'), 0);
  }
  return rootNode.children;
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
  getGithubFileInfo: async (repo, fname) => {
    let response = await doRequest("https://api.github.com/repos/" + repo + "/contents/" + fname)
    let body = JSON.parse(response)
    let code = Buffer.from(body.content, 'base64').toString('ascii');
    return {
      name: fname,
      src: code,
    }
  },
  getGithubRepoTree: async (repo) => {
    let sha = "af96062bc88d567240e54f8a0be79d8853de6c3f"
    let response = await doRequest(" https://api.github.com/repos/" + repo + "/git/trees/" + sha + "?recursive=true")
    let body = JSON.parse(response)
    return convertToHierarchy(body.tree.map(entry => entry.path))
  }
}
