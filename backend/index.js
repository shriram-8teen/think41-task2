// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Models (you'll use these in later milestones)
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
  useUnifiedTopology: true
})
.then(() => console.log(" MongoDB connected"))
.catch(err => console.error(" MongoDB connection error:", err));

// Root Route
app.get('/', (req, res) => {
  res.send('AI Chat Backend is running');
});

// Future Route (we’ll define later in milestone 4)
app.post('/api/chat', async (req, res) => {
  res.status(501).json({ message: 'Chat endpoint not implemented yet' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
