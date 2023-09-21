const path = require('path');
//const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CompiledExtractPlugin } = require('@compiled/webpack-loader');
//const sass = require('sass');

module.exports = {
  entry: './server/index.js',
  target: 'node',
  //externals: [nodeExternals()],
  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.(js|[jt]sx)$/i, exclude: /node_modules/, use: [{ loader: 'babel-loader' }, { loader: '@compiled/webpack-loader', options: { extract: true } }] },
      { test: /\.(scss|css)$/i, use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { sourceMap: true } }, { loader: "sass-loader" }] },
      { test: /\.(png|jpg|gif|svg)$/i, dependency: { not: ['url'] }, type: 'asset', generator: { outputPath: 'assets/img/' } }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CompiledExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets/img/**/*", to: "assets/img/[name][ext]" },
      ],
    }),
    // webpack build command does not exit on windows; fixed with code below
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('DonePlugin', (stats) => {
          console.log('Compile is done !')
          setTimeout(() => {
            process.exit(0)
          })
        });
      }
    }
  ]
};
