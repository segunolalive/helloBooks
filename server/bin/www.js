import http from 'http';
import app from '../app';

const port = parseInt(process.env.PORT, 10) || 3000;

const server = http.createServer(app, () => {
  process.stdout(`server running on port: ${port}`);
});
server.listen(port);
