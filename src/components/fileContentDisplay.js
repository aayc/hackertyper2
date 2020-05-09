import React, { useEffect, useState } from "react"
import * as server from "../server"
import { editor as monaco } from "monaco-editor"

const FileContentDisplay = () => {
  const [editor, setEditor] = useState(null)
  const [fileContent, setFileContent] = useState("")
  const [srcIndex, setSrcIndex] = useState(0)

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
      .then(code => setFileContent(code))
  }, [])

  useEffect(() => {
    if (editor) {
      editor.onKeyDown(e => {
        e.preventDefault()
        setSrcIndex(prevIdx => prevIdx + 3)
      })
    }
  }, [editor])

  useEffect(() => {
    if (editor) {
      editor.setValue(fileContent.substring(0, srcIndex))
    }
  }, [srcIndex])

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-12 bg-gray-800 text-white">
        {/* {files.map((file, index) => (
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
        ))} */}
      </div>
      <div id="editor" className="w-full h-full bg-gray-800"></div>
    </div>
  )
}

export default FileContentDisplay
