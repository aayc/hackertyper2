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
      //monaco.editor.setTheme('vs')
    });
  });

  return (
    <Layout>
      <SEO title="Home" />
      <div className="page-content">
        <h1>Try it!</h1>
        <div id="container" style={{ width: 800, height: 600, border: "1px solid #ccc" }}></div>
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
