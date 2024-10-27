import { httpServer } from './src/http_server/index';
import WebSocket from 'ws';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocket.Server({ port: WS_PORT });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(`Connection established!`);

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Hello, client!`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server is running on ws://localhost:${WS_PORT}`);
