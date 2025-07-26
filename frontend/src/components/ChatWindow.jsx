import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import ConversationHistory from './ConversationHistory';

const ChatWindow = () => {
  return (
    <div className="flex h-screen">
      <ConversationHistory />
      <div className="flex flex-col w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">AI Chat Interface</h1>
        <MessageList />
        <UserInput />
      </div>
    </div>
  );
};

export default ChatWindow;
