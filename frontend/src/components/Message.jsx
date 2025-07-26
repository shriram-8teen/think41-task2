import React from 'react';

const Message = ({ role, content }) => {
  return (
    <div
      className={`p-2 my-1 rounded-lg max-w-lg ${
        role === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
      }`}
    >
      {content}
    </div>
  );
};

export default Message;
