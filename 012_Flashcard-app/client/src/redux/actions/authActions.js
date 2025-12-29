import axios from 'axios';

export const register = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/register', userData);
    dispatch({ type: 'AUTH_SUCCESS', payload: res.data.token });
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    dispatch({ type: 'AUTH_FAIL', payload: err.response.data.msg });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', userData);
    dispatch({ type: 'AUTH_SUCCESS', payload: res.data.token });
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    dispatch({ type: 'AUTH_FAIL', payload: err.response.data.msg });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};