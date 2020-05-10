import React, { useState, useEffect } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faKey, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { faJs } from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => {
  const [fileTree, setFileTree] = useState([])

  useEffect(() => {
    fetch("/.netlify/functions/dir?repository=torvalds/linux")
      .then(response => response.json())
      .then(body => {
        body.sort((a, b) => {
          if (a.children.length > 0 && b.children.length === 0) {
            return a < b
          } else if (b.children.length > 0 && a.children.length === 0) {
            return b < a
          } else {
            return a.name.toLowerCase() > b.name.toLowerCase()
          }
        })
        setFileTree(body)
      })
  }, [])

  const chooseIcon = (filename) => {
    if (filename.endsWith(".js")) {
      return faJs
    } else if (filename === "LICENSE") {
      return faKey
    } else if (filename.endsWith(".gitignore")) {
      return faCodeBranch
    } else {
      return faFile
    }
  }

  const reifyFileNode = node => {
    if (node.children.length === 0) {

      return (<div class="flex">
                <span><FontAwesomeIcon icon={chooseIcon(node.name)} />&nbsp;&nbsp;</span>
                <p key={node.name}>{node.name}</p>
              </div>)
    } else {
      return <p key={node.name}>{"> " + node.name}</p>
    }
  }

  return (
    // TODO why does this stretch
    <div className="vscode-bg w-56 text-sidebar">
      <div className="ml-4">
        <div className="flex flex-col h-10 justify-center">
          <p>EXPLORER</p>
        </div>

        {fileTree.map(node => reifyFileNode(node))}
      </div>
    </div>
  )
}

export default Sidebar
