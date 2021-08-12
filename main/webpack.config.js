const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require('./package.json').dependencies

module.exports = (env = {}) => ({
  mode: "development",
  cache: false,
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  target: "web",
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: 'http://localhost:3002/',
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js'
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    alias: {
      vue: "vue/dist/vue.runtime.esm.js",
      "@": path.resolve(__dirname, "./src")
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false, 
            name: '[name].[ext]',
            limit: 8192
          }
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader"
        ],
      },
    ],
  },
  resolve:{
    alias:{
      "@assets": path.resolve(__dirname, 'src/assets')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ModuleFederationPlugin({
      name: "main",
      filename: "mainRemoteEntry.js",
      remotes: {
        account: "account@http://localhost:3001/accountRemoteEntry.js",
      },
      exposes: {},
      shared: {
        vue: {
          eager: true,
          singleton: true,
          requiredVersion: deps.vue
        },
        "vue-router": {
          eager: true,
          singleton: true,
          requiredVersion: deps["vue-router"]
        },
        vuex: {
          eager: true,
          singleton: true,
          requiredVersion: deps["vuex"]
        },
        tailwindcss: {
          eager: true,
          singleton: true,
          requiredVersion: deps.tailwindcss
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      chunks: ["main"],
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3002,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
});
