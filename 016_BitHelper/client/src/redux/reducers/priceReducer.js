const initialState = {
  current: null,
  loading: true,
};

export default function priceReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PRICE':
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}