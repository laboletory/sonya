import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import './App.css';
function App() {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);
  const messageRef = useRef(null);
  const recognitionRef = useRef(null);

     useEffect(() => {
       if (!('webkitSpeechRecognition' in window)) {
         console.log("Speech recognition not supported");
         return;
       }
       recognitionRef.current = new window.webkitSpeechRecognition();
       recognitionRef.current.continuous = true;
       recognitionRef.current.interimResults = true;
   
       recognitionRef.current.onresult = (event) => {
         let interimTranscript = '';
         for (let i = event.resultIndex; i < event.results.length; i++) {
           const transcript = event.results[i][0].transcript;
           if (event.results[i].isFinal) {
             setMessage(transcript);
           } else {
             interimTranscript += transcript;
           }
         }
         setMessage(interimTranscript);
       }
     }, []);
   
     const handleListen = (e) => {
      e.preventDefault(); 
      setListening(!listening);
       if (listening){
         recognitionRef.current.stop();
         recognitionRef.current.onend = (e) => { handleSubmit(e)}; //text to speech from the chat input to the chat window
       } else {
         recognitionRef.current.start();
       }
     }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) { return; } 
    fetch('http://localhost:3001/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setChatHistory([...chatHistory, { message: message, response: data.message }]);
        setTimeout(() => {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }, 100);
        setMessage('');
        if (window.speechSynthesis) {
          const utterance = new window.SpeechSynthesisUtterance(data.message);
          let voices = window.speechSynthesis.getVoices();
          let desiredVoice = voices.find(voice => voice.name === 'Google UK English Female');
          if (desiredVoice) {
              utterance.voice = desiredVoice;
          }
          window.speechSynthesis.speak(utterance);
      }    
    });
        // "you" message to be send first
        setChatHistory([...chatHistory, { message: message }]);
        setMessage('');
        };
return (
    <div className="app">
      <div className="chat-history" ref={chatHistoryRef}>
        {chatHistory.map((item) => (
          <div className="chat-bubble" key={item.message + item.response + Math.random()} ref={el => messageRef.current = el}>
            <div className="you">
              <span></span> 
              <span className="you-message">{item.message}</span>
            </div>
            <div className="cassie">
              <span></span> 
              <span className="cassie-message">{item.response}</span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e, message)} 
      className="chat-form" 
      onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e, message)}>
        <input 
          className="chat-input"
          type="text"    
          value={message}
          placeholder="Type your message here..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="mikrofon" onClick={(e) => handleListen(e)}>🎙️</button>
        <button className="submit-button" type="submit">
        <span className="bounce">🤔</span>
        </button>
      </form>
    </div>
  );
}
export default App;