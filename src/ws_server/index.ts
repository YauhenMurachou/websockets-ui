import WebSocket from 'ws';
import { handleLogin } from './login';

const WS_PORT = 3000;

export function wsServer() {
  const wss = new WebSocket.Server({ port: WS_PORT });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      ws.send(JSON.stringify('Hello, client!'));
      const parsedMessage = JSON.parse(message.toString());
      switch (parsedMessage.type) {
        case 'reg':
          handleLogin(ws, JSON.parse(parsedMessage.data));
          break;
        default:
          console.log('Unknown message type:', parsedMessage.type);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log(`WebSocket server is running on ws://localhost:${WS_PORT}`);

  return wss;
}
