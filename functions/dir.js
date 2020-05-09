const { doRequest } = require('./util.js')

exports.handler = async function(event, context, callback) {
  let response = await doRequest(" https://api.github.com/repos/aayc/hackertyper2/git/trees/af96062bc88d567240e54f8a0be79d8853de6c3f?recursive=true")
  let body = JSON.parse(response)
  let tree = convertToHierarchy(body.tree.map(entry => entry.path))
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      tree: tree
    })
  })
}

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
