import React, { useState } from 'react';

const UserInput = () => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    console.log('Send:', input);
    setInput('');
  };

  return (
    <div style={{ marginTop: 10 }}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%', padding: 8 }}
      />
      <button onClick={handleSend} style={{ padding: 8 }}>Send</button>
    </div>
  );
};

export default UserInput;
