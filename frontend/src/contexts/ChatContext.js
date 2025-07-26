import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/conversations');
      setHistory(res.data);
    } catch (error) {
      console.error('Failed to load history', error);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/chat', {
        message: userInput,
        conversation_id: conversationId,
      });

      const { reply, conversation_id } = res.data;
      setConversationId(conversation_id);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
      fetchConversations(); // refresh history
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
      setUserInput('');
    }
  };

  const loadConversation = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/conversations/${id}`);
      setConversationId(id);
      setMessages(res.data.messages);
    } catch (error) {
      console.error('Failed to load conversation', error);
    }
  };

  return (
    <ChatContext.Provider value={{
      messages,
      userInput,
      setUserInput,
      loading,
      sendMessage,
      history,
      loadConversation,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
