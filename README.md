# 🏥 AI Healthcare Voice Calling Agent

An intelligent real-time voice assistant for healthcare that allows users to speak naturally and receive instant, clear, and helpful responses.  
This project transforms traditional symptom checkers into a **human-like conversational AI voice experience**.

---

## 🚀 Live Demo
🔗 https://healthcare-voice-agent-zoqx.vercel.app/voice

---

## ✨ Features
- 🎙️ Real-time voice interaction  
- 🧠 AI-powered natural conversation  
- 🩺 Instant basic healthcare guidance  
- 💬 Handles general questions (not only medical)  
- ⚡ Fast responses using Groq LLM  
- 🔊 Text-to-speech voice replies  
- 🎧 Continuous listening mode (call-style experience)  
- 🌍 Works directly in the browser (no app required)

---

## 🧠 How It Works
1. User speaks through the browser microphone  
2. Speech is converted → text using Web Speech API  
3. Text is sent to the AI backend  
4. AI generates a short and clear response  
5. Response is converted → voice  
6. Conversation continues like a real call  

---

## 🏗️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Web Speech API (Speech Recognition + Speech Synthesis)

### Backend
- Node.js
- Express.js
- Groq LLM (`llama-3.1-8b-instant`)
- REST API

### Deployment
- Vercel (Frontend)
- Render / Railway (Backend)

---

## 🎯 Use Cases
- AI healthcare voice assistant  
- Smart symptom guidance  
- Telehealth pre-consult interaction  
- Accessible hands-free health support  
- AI calling agent interface  

---

## 🔄 Project Flow
User Voice → Speech-to-Text → AI Processing → Text Response → Voice Output

---

## 🧪 Example Conversation

**User:**  
> I have fever for two days  

**AI:**  
> This looks like a viral fever. Rest, drink fluids, and monitor your temperature.

**User:**  
> What can you do?  

**AI:**  
> I can give health guidance and answer general questions.

**User:**  
> I have severe chest pain  

**AI:**  
> That sounds serious. Please seek medical help immediately.

---

## 🔐 Environment Variables
Create a `.env` file inside the **server** folder:
GROQ_API_KEY=your_api_key_here


---

## ⚙️ Local Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/healthcare-voice-agent.git
cd healthcare-voice-agent

2️⃣ Setup backend
cd server
npm install
node index.js

3️⃣ Setup frontend
cd client
npm install
npm run dev

4️⃣ Open in browser

http://localhost:3000/voice

🧩 Future Enhancements

🌐 Multilingual voice support

📄 AI-generated health summary

👨‍⚕️ Doctor handoff system

📱 Mobile app version

🧠 Conversation memory

❤️ Health risk detection

👨‍💻 Author

Built with passion by Atharv

If you like this project, give it a ⭐ on GitHub!
