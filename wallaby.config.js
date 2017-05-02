var webpackConfig = require("./webpack.config");
var wallabyWebpack = require('wallaby-webpack');
var path = require("path");
var webpack = require("webpack");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = function (wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    devtool: "source-map",
    module: {
      loaders: [
        {
          test: /\.html$/,
          include: path.join(wallaby.projectCacheDir, "src"),
          loader: "mustache"
        },
        {
          test: /\.ejs$/,
          loader: "ejs-compiled"
        },
      ]
    },
    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
      )
    ],
    resolve: {
      alias: {
        "fakes": path.join(wallaby.projectCacheDir, "test", "fakes")
      },
      modulesDirectories: [path.join(PROJECT_ROOT, "node_modules"), path.join(PROJECT_ROOT, "bower_components")]
    }
  });

  return {
    files: [
      "bower_components/jquery/dist/jquery.js",
      {pattern: "node_modules/sinon/pkg/sinon.js", instrument: false},
      {pattern: "src/**/*.ejs", load: false},
      {pattern: "src/**/*.html", load: false},
      {pattern: "src/**/*.js", load: false},
      {pattern: "test/fakes/**/*.js", load: false}
    ],

    tests: [
      {pattern: "test/**/*_spec.js", load: false}
    ],

    compilers: {
      "**/*.js": wallaby.compilers.babel()
    },

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
