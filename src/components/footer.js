import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  position: PropTypes.shape({
    column: PropTypes.number,
    lineNumber: PropTypes.number,
  }),
  stats: PropTypes.shape({
    n_hacked_on: PropTypes.number,
    n_lines_written: PropTypes.number,
  }),
  repository: PropTypes.string,
  onClickRepo: PropTypes.func,
}
const Footer = ({ position, stats, repository, onClickRepo }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 h-8 bg-blue-600 flex justify-between items-center text-white px-4">
      <div className="flex items-center h-full">
        <div
          className="mr-3 hover:bg-blue-400 cursor-pointer h-full flex items-center px-3"
          onClick={onClickRepo}
        >{`Repository: ${repository}`}</div>
        <div className="mr-3">{`${stats.n_hacked_on} people have hacked on this file`}</div>
        {`High score: ${stats.n_lines_written}`}
      </div>
      {`Ln ${position.lineNumber}, Col ${position.column}`}
    </div>
  )
}
Footer.propTypes = propTypes

export default Footer
