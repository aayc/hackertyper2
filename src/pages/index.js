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

    // examples
    fetch("/.netlify/functions/code")
      .then(response => response.json())
      .then(code => console.log("Code: ", code))

    fetch("/.netlify/functions/dir")
      .then(response => response.json())
      .then(body => console.log("Dir", body))
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
