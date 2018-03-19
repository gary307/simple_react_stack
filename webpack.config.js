//allows webpack to use nodes
const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./app/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "index_bundle.js"
  },
  devServer: {
    inline: true,
    port: 3000,
    historyApiFallback: true,
    open: true
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/,
              name: "[name].[ext]",
              outputPath: "assets/"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true
    })
  ]
};
