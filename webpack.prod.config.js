const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: ['node_modules', 'server', 'test', 'dist'],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        },
      },
      {
        test: /\.scss$/,
        exclude: ['node_modules', 'dist'],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          }
        ],
      },
      {
        test: /\.css$/,
        exclude: /node-modules/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|png|jpg|gif)$/,
        loader: 'url-loader?limit=250000'
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   },
    //   GOOGLE_CLIENT_SECRET: JSON.stringify('VenazYqo1V-41a8pAocf7a9H'),
    //   GOOGLE_CLIENT_ID: JSON.stringify('701806023399-vgqondt26qh10vcuei77r7nsbcd8oa8k.apps.googleusercontent.com')
    // })
  ],
};
