import React from "react"

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

export default IndexPage
