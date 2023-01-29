import React, { useState } from 'react';
import './App.css';

function App() {
 const [message, setMessage] = useState('');
 const [response, setResponse] = useState('');
 const [chatHistory, setChatHistory] = useState([]);

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
        setResponse(data.message);
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
         ></textarea>
         <button className="submit-button" type="submit">SEND</button>
       </div>
     </div>
   </form>
 </div>
 
  );
}

export default App
