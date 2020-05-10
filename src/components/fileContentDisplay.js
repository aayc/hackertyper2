import React, { useEffect, useState } from "react"
import * as server from "../server"
import { editor as monaco } from "monaco-editor"
import Footer from "./footer"
import cx from "classnames"

const inputBoxStyle = {
  width: "600px",
}

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
  const [availableRespositories, setAvailableRepositories] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [repoSearch, setRepoSearch] = useState("")
  const [filteredRepos, setFilteredRepos] = useState([])
  var time = Date.now()
  var velocity = 1

  useEffect(() => {
    setFilteredRepos(
      availableRespositories.filter(repoName => repoName.includes(repoSearch))
    )
  }, [repoSearch, availableRespositories])
  useEffect(() => {
    server.getAvailableRepositories().then(repos => {
      setAvailableRepositories(repos)
    })
  }, [])

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
        setSrcIndex(prevIdx => prevIdx + velocity)
        var timediff = Date.now() - time
        if (timediff < 100) {
          velocity += 1
        } else if (timediff < 500) {
          velocity -= 1
        } else if (timediff < 1000) {
          velocity -= 2
        } else if (timediff < 1500) {
          velocity -= 3
        } else if (timediff < 2000) {
          velocity -= 4
        } else if (timediff < 3500) {
          velocity -= 5
        }
        velocity = Math.max(Math.min(velocity, 50), 1)

        time = Date.now()
      })

      editor.onDidChangeCursorPosition(({ position }) => {
        setCursorPosition(position)
      })
    }
  }, [editor])

  useEffect(() => {
    if (editor) {
      editor.setValue(fileContent.substring(0, srcIndex))
      editor.setPosition({ lineNumber: 10000, column: 4000 })
    }
  }, [editor, fileContent, srcIndex])

  return (
    <div className="w-full h-full">
      {showSearch && (
        <div
          className="fixed inset-0 z-10 bg-transparent flex justify-center"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="relative z-20 bg-gray-900 p-4 flex flex-col"
            style={inputBoxStyle}
          >
            <input
              className="w-full bg-gray-800 border border-white text-white h-12 px-2"
              placeholder="Search repositories"
              autoComplete={false}
              autoFocus={true}
              value={repoSearch}
              onChange={e => setRepoSearch(e.target.value)}
            />
            {filteredRepos.map(repoName => (
              <button
                className="flex justify-start text-white py-3 px-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => setRepository(repoName)}
              >
                {repoName}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex h-12 vscode-bg text-white text-sidebar">
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
      <Footer
        position={cursorPosition}
        stats={stats}
        repository={repository}
        onClickRepo={() => setShowSearch(true)}
      />
    </div>
  )
}

export default FileContentDisplay
