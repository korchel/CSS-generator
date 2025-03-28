const PugPlugin = require("pug-plugin");

export default {
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ["css-loader"],
      },
    ],
  },
  plugins: [
    new PugPlugin({
      entry: {
        index: "src/pug/index.pug",
      },
      js: {
        filename: "js/[name].[contenthash:8].js",
      },
      css: {
        filename: "css/[name].[contenthash:8].css",
      },
    }),
  ],
  devServer: {
    watchFiles: {
      paths: ["src/**/*.*"],
      options: {
        usePolling: true,
      },
    },
  },
};
