import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'test'
) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, PUT, DELETE, HEAD'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, X-PINGOTHER, Origin, X-Requested-With,' +
      'Content-Type, Accept, x-access-token'
    );
    next();
  });
}

app.use('/api-docs', express.static(path.join(__dirname, '/docs')));

app.use('/', express.static(path.join(__dirname, 'client/static')));

app.use('/api/v1', routes);


app.get('/bundle.js', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'client/bundle.js')
));

app.get('/manifest.json', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'client/manifest.json')
));

app.get('/sw.js', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'client/sw.js')
));

app.get('/*', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'client/index.html'))
);

/*
eslint-disable
*/
app.use((err, req, res, next) => (
  res.status(500).send({
    message: 'Something went wrong. Internal server error'
  })
));


export default app;
