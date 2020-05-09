import React, { useEffect } from 'react';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {

  useEffect(() => {
    import("monaco-editor").then(monaco => {
      let editor = monaco.editor.create(document.getElementById('container'), {
        value: [
          'function x() {',
          '\tconsole.log("Hello world!");',
          '}'
        ].join('\n'),
        theme: "vs-dark",
        language: 'javascript',
        automaticLayout: true
      });
    });
    fetch("/.netlify/functions/code", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(code => console.log("Code: ", code))
  });

  return (
    <Layout>
      <SEO title="Home" />
      <div className="page-content">
        <div id="container" style={{ width: 800, height: 600, border: "1px solid #ccc" }}></div>
      </div>
    </Layout>
  )
}

export default IndexPage
