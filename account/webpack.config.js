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
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   publicPath: '/dist/'
  // },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: 'http://localhost:3001/',
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
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
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
            esModule: false, // 这里设置为false
            name: '[name].[ext]',
            limit: 8192
          }
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              esModule: false,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/img/[name].[hash:8].[ext]',
                  esModule: false
                }
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            //options: { hmr: !env.prod },
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
      name: "account",
      filename: "accountRemoteEntry.js",
      remotes: {
        layout: "main@http://localhost:3002/mainRemoteEntry.js",
      },
      exposes: {
        "./Content": "./src/components/Content.vue",
        "./Button": "./src/components/Button.vue",
        "./TodoList": "./src/components/TodoList.vue",
        "./TodoInput": "./src/components/TodoInput.vue",
        "./Routes": "./src/routes",
        "./Store": "./src/store",
      },
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
          requiredVersion: deps.vuex
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
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
});
