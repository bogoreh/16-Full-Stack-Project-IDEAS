import axios from 'axios';

const config = () => ({
  headers: { 'x-auth-token': localStorage.getItem('token') },
});

export const getCards = (deckId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cards/${deckId}`, config());
    dispatch({ type: 'GET_CARDS', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getCard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cards/card/${id}`, config()); // Note: Adjust if route changes
    dispatch({ type: 'GET_CARD', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const createCard = (deckId, cardData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/cards/${deckId}`, cardData, config());
    dispatch({ type: 'CREATE_CARD', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const updateCard = (id, cardData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/cards/${id}`, cardData, config());
    dispatch({ type: 'UPDATE_CARD', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const deleteCard = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/cards/${id}`, config());
    dispatch({ type: 'DELETE_CARD', payload: id });
  } catch (err) {
    console.error(err);
  }
};