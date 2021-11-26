const path = require('path')
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    entry: {
      app: "./assets/js/script.js",
      events: "./assets/js/events.js",
      schedule: "./assets/js/schedule.js",
      tickets: "./assets/js/tickets.js"
    },
    output: {
      filename: "[name].bundle.js",
      path: __dirname + "/dist",
    },
    module: {
      rules: [
        {
          test: /\.jpg$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                name(file) {
                  return '[path][name].[ext]';
                },
                publicPath: function(url) {
                  return url.replace('../', '/assets/');
                }
              }
            },
            // error when uncommented
            //fixed it by going into node_modules/image-webpack-loader/index.js and commenting out lines 71 and 72 
            {
              loader: 'image-webpack-loader'
            }
          ]
        }
      ]
    },
    plugins:[
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "disable",// the report outputs to an HTML file in the dist folder
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, './'),
      },
      compress: true,
      port: 8080,
    },
    mode: 'development'
}