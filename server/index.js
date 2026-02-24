import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.get("/", (req, res) => {
  res.send("✅ AI Voice Assistant running");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      max_tokens: 80,

      messages: [
         {
  role: "system",
  content: `
You are a friendly AI voice assistant for a healthcare app.

RESPONSE STYLE:
- Always give a direct helpful answer
- Never ask follow-up questions
- Maximum 2 short sentences
- Clear, simple, human tone
- Voice-friendly

GREETING:
User: hello / hi
Reply: "Hey! How can I help you today?"

HEALTH:
If user mentions symptoms → give basic guidance immediately.

EMERGENCY:
Chest pain, heavy bleeding, breathing issue →
"That sounds serious. Please seek medical help immediately."

GENERAL:
Answer normal questions naturally.

UNCLEAR INPUT:
"Please tell your symptom or question."
`
},
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content.trim(),
    });

  } catch {
    res.json({
      reply: "Sorry, I’m having trouble connecting right now.",
    });
  }
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);