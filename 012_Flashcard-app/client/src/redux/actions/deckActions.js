import axios from 'axios';

const config = () => ({
  headers: { 'x-auth-token': localStorage.getItem('token') },
});

export const getDecks = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/decks', config());
    dispatch({ type: 'GET_DECKS', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getDeck = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/decks/${id}`, config());
    dispatch({ type: 'GET_DECK', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const createDeck = (deckData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/decks', deckData, config());
    dispatch({ type: 'CREATE_DECK', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const updateDeck = (id, deckData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/decks/${id}`, deckData, config());
    dispatch({ type: 'UPDATE_DECK', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const deleteDeck = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/decks/${id}`, config());
    dispatch({ type: 'DELETE_DECK', payload: id });
  } catch (err) {
    console.error(err);
  }
};