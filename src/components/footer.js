import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  position: PropTypes.shape({
    column: PropTypes.number,
    lineNumber: PropTypes.number,
  }),
}
const Footer = ({ position }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 h-8 bg-blue-600 flex justify-end text-white px-4">
      {`Ln ${position.lineNumber}, Col ${position.column}`}
    </div>
  )
}
Footer.propTypes = propTypes

export default Footer
