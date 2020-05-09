import React, { useEffect, useState } from "react"
import { editor as monaco } from "monaco-editor"
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

const files = [
  {
    name: "index.js",
    content,
    filledIndex: 0,
  },
  {
    name: "file1.js",
    content: "const a = 123;",
    filledIndex: 0,
  },
]

const FileContentDisplay = () => {
  const [fileIdx, setFileIdx] = useState(0)
  const [editor, setEditor] = useState(null)

  useEffect(() => {
    console.log("using effect")
    setEditor(
      monaco.create(document.getElementById("editor"), {
        value: "",
        theme: "vs-dark",
        language: "javascript",
        automaticLayout: true,
      })
    )
  }, [])

  useEffect(() => {
    if (editor) {
      editor.onKeyDown(e => {
        e.preventDefault()
        files[fileIdx].filledIndex += 2
        const file = files[fileIdx]
        editor.setValue(file.content.substring(0, file.filledIndex + 1))
      })
    }
  }, [editor, fileIdx])

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-12 bg-gray-800 text-white">
        {files.map((file, index) => (
          <button
            className={cx(
              index === fileIdx ? "bg-black" : "",
              "flex px-4 justify-center items-center border-r border-gray-900 cursor-pointer"
            )}
            key={file.name}
            onClick={() => setFileIdx(index)}
          >
            {file.name}
          </button>
        ))}
      </div>
      <div id="editor" className="w-full h-full bg-gray-800"></div>
    </div>
  )
}

export default FileContentDisplay
