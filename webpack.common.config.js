const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

module.exports = {
  entry: [
    path.resolve(__dirname, 'client/index.js')
  ],
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
        exclude: ['node_modules', 'server', 'test', '__tests__', 'dist'],
        loader: 'babel-loader',
        query: {
          presets: ['stage-2', 'react', 'env'],
          plugins: ['transform-class-properties']
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
    new webpack.DefinePlugin({
      GOOGLE_CLIENT_ID: JSON.stringify('701806023399-vgqondt26qh10vcuei77r7' +
        'nsbcd8oa8k.apps.googleusercontent.com'),
      CLOUDINARY_API_BASE: JSON.stringify(
        'https://api.cloudinary.com/v1_1/hfdd5itnd/image/upload'
      ),
      CLOUDINARY_UPLOAD_PRESET: JSON.stringify('pdtilqua'),
      CLOUDINARY_IMG_URL_STUB: JSON.stringify(
        'https://res.cloudinary.com/hfdd5itnd/image/upload/'
      )
    })
  ]
};
