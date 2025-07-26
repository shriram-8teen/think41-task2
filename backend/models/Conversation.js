// models/Conversation.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: String, // 'user' or 'ai'
  text: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [messageSchema],
}, { timestamps: true });

export default mongoose.model('Conversation', conversationSchema);
