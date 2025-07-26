// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import User from './models/User.js';
import Message from './models/Message.js';
import Conversation from './models/Conversation.js';
import chatWithGroq from './services/groqService.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ai_conversations', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(" MongoDB connected");
}).catch(err => {
  console.error(" MongoDB connection error:", err);
});

// Root Route
app.get('/', (req, res) => {
  res.send('AI Chat Backend is running');
});

// Core Chat API (Milestone 4 + 5)
app.post('/api/chat', async (req, res) => {
  const { userId, message, conversationId } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "Missing userId or message" });
  }

  try {
    let conversation;

    // If conversation ID is provided, fetch it. Otherwise create new.
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) return res.status(404).json({ error: "Conversation not found" });
    } else {
      conversation = new Conversation({ user: userId, messages: [] });
    }

    // Save user message
    const userMessage = new Message({ sender: 'user', content: message });
    await userMessage.save();
    conversation.messages.push(userMessage._id);

    // Call LLM for AI response
    const aiResponse = await chatWithGroq([
      { role: "system", content: "You are a helpful AI assistant for an eCommerce platform." },
      { role: "user", content: message }
    ]);

    const aiMessage = new Message({ sender: 'ai', content: aiResponse.content });
    await aiMessage.save();
    conversation.messages.push(aiMessage._id);

    // Save conversation
    await conversation.save();

    res.status(200).json({
      conversationId: conversation._id,
      messages: [
        { role: 'user', content: userMessage.content },
        { role: 'ai', content: aiMessage.content }
      ]
    });

  } catch (err) {
    console.error(" Error handling chat:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
