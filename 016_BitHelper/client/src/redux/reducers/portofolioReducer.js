const initialState = {
  transactions: [],
  totalBTC: 0,
  totalValue: 0,
};

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      const totalBTC = action.payload.reduce((sum, t) => {
        return t.type === 'buy' ? sum + t.amount : sum - t.amount;
      }, 0);
      return {
        ...state,
        transactions: action.payload,
        totalBTC,
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    default:
      return state;
  }
}