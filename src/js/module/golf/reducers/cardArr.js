const card = (state, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        id: action.id,
        hp: action.hp,
        alive: true,
      }
    default:
      return state
  }
}

const cardArr = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [
        ...state,
        card(undefined, action)
      ]
    default:
      return state
  }
}

export default cardArr;
