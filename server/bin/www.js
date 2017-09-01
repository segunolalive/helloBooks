import http from 'http';

import app from '../app';

const port = parseInt(process.env.PORT, 10) || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  process.stdout.write(`server running on port: ${port}\n`);
});
