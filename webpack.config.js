var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = {
  devtool: "source-map",
  entry: {
    app: "./src/application.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(PROJECT_ROOT, "src"),
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/, // Only .scss files
        loader: 'style!css!sass' // Run both loaders
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.html$/,
        include: path.join(PROJECT_ROOT, "src"),
        loader: "mustache"
      },
      {
        test: /\.ejs$/,
        loader: "ejs-compiled"
      }
    ]
  },
  output: {
    filename: "dash-storage.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
	  alias: {
      "src": path.join(PROJECT_ROOT, "src")
    },
    modulesDirectories: [path.join(PROJECT_ROOT, "node_modules"), path.join(PROJECT_ROOT, "bower_components")]
  },
  plugins: [
    new webpackUglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, '.tmp/cached_uglify/'),
      debug: true,
      minimize: true,
      sourceMap: false,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      _: "underscore"
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
  ]
}
