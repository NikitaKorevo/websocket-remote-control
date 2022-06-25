import { httpServer } from '../front/http_server/index';
import { WebSocketServer } from 'ws';
import { router } from './modules/router';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (buffer) => {
    const data = buffer.toString();
    router(ws, data);

    console.log(data);
  });
});

process.on('SIGINT', () => {
  console.log('WebSocketServer closed');
  process.exit();
});
