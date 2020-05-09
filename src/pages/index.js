import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import FileContentDisplay from "../components/fileContentDisplay"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Sidebar />
      <FileContentDisplay />
    </Layout>
  )
}

export default IndexPage
