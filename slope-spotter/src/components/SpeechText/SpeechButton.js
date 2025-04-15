import React, { useEffect, useRef, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const SpeechButton = ({ onTranscript }) => {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Transcript:', transcript);
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscript]);

  const handleClick = () => {
    if (recognitionRef.current && !isListening) {
      setError(null);
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: handleClick, disabled: isListening },
      isListening ? 'Listening...' : <FaMicrophone />
    ),
    error &&
      React.createElement(
        'p',
        { style: { color: 'red' } },
        error
      )
  );
};

export default SpeechButton;
