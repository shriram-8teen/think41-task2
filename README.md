# AI Conversational Agent – Full Stack Project

This is a full-stack AI-powered conversational agent built as part of the **Recruit41 Full Stack Engineer L2 assignment**. It uses **Node.js + Express + MongoDB** for the backend and **React** for the frontend.

---

##  Milestones Completed

### Backend
- **Milestone 2**: Database setup and CSV ingestion (`inventory_items.csv`, `orders.csv`)
- **Milestone 3**: Mongoose data models – `User`, `Conversation`, `Message`
- **Milestone 4**: Core Chat API (`POST /api/chat`) implemented
- **Milestone 5**: LLM (Groq API) integration + business logic layer

###  Frontend
- **Milestone 6**: Chat UI with components:
  - `ChatWindow`
  - `MessageList`
  - `Message`
  - `UserInput`
- **Milestone 7**: State management using **React Context API**
- **Milestone 8**: Conversation history panel

---

## 🖥️ Tech Stack

| Layer       | Tech                         |
|-------------|------------------------------|
| Backend     | Node.js, Express, MongoDB, Mongoose |
| LLM         | [Groq API](https://console.groq.com) |
| Frontend    | React (CRA), Context API     |
| Styling     | Basic CSS                    |

---

##  How to Run

### 1. Clone the repo

```bash
git clone https://github.com/shriram-8teen/think41-task2.git
cd think41-task2
````
## SetUp Backend 
### cd backend
### npm install
### Add a .env file
GROQ_API_KEY=your_groq_api_key
### Start Backend Server
npm start
# Server runs on http://localhost:3001

## 3. Setup Frontend
###  cd ../frontend
npm install
npm start
# Opens on http://localhost:3000
## 4.  Features
Chat interface with user + AI messages

Conversation history panel

LLM asks clarifying questions (Groq API)

Intelligent responses using DB lookup

Data persistence in MongoDB
##  Project Structure
````
backend/
├── models/
├── routes/
├── services/
├── data/
├── index.js
└── .env

frontend/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
``````

