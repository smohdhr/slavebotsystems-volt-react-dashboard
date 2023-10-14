import path from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CompiledExtractPlugin } from '@compiled/webpack-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getConfig(file) {
  const fileName = path.parse(file).name;
  const config = {
    name: fileName,
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/webmachine/build/',
      filename: '[name].mjs',
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
  config["entry"] = {};
  config["entry"][fileName] = { import: path.resolve(__dirname, file) };
  if (fileName.includes("client")) {
    config["output"]["libraryTarget"] = "commonjs2";
  }
  else {
    config["target"] = "node";
    config["context"] = __dirname;
    config["node"] = {
      __filename: true,
      __dirname: true
    };
    config["externals"] = [nodeExternals()];
  }
  return config;
}

export default [getConfig('server.js'), getConfig('src/client.jsx')];
