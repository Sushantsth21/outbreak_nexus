import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "👋 Hi! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef(null);
  const stopTimeout = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent({
        contents: [
          {
            parts: [
              {
                text: `You are a specialized disease and outbreak information assistant. Provide direct, simple answers related only to diseases and outbreaks. Avoid unrelated topics. User input: ${input}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      });

      const responseText = result.response.text();

      if (responseText) {
        const botResponse = { text: responseText, sender: "bot" };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I couldn't process that request. Please try again.",
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error connecting to the service. Please try again later.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true; // Changed to true for continuous listening
      recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = true; // Changed to true for interim results
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };
      recognitionInstance.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setInput(finalTranscript || interimTranscript);
        clearTimeout(stopTimeout.current);
        stopTimeout.current = setTimeout(() => {
          stopListening();
          handleSendMessage(); // Send message after 3 seconds of silence
        }, 3000); // 3 seconds timeout
      };
      recognitionInstance.onend = () => {
        setIsListening(false);
        clearTimeout(stopTimeout.current);
      };
      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        clearTimeout(stopTimeout.current);
      };
      recognitionInstance.start();
      recognition.current = recognitionInstance;
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
      clearTimeout(stopTimeout.current);
    }
  };

  return (
    <div className="fixed bottom-20 left-4 bg-white w-80 h-96 shadow-lg rounded-xl border border-gray-300 flex flex-col z-20">
      <div className="flex justify-between items-center bg-gray-800 text-white p-2 rounded-t-xl">
        <span className="text-lg font-semibold">Outbreak Chatbot</span>
        <button onClick={onClose} className="text-white hover:text-red-400">
          <X size={24} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-100 ml-auto max-w-[80%] text-right"
                : "bg-gray-100 mr-auto max-w-[80%]"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 mr-auto p-2 rounded-lg max-w-[80%]">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex p-2 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow border p-1 rounded-l focus:outline-none"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-green-600 text-white p-2 rounded-r hover:bg-green-700 disabled:bg-green-400"
          onClick={handleSendMessage}
          disabled={isLoading || input.trim() === ""}
        >
          Send
        </button>
        <button
          onClick={isListening ? stopListening : startListening}
          className="bg-blue-500 text-white rounded ml-1"
        >
          {isListening ? "Stop" : "Speak"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;