import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthForm from './components/AuthForm';
import DeckList from './components/DeckList';
import DeckForm from './components/DeckForm';
import CardList from './components/CardList';
import CardForm from './components/CardForm';
import StudyMode from './components/StudyMode';
import './styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <header>FlashCard Study App</header>
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/decks" element={<DeckList />} />
            <Route path="/decks/new" element={<DeckForm />} />
            <Route path="/decks/edit/:id" element={<DeckForm />} />
            <Route path="/decks/:deckId/cards" element={<CardList />} />
            <Route path="/decks/:deckId/cards/new" element={<CardForm />} />
            <Route path="/decks/:deckId/cards/edit/:cardId" element={<CardForm />} />
            <Route path="/decks/:deckId/study" element={<StudyMode />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;