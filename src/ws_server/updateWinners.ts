import { Winner } from './db';

export const updateWinnersResponse = (winners: Winner[]) => {
  return { type: 'update_winners', data: JSON.stringify(winners), id: 0 };
};
