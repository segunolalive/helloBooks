import http from 'http';
import path from 'path';

import express from 'express';
import webpack from 'webpack';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.dev.config';
import routes from './routes/index';


const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, 'client/static')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

// app.get('/bundle.js', (req, res) => res.sendFile(
//   path.join(path.dirname(__dirname), 'client/bundle.js')
// ));

app.get('/*', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'client/index.html'))
);


const port = parseInt(process.env.PORT, 10) || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  process.stdout.write(`server running on port: ${port}\n`);
});
