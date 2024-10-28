import { httpServer } from './src/http_server/index';
import WebSocket from 'ws';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocket.Server({ port: WS_PORT });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    ws.send(JSON.stringify('Hello, client!'));
    const parsedMessage = JSON.parse(message.toString());
    console.log('parsedMessage', parsedMessage);
    switch (parsedMessage.type) {
      case 'reg':
        console.log('Registration request:', parsedMessage.data);
        handleRegistration(ws, JSON.parse(parsedMessage.data));
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

function handleRegistration(ws: WebSocket, message: any) {
  const { name } = message;

  const response = {
    type: 'reg',
    data: JSON.stringify({
      name,
      index: Math.random().toString(36).substr(2, 9),
      error: false,
      errorText: '',
    }),
    id: 0,
  };

  ws.send(JSON.stringify(response));

  const updateRoomResponse = {
    type: 'update_room',
    data: JSON.stringify([]),
    id: 0,
  };

  ws.send(JSON.stringify(updateRoomResponse));

  const updateWinnersResponse = {
    type: 'update_winners',
    data: JSON.stringify([]),
    id: 0,
  };

  ws.send(JSON.stringify(updateWinnersResponse));
}
