export type Room = {
  roomId: number | string;
  roomUsers: {
    name: string;
    index: number | string;
  }[];
};

export type Winner = {
  name: string;
  wins: number;
};

export const db: {
  rooms: Room[];
  winners: Winner[];
} = {
  rooms: [],
  winners: [],
};
