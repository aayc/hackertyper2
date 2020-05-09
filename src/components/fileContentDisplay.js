import React, { useEffect, useState } from "react"
import * as server from "../server"
import { editor as monaco } from "monaco-editor"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import cx from "classnames"

const content = `import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Footer from "../components/footer"
import Sidebar from "../components/sidebar"
import FileContentDisplay from "../components/fileContentDisplay"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Sidebar />
      <FileContentDisplay />
      <Footer />
    </Layout>
  )
}

export default IndexPage`

// const files = [
//   {
//     name: "index.js",
//     content,
//     filledIndex: 0,
//   },
//   {
//     name: "file1.js",
//     content: "const a = 123;",
//     filledIndex: 0,
//   },
// ]

const FileContentDisplay = () => {
  const [fileIdx, setFileIdx] = useState(0)
  const [editor, setEditor] = useState(null)
  const [files, setFiles] = useState([])

  useEffect(() => {
    setEditor(
      monaco.create(document.getElementById("editor"), {
        value: "",
        theme: "vs-dark",
        language: "javascript",
        automaticLayout: true,
      })
    )

    server
      .getFileContents("aayc/hackertyper2", "gatsby-config.js")
      .then(code => console.log(code))
  }, [])

  useEffect(() => {
    if (editor) {
      editor.onKeyDown(e => {
        e.preventDefault()
        // files[fileIdx].filledIndex += 2
        // const file = files[fileIdx]
        // editor.setValue(file.content.substring(0, file.filledIndex + 1))
      })
    }
  }, [editor, fileIdx])

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-12 vscode-bg text-white">
        {files.map((file, index) => (
          <button
            className={cx(
              index === fileIdx ? "vscode-bg-dark" : "",
              "flex px-4 justify-center items-center border-r border-gray-900 cursor-pointer"
            )}
            key={file.name}
            onClick={() => setFileIdx(index)}
          >
            <span>{file.name}</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            {index === fileIdx ? <FontAwesomeIcon icon={faTimes} /> : <div></div>}
          </button>
        ))}
      </div>
      <div id="editor" className="w-full h-full bg-gray-800"></div>
    </div>
  )
}

export default FileContentDisplay
