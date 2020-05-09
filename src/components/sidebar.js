import React, { useState, useEffect } from "react"
import { getFileContents, getRepositoryFiles } from "../server/index.js"


const Sidebar = () => {
  const [fileTree, setFileTree] = useState([])

  useEffect(() => {
    fetch("/.netlify/functions/dir?repository=aayc/hackertyper2")
      .then(response => response.json())
      .then(body => {
        body.sort((a,b) => {
          if (a.children.length > 0 && b.children.length == 0) {
            return a < b
          } else if (b.children.length > 0 && a.children.length == 0) {
            return b < a
          } else {
            return a.name.toLowerCase() > b.name.toLowerCase()
          }
        })
        setFileTree(body)
      })
  }, [])

  const reifyFileNode = (node) => {
    if (node.children.length === 0) {
      return <p>{node.name}</p>
    }
    else {
      return <p>{"> " + node.name}</p>
    }
  }

  return (
    // TODO why does this stretch
    <div class="vscode-bg w-56 text-sidebar">
      <div class="ml-4">
        <div class="flex flex-col h-10 justify-center">
          <p>EXPLORER</p>
        </div>

        {fileTree.map(node => reifyFileNode(node))}
      </div>
    </div>
  )
}

export default Sidebar
