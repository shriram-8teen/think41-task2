import React from 'react';

const Message = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div
      style={{
        textAlign: isUser ? 'right' : 'left',
        margin: '8px 0',
        color: isUser ? 'blue' : 'green'
      }}
    >
      <strong>{isUser ? 'You' : 'AI'}:</strong> {text}
    </div>
  );
};

export default Message;
