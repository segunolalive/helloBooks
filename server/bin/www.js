import http from 'http';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../../webpack.dev.config';

import app from '../app';

const port = parseInt(process.env.PORT, 10) || 3000;

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

server.listen(port, () => {
  process.stdout.write(`server running on port: ${port}\n`);
});
