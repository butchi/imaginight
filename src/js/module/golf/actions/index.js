let attackId = 0;
export const attack = (hp) => ({
  type: 'ATTACK',
  id: attackId++,
  hp,
});

let nextCardId = 0;
export const addCard = (card) => ({
  type: 'ADD_CARD',
  id: nextCardId++,
  card,
});
