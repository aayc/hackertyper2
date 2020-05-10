import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import FileContentDisplay from "../components/fileContentDisplay"

const IndexPage = () => {
  const [repo, setRepo] = useState("torvalds/linux")

  return (
    <Layout>
      <SEO title="Home" />
      <Sidebar repo={repo} />
      <FileContentDisplay onRepoChange={newRepo => setRepo(newRepo)} />
    </Layout>
  )
}

export default IndexPage
