import React, { useState, useEffect } from 'react';

const SpeechRecognizer = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');

  let recognition = null;

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser. Try Chrome/Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop after one utterance
    recognition.interimResults = false; // Only final results
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.trim().toLowerCase();
      setTranscript(spokenText);
      processCommand(spokenText);
    };

    recognition.onerror = (event) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognition) recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setResult('');
      setError(null);
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const processCommand = (command) => {
    if (command.includes('open google')) {
      window.open('https://www.google.com', '_blank');
      setResult('Opening Google...');
    } else if (command.includes('tell me the time')) {
      const time = new Date().toLocaleTimeString();
      setResult(`The current time is ${time}.`);
    } else if (command.startsWith('search for')) {
      const query = command.replace('search for', '').trim();
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      setResult(`Searching for "${query}"...`);
    } else {
      setResult('Command not recognized. Try again.');
    }
  };

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening} style={{ marginLeft: '10px' }}>
        Stop Listening
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Transcript: {transcript}</p>
      <p>Result: {result}</p>
    </div>
  );
};

export default SpeechRecognizer;