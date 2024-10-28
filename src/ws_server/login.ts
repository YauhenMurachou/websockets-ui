import WebSocket from 'ws';
import { updateRoomResponse } from './updateRoom';
import { updateWinnersResponse } from './updateWinners';

export function handleLogin(ws: WebSocket, message: any) {
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
  ws.send(JSON.stringify(updateRoomResponse([])));
  ws.send(JSON.stringify(updateWinnersResponse([])));
}
