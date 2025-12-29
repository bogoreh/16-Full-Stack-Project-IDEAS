import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCard, updateCard, getCard } from '../redux/actions/cardActions';
import { useParams, useNavigate } from 'react-router-dom';

const CardForm = () => {
  const { deckId, cardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCard = useSelector((state) => state.card.currentCard);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    if (cardId) {
      dispatch(getCard(cardId));
    }
  }, [cardId, dispatch]);

  useEffect(() => {
    if (currentCard) {
      setFront(currentCard.front);
      setBack(currentCard.back);
    }
  }, [currentCard]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardId) {
      dispatch(updateCard(cardId, { front, back })).then(() => navigate(`/decks/${deckId}/cards`));
    } else {
      dispatch(createCard(deckId, { front, back })).then(() => navigate(`/decks/${deckId}/cards`));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <input type="text" value={front} onChange={(e) => setFront(e.target.value)} placeholder="Front" required />
      <input type="text" value={back} onChange={(e) => setBack(e.target.value)} placeholder="Back" required />
      <button type="submit">{cardId ? 'Update' : 'Create'} Card</button>
    </form>
  );
};

export default CardForm;