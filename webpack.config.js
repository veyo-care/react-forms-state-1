var path = require("path");

module.exports = {
  entry: "./lib/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "ReactFormsState",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
    rxjs: {
      root: "Rx",
      commonjs2: "rxjs",
      commonjs: "rxjs",
      amd: "rxjs",
    },
    immutable: {
      root: "immutable",
      commonjs2: "immutable",
      commonjs: "immutable",
      amd: "immutable",
    },
  },
  devtool: "source-map",
};
