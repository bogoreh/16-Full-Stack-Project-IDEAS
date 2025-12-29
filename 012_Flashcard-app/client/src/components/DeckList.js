import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDecks, deleteDeck } from '../redux/actions/deckActions';
import { Link } from 'react-router-dom';

const DeckList = () => {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state.deck.decks);

  useEffect(() => {
    dispatch(getDecks());
  }, [dispatch]);

  return (
    <div className="deck-list">
      <h2>Your Decks</h2>
      <Link to="/decks/new">Create New Deck</Link>
      <ul>
        {decks.map((deck) => (
          <li key={deck._id}>
            {deck.name} - {deck.description}
            <Link to={`/decks/edit/${deck._id}`}>Edit</Link>
            <button onClick={() => dispatch(deleteDeck(deck._id))}>Delete</button>
            <Link to={`/decks/${deck._id}/cards`}>View Cards</Link>
            <Link to={`/decks/${deck._id}/study`}>Study</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckList;