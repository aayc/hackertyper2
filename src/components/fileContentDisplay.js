import React, { useEffect, useState } from "react"
import * as server from "../server"
//import { editor as monaco } from "monaco-editor"
import Footer from "./footer"
import cx from "classnames"
import PropTypes from "prop-types"

const inputBoxStyle = {
  width: "600px",
}

const propTypes = {
  onRepoChange: PropTypes.func,
}

const repoMainFiles = {
  "aayc/hackertyper2": "gatsby-config.js",
  "torvalds/linux": "cpu.c",
  "azl397985856/leetcode": "647.palindromic-substrings.js",
}
var previous_high_score = 100000;
var time = Date.now()
var velocity = 1

const FileContentDisplay = ({ onRepoChange }) => {
  const [editor, setEditor] = useState(null)
  const [fileContent, setFileContent] = useState("")
  const [srcIndex, setSrcIndex] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({
    column: 1,
    lineNumber: 1,
  })
  const [stats, setStats] = useState({ n_hacked_on: 0, n_lines_written: 0 })
  const [repository, setRepository] = useState("aayc/hackertyper2")
  const [hackFile, setHackFile] = useState("gatsby-config.js")
  const [fileIdx, setFileIdx] = useState(0)
  const [availableRespositories, setAvailableRepositories] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [repoSearch, setRepoSearch] = useState("")
  const [filteredRepos, setFilteredRepos] = useState([])

  function getLanguage(fileName) {
    if (fileName.endsWith(".c")) {
      return "c"
    } else if (fileName.endsWith(".js")) {
      return "javascript"
    } else if (fileName.endsWith(".py")) {
      return "python"
    }
  }

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
    setHackFile(repoMainFiles[repository])

    if (!editor) {
      import("monaco-editor").then(monaco => {
        setEditor(
          monaco.editor.create(document.getElementById("editor"), {
            value: "",
            theme: "vs-dark",
            language: getLanguage(hackFile),
            automaticLayout: true,
          }))
        })
    } else {
      // debugger
      editor.setValue("")
    }

    onRepoChange(repository)
    server
      .getFileContents(repository, hackFile)
      .then(({ src, n_hacked_on, n_lines_written }) => {
        setFileContent(src)
        previous_high_score = n_lines_written
        setStats({
          n_hacked_on: n_hacked_on + 1,
          n_lines_written: n_lines_written,
        })
      })
    setSrcIndex(0)
  }, [repository, hackFile])

  useEffect(() => {
    if (editor) {
      console.log("editor", editor)
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
          velocity /= 2
        } else if (timediff < 3500) {
          velocity = 1
        }
        velocity = Math.max(Math.min(parseInt(velocity), 50), 1)

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
      editor.revealLine(100000)
      var line = editor.getModel().getLineCount()
      if (line > stats.n_lines_written) {
        setStats({
          n_hacked_on: stats.n_hacked_on,
          n_lines_written: line
        })

        if (stats.n_lines_written - previous_high_score > 500) {
          previous_high_score = stats.n_lines_written
          server.updateRepositoryStats(repository, hackFile, stats)
        }
      }
    }
  }, [editor, fileContent, srcIndex])

  return (
    <div className="w-full h-full">
      {showSearch && (
        <div
          className="fixed inset-0 z-10 bg-transparent"
          onClick={() => {
            setShowSearch(false)
            setRepoSearch("")
          }}
        >
          <div
            className="relative z-20 bg-gray-900 p-4 mx-auto flex flex-col"
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
        {[hackFile].map((file, index) => (
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
        ))}
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

FileContentDisplay.propTypes = propTypes

export default FileContentDisplay
