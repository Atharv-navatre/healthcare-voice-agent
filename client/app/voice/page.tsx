"use client";

import { useState, useRef } from "react";

type SpeechRecognitionResultItem = {
  transcript: string;
};

type SpeechRecognitionEventType = {
  results: SpeechRecognitionResultItem[][];
};

type SpeechRecognitionType = {
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEventType) => void;
  onend: () => void;
};

export default function VoiceAgent() {
  const [conversation, setConversation] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  const startListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();

    const SpeechRecognitionConstructor =
      typeof window !== "undefined"
        ? (
            window as unknown as {
              SpeechRecognition?: new () => SpeechRecognitionType;
              webkitSpeechRecognition?: new () => SpeechRecognitionType;
            }
          ).SpeechRecognition ||
          (
            window as unknown as {
              webkitSpeechRecognition?: new () => SpeechRecognitionType;
            }
          ).webkitSpeechRecognition
        : undefined;

    if (!SpeechRecognitionConstructor) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = "en-US";

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript;

      setConversation((prev) => prev + `\n🧑 You: ${userText}`);

      const res = await fetch(
        "https://healthcare-voice-agent.onrender.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText }),
        }
      );

      const data: { reply: string } = await res.json();

      setConversation((prev) => prev + `\n🤖 Agent: ${data.reply}`);

      speak(data.reply);
    };

    recognition.onend = () => setListening(false);
  };

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice =
      voices.find((v) => v.lang === "en-US") || voices[0];

    if (selectedVoice) speech.voice = selectedVoice;

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