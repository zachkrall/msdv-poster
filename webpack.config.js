const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  node: {
    fs: "empty"
  },
  devServer: {
    writeToDisk: true,
    contentBase: __dirname,
    hot: true
  }
};
