import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';

const ChatWindow = () => {
  return (
    <div className="chat-window" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>AI Assistant</h2>
      <MessageList />
      <UserInput />
    </div>
  );
};

export default ChatWindow;
