import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCards, deleteCard } from '../redux/actions/cardActions';
import { useParams, Link } from 'react-router-dom';

const CardList = () => {
  const { deckId } = useParams();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.cards);

  useEffect(() => {
    dispatch(getCards(deckId));
  }, [deckId, dispatch]);

  return (
    <div className="card-list">
      <h2>Cards in Deck</h2>
      <Link to={`/decks/${deckId}/cards/new`}>Add New Card</Link>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            Front: {card.front} | Back: {card.back} | Known: {card.known ? 'Yes' : 'No'}
            <Link to={`/decks/${deckId}/cards/edit/${card._id}`}>Edit</Link>
            <button onClick={() => dispatch(deleteCard(card._id))}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/decks">Back to Decks</Link>
    </div>
  );
};

export default CardList;