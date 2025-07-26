import React from 'react';
import { useChat } from '../contexts/ChatContext';
import Message from './Message';

const MessageList = () => {
  const { messages } = useChat();

  return (
    <div className="flex flex-col space-y-2 overflow-y-auto h-[300px] p-2">
      {messages.map((msg, idx) => (
        <Message key={idx} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
};

export default MessageList;
