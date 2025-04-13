import React from 'react';
import SpeechButton from './components/SpeechButton';

const SpeechTest = () => {
  const handleTranscript = (text) => {
    console.log('🗣️ Transcript:', text);
    // Here you can handle the transcript, e.g., send it to your backend or process it further
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Speech Recognition Test</h2>
      <p>Try saying: "Navigate to the library"</p>
      <SpeechButton onTranscript={handleTranscript} />
    </div>
  );
};

export default SpeechTest;
