const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: {
    main: './app/main/entry.js',
    form: './app/form/entry.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js' 
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    stats: 'errors-only',
    host: 'localhost',
    disableHostCheck: true,
    hot: true,
    port: 6788,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://123.123.123.123/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    }
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
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    })
    /*new HtmlWebpackPlugin({
      filename: 'form.html',
      template: './app/form/index.html',
      showErrors: true,
      inject: true,
      chunks: ['form']
    })*/
  ]
};