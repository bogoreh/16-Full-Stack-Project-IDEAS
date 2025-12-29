import React from 'react';
import SpeechRecognizer from './components/SpeechRecognizer';

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Sprogner: Voice Command App</h1>
      <p>Speak commands like "Open Google", "Tell me the time", or "Search for React hooks".</p>
      <SpeechRecognizer />
    </div>
  );
}

export default App;