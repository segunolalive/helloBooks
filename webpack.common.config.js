const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const dotEnv = require('dotenv');

dotEnv.config();

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    html5: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
});

const DefinePluginConfig = new webpack.DefinePlugin({
  GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
  CLOUDINARY_API_BASE: JSON.stringify(process.env.CLOUDINARY_API_BASE),
  CLOUDINARY_UPLOAD_PRESET: JSON.stringify(process.env
    .CLOUDINARY_UPLOAD_PRESET),
  CLOUDINARY_IMG_URL_STUB: JSON.stringify(process.env.CLOUDINARY_IMG_URL_STUB),
  BOOK_IMAGE_FALLBACK: JSON.stringify(process.env.BOOK_IMAGE_FALLBACK),
  BOOK_FALLBACK: JSON.stringify(process.env.BOOK_FALLBACK),
});

const ExtractTextConfig = new ExtractTextPlugin({ filename: 'style.css' });

const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  filename: 'common.js',
  minChunks: 2,
});

const WorkBoxConfig = new workboxPlugin({
  globDirectory: 'dist',
  globPatterns: ['./client/**/*'],
  swDest: path.join('dist', 'client/sw.js'),
  swSrc: './client/sw.js',
});

const CopyPlugin = new CopyWebpackPlugin([
  { from: require.resolve('workbox-sw'), to: 'workbox-sw.prod.js' }
]);


module.exports = {
  entry: {
    app: path.resolve(__dirname, 'client/index.js'),
    vendor: ['react', 'react-dom', 'react-router'],
    pdf: ['react-pdf-js']
  },
  output: {
    filename: '[name].bundle.js',
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
        exclude: ['node_modules', 'server', 'test', '__tests__', 'dist'],
        loader: 'babel-loader',
        query: {
          presets: ['stage-2', 'react', 'env'],
          plugins: ['transform-class-properties']
        },
      },
      {
        test: /\.(s*)css$/,
        exclude: ['node_modules', 'dist'],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { sourceMap: true, minimize: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          }],
        })
      },
      {
        test: /\.(woff|png|jpg|gif)$/,
        loader: 'url-loader?limit=250000'
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CommonsChunkPlugin,
    ExtractTextConfig,
    DefinePluginConfig,
    CopyPlugin,
    WorkBoxConfig
  ]
};
