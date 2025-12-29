const initialState = {
  cards: [],
  currentCard: null,
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CARDS':
      return { ...state, cards: action.payload };
    case 'GET_CARD':
      return { ...state, currentCard: action.payload };
    case 'CREATE_CARD':
      return { ...state, cards: [...state.cards, action.payload] };
    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map((card) => (card._id === action.payload._id ? action.payload : card)),
        currentCard: action.payload,
      };
    case 'DELETE_CARD':
      return { ...state, cards: state.cards.filter((card) => card._id !== action.payload) };
    default:
      return state;
  }
};

export default cardReducer;