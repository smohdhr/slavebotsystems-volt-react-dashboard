import path from 'path';
import nodeExternals from 'webpack-node-externals';
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CompiledExtractPlugin } from '@compiled/webpack-loader';

const config = {
  entry: './src/server.js',
  target: 'node',
  externals: [nodeExternals()],
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve('server-build'),
    filename: 'index.mjs',
    module: true,
    chunkFormat: 'module',
    assetModuleFilename: 'assets/img/[hash][ext][query]'
  },
  module: {
    rules: [
      { test: /\.(js|[jt]sx)$/i, resolve: { fullySpecified: false }, exclude: /node_modules/, use: [{ loader: 'babel-loader' }, { loader: '@compiled/webpack-loader', options: { extract: true } }] },
      { test: /\.(scss|css)$/i, use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { sourceMap: true } }, { loader: "sass-loader" }] },
      { test: /\.(png|jpg|gif|svg)$/i, dependency: { not: ['url'] }, type: 'asset' }
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

export default config;
