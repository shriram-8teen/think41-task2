// services/groqService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const chatWithGroq = async (messages) => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'mixtral-8x7b-32768',
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiMessage = response.data.choices[0].message;
    return aiMessage;
  } catch (error) {
    console.error('Error communicating with Groq:', error.response?.data || error.message);
    throw new Error('Failed to get response from LLM');
  }
};

export default chatWithGroq;
