const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  devtool: 'eval',
  entry: {
    main: './app/main/entry.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|png|svg|jpg|gif)$/, 
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,  'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      }
    ]
  },
  resolve: { 
    alias: { 
      vue: 'vue/dist/vue.esm.js' 
    } 
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/main/index.html',
      showErrors: true,
      inject: true,
      chunks: ['main']
    }),
    new MiniCssExtractPlugin()
  ]
};