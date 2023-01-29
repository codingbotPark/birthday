const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean:true
  },
  resolve:{
    modules:['node_modules'],
    extensions:['.js','.json','.css'],
    alias:{
        '@':path.resolve(__dirname,'src/')
    }
  },
  module:{
    rules:[
      {
        test:/\.js/i,
        exclude:/node_modules/,
        use:[
          {
            loader:'babel-loader',
            options:{
              presets:[
                '@babel/preset-env',
              ]
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use:[
          "style-loader", // style nodes from js string
          {
            loader:"css-loader",
            options:{
              modules:{
                localIdentName:"[local]--[hash:base64:5]"
              }
            }
          }, // translate css into commonjs
          "sass-loader", // compiles sass to css, using node sass by default
        ]
      },

      // {
      //   test: /\.s[ac]ss$/i,
      //   use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
      //   exclude:/node_modules/
      // },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader:'url-loader',
        options:{
          name:'[name].[ext]?[hash]',
          publicPath:'./dist/',
          limit:10000
        }
      },
      {
        test:/\.(mp3|mp4|gltf|glb)&/,
        use:{
          loader:'file-loader'
        }
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({filename:'css/style.css'}),
    new HtmlWebpackPlugin({
    filename:"./index.html",
    template:path.resolve(__dirname,"./index.html"),
    favicon:"./static/logo.png"
  }),
],

}