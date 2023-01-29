import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [voice, setVoice] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  // initialize the speech synthesis API
  const synth = window.speechSynthesis;

  // fetch the available voices
  const getVoices = () => {
    let voices = synth.getVoices();
    let femaleVoice = voices.find(voice => voice.name === 'Google UK English Female');
    setVoice(femaleVoice);
  }

  useEffect(() => {
    // listen to the onvoiceschanged event
    synth.onvoiceschanged = getVoices;
    if (synth.getVoices().length > 0) {
      getVoices();
    }
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        // create a new speech utterance
        let utterance = new SpeechSynthesisUtterance(data.message);
        utterance.voice = voice;
        if (!isMuted) {
          synth.speak(utterance);
        }
        setChatHistory([...chatHistory, { message: message, response: data.message }]);
        setMessage(''); //reset the message state variable to an empty string
      });
  };

  return (
    <div className="App">
      <div class="cassie_response">
        {chatHistory.map((item) => (
          <div>
            <b>You:</b> {item.message}
            <br />
            <b>Cassie:</b> {item.response}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="chat-input-container">
          <div className="chat-input-wrap">
            <textarea
              className="chat-input"
              value={message}
              placeholder=""
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            ></textarea>
            <button className="submit-button" type="submit">SEND</button>
            <button onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? 'Unmute' : 'Mute'}
</button>

  </div>
  </div>
  </form>
    </div>
  );
}

export default App
