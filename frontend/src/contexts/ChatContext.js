import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        input,
        setInput,
        loading,
        setLoading
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
