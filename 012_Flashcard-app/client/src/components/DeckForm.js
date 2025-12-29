import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDeck, updateDeck, getDeck } from '../redux/actions/deckActions';
import { useParams, useNavigate } from 'react-router-dom';

const DeckForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentDeck = useSelector((state) => state.deck.currentDeck);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getDeck(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentDeck) {
      setName(currentDeck.name);
      setDescription(currentDeck.description);
    }
  }, [currentDeck]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateDeck(id, { name, description })).then(() => navigate('/decks'));
    } else {
      dispatch(createDeck({ name, description })).then(() => navigate('/decks'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="deck-form">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Deck Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">{id ? 'Update' : 'Create'} Deck</button>
    </form>
  );
};

export default DeckForm;