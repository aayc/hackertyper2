/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const MonacoWebpackPlugin = require(`monaco-editor-webpack-plugin`);
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new MonacoWebpackPlugin()
    ]
  });
};
