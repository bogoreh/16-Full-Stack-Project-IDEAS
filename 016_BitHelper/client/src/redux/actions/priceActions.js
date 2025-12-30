import axios from '../../services/api';

export const fetchPrice = () => async (dispatch) => {
  try {
    const res = await axios.get('/price');
    dispatch({ type: 'SET_PRICE', payload: res.data.price });
  } catch (err) {
    console.error(err);
  }
};