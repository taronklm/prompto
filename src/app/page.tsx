"use client"

import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const [responses, setResponses] = useState<{ user: string; bot: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const res = await axios.post('/api/chat', { message: message });
    console.log("RESPONSE: ", res.data.response.generated_text)
    setResponses((prev) => [...prev, { user: message, bot: res.data.response.generated_text }]);
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type your message" 
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <div>
          <p> Bot: How can I help you? </p>
        </div>
          {responses.map((r, index) => (
            <div key={index}>
              <p>User: {r.user}</p>
              <p>Bot: {r.bot}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Chat;
