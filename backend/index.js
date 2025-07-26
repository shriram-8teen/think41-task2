// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import User from './models/User.js';
import Conversation from './models/Conversation.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ai_conversations', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB connected"))
.catch((err) => console.error(" MongoDB connection error:", err));

// Root Route
app.get('/', (req, res) => {
  res.send('🤖 AI Chat Backend is running');
});

// Core Chat API (Milestone 4)
app.post('/api/chat', async (req, res) => {
  const { message, conversation_id, user_id } = req.body;

  if (!message || !user_id) {
    return res.status(400).json({ error: 'message and user_id are required' });
  }

  try {
    let conversation;

    // If a conversation ID is provided, try to fetch it
    if (conversation_id) {
      conversation = await Conversation.findById(conversation_id);
    }

    // If not found or not provided, create a new one
    if (!conversation) {
      conversation = new Conversation({
        userId: user_id,
        messages: [],
      });
    }

    // Add the user's message
    conversation.messages.push({ sender: 'user', text: message });

    // Placeholder AI response (Milestone 5 will use Groq)
    const aiResponse = `AI: I received your message "${message}"`;

    // Add AI's response
    conversation.messages.push({ sender: 'ai', text: aiResponse });

    // Save conversation
    await conversation.save();

    // Return full conversation
    res.json({
      conversation_id: conversation._id,
      messages: conversation.messages,
    });

  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Something went wrong while processing your message.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
