import React from 'react';
import { useChat } from '../contexts/ChatContext';

const ConversationHistory = () => {
  const { history, loadConversation } = useChat();

  return (
    <div className="w-1/4 border-r p-2 overflow-y-auto h-full">
      <h2 className="font-bold mb-2">Conversations</h2>
      {history.map((conv) => (
        <div
          key={conv._id}
          className="cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => loadConversation(conv._id)}
        >
          {new Date(conv.createdAt).toLocaleString()}
        </div>
      ))}
    </div>
  );
};

export default ConversationHistory;
