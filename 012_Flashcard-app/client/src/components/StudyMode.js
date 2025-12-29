import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCards, updateCard } from '../redux/actions/cardActions';
import { useParams } from 'react-router-dom';

const StudyMode = () => {
  const { deckId } = useParams();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    dispatch(getCards(deckId));
  }, [deckId, dispatch]);

  if (cards.length === 0) return <div>No cards in this deck.</div>;

  const currentCard = cards[currentIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleKnown = (known) => {
    dispatch(updateCard(currentCard._id, { known }));
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="study-mode">
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="front">{currentCard.front}</div>
        <div className="back">{currentCard.back}</div>
      </div>
      {isFlipped && (
        <div>
          <button onClick={() => handleKnown(true)}>I Know This</button>
          <button onClick={() => handleKnown(false)}>Review Later</button>
        </div>
      )}
      <p>Card {currentIndex + 1} of {cards.length}</p>
    </div>
  );
};

export default StudyMode;