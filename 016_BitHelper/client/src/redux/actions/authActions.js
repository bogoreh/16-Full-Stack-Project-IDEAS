import axios from '../../services/api';

export const register = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/register', { email, password });
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.data.token });
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    console.error(err);
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login', { email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.token });
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};