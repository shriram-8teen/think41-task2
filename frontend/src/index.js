import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChatProvider } from './contexts/ChatContext';
import ChatWindow from './components/ChatWindow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  </React.StrictMode>
);
