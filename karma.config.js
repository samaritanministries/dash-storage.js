var webpack = require("karma-webpack");
var webpackConfig = require("./webpack.config");
var path = require("path");

const PROJECT_ROOT = path.resolve(__dirname);

webpackConfig.module.loaders.push({
  test: /\.js$/,
  include: path.join(PROJECT_ROOT, "test"),
  loader: "babel-loader"
})
webpackConfig.resolve.alias["fakes"] = path.join(PROJECT_ROOT, "test", "fakes");
webpackConfig.resolve.alias["src"] = path.join(PROJECT_ROOT, "src");
module.exports = function (config) {
  "use strict";
  config.set({
    frameworks: [ "jasmine" ],
    files: [
      "node_modules/sinon/pkg/sinon.js",
      "test/test_index.js"
    ],
    plugins: [
      webpack,
      "karma-spec-reporter",
      "karma-tap-reporter",
      "karma-jasmine",
      "karma-phantomjs-launcher"
    ],
    browsers: [ "PhantomJS" ],
    preprocessors: {
      "test/test_index.js": ["webpack"],
      "src/*.js": ["webpack"]
    },
    logLevel: config.LOG_INFO,
    reporters: ["spec", "tap"],
    tapReporter: {
      outputFile: "tests.tap"
    },
    singleRun: false,
    phantomjsLauncher: {
      exitOnResourceError:true
    },
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true }
  });
};
