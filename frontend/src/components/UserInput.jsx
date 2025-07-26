import React from 'react';
import { useChat } from '../contexts/ChatContext';

const UserInput = () => {
  const { userInput, setUserInput, sendMessage, loading } = useChat();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="flex mt-4">
      <input
        className="flex-1 border p-2 rounded-l"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        placeholder="Type your message..."
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        Send
      </button>
    </div>
  );
};

export default UserInput;
