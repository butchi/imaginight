import Immutable from 'immutable';

// Constants
export const ActionTypes = {
  ADD_CARD: 'add_card',
  ATTACK: 'attack',
}

// Reducers
export const cardState = Immutable.fromJS({
  cardArr: [],
});

export const stageState = Immutable.fromJS({
  cardState,
});

export default function reducer(state = cardState, action) {
  switch (action.type) {
    case ActionTypes.ADD_CARD:
      return state;
      // return [
      //   ...state,
      //   card(undefined, action)
      // ]

    case ActionTypes.ATTACK:
      return {
        id: action.id,
        hp: action.hp,
        alive: true,
      }

    default:
      return state;
  }
}

let attackId = 0;
export const attack = (hp) => ({
  type: 'ATTACK',
  id: attackId++,
  hp,
});

let nextCardId = 0;

const addCard = (card) => (dispatch) => {
  dispatch({
    type: 'ADD_CARD',
    id: nextCardId++,
    card,
  });
}

export const stageActionCreators = {
  addCard,
};
