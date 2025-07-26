import React from 'react';
import Message from './Message';

// Dummy static messages for now
const messages = [
  { sender: 'user', text: 'Hi there!' },
  { sender: 'ai', text: 'Hello! How can I help you today?' }
];

const MessageList = () => {
  return (
    <div className="message-list" style={{ padding: 10, border: '1px solid #ccc', minHeight: 200 }}>
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

export default MessageList;
