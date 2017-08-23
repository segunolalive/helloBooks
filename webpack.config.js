const path = require('path');

module.exports = {
  entry: './server/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/server')
  }
};
