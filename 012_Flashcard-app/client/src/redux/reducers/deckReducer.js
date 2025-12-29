const initialState = {
  decks: [],
  currentDeck: null,
};

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DECKS':
      return { ...state, decks: action.payload };
    case 'GET_DECK':
      return { ...state, currentDeck: action.payload };
    case 'CREATE_DECK':
      return { ...state, decks: [...state.decks, action.payload] };
    case 'UPDATE_DECK':
      return {
        ...state,
        decks: state.decks.map((deck) => (deck._id === action.payload._id ? action.payload : deck)),
        currentDeck: action.payload,
      };
    case 'DELETE_DECK':
      return { ...state, decks: state.decks.filter((deck) => deck._id !== action.payload) };
    default:
      return state;
  }
};

export default deckReducer;