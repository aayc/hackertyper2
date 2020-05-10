import React, { useEffect, useState } from "react"
import * as server from "../server"
import { editor as monaco } from "monaco-editor"
import Footer from "./footer"
import cx from "classnames"

const FileContentDisplay = () => {
  const [editor, setEditor] = useState(null)
  const [fileContent, setFileContent] = useState("")
  const [srcIndex, setSrcIndex] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({
    column: 1,
    lineNumber: 1,
  })
  const [stats, setStats] = useState({ n_hacked_on: 0, n_lines_written: 0 })
  const [repository, setRepository] = useState("torvalds/linux")
  const [hackFile, setHackFile] = useState("cpu.c")
  const [fileIdx, setFileIdx] = useState(0)

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
      .getFileContents(repository, hackFile)
      .then(({ src, n_hacked_on, n_lines_written }) => {
        setFileContent(src)
        setStats({
          n_hacked_on,
          n_lines_written,
        })
      })
  }, [repository, hackFile])

  useEffect(() => {
    if (editor) {
      editor.onKeyDown(e => {
        e.preventDefault()
        setSrcIndex(prevIdx => prevIdx + 3)
      })

      editor.onDidChangeCursorPosition(({ position }) => {
        setCursorPosition(position)
      })
    }
  }, [editor])

  useEffect(() => {
    if (editor) {
      editor.setValue(fileContent.substring(0, srcIndex))
    }
  }, [editor, fileContent, srcIndex])

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex w-full h-12 vscode-bg text-white text-sidebar">
        {[hackFile].map((file, index) =>
          <button
            className={cx(
              index === fileIdx ? "vscode-bg-dark" : "",
              "flex px-4 justify-center items-center vscode-bg cursor-pointer"
            )}
            key={file}
            onClick={() => setFileIdx(index)}
          >
            {file}
          </button>
        )}
      </div>
      <div id="editor" className="w-full h-full bg-gray-800"></div>
      <Footer position={cursorPosition} stats={stats} repository={repository} />
    </div>
  )
}

export default FileContentDisplay
