import { Room } from './db';

export const updateRoomResponse = (rooms: Room[]) => {
  return { type: 'update_room', data: JSON.stringify(rooms), id: 0 };
};
