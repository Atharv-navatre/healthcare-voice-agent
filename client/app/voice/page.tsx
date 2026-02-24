"use client";

import { useState, useRef } from "react";

export default function VoiceAgent() {
  const [conversation, setConversation] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const userText = event.results[0][0].transcript;

      setConversation((prev) => prev + `\n🧑 You: ${userText}`);

      const res = await fetch("https://healthcare-voice-agent.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      setConversation((prev) => prev + `\n🤖 Agent: ${data.reply}`);

      speak(data.reply);
    };

    recognition.onend = () => setListening(false);
  };

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    speech.voice = voices.find((v) => v.lang === "en-US") || voices[0];

    speech.rate = 1.05;
    speech.lang = "en-US";

    speech.onend = () => {
      setTimeout(() => startListening(), 400);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-10">
      <h1 className="text-3xl font-bold mb-6 text-black">
        🏥 AI Healthcare Voice Assistant
      </h1>

      <button
        onClick={startListening}
        className={`px-6 py-3 rounded-xl text-white ${
          listening ? "bg-red-600 animate-pulse" : "bg-green-600"
        }`}
      >
        {listening ? "🔴 Listening..." : "🎙 Start Talking"}
      </button>

      <pre className="mt-6 bg-white p-5 w-full max-w-xl h-96 overflow-y-auto text-black whitespace-pre-wrap">
        {conversation}
      </pre>
    </div>
  );
}