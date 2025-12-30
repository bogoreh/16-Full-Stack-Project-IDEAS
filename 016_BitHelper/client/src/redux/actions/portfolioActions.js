import axios from '../../services/api';

export const fetchTransactions = () => async (dispatch) => {
  try {
    const res = await axios.get('/portfolio/transactions');
    dispatch({ type: 'SET_TRANSACTIONS', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addTransaction = (type, amount, price) => async (dispatch) => {
  try {
    const res = await axios.post('/portfolio/transaction', { type, amount, price });
    dispatch({ type: 'ADD_TRANSACTION', payload: res.data });
    dispatch(fetchTransactions());
  } catch (err) {
    console.error(err);
  }
};