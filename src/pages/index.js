import React, { useEffect } from 'react';


import Layout from "../components/layout"
import SEO from "../components/seo"
import Footer from "../components/footer"
import Sidebar from "../components/sidebar"
import FileContentDisplay from "../components/fileContentDisplay"

const IndexPage = () => {
  /*useEffect(() => {
    // examples of calling the API
    fetch("/.netlify/functions/code?repository=aayc/hackertyper2&file=gatsby-config.js")
      .then(response => response.json())
      .then(code => console.log("Code: ", code))

    fetch("/.netlify/functions/dir?repository=aayc/hackertyper2")
      .then(response => response.json())
      .then(body => console.log("Dir", body))
  });*/

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
