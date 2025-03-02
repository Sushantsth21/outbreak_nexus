import React, { useState } from "react";
import { X } from "lucide-react"; // Import close icon

const Chatbot = ({ onClose }) => {
  return (
    <div className="fixed bottom-20 left-4 bg-white w-80 h-96 shadow-lg rounded-xl border border-gray-300 p-4 flex flex-col">
      {/* Chatbot Header */}
      <div className="flex justify-between items-center bg-gray-800 text-white p-2 rounded-t-xl">
        <span className="text-lg font-semibold">Outbreak Chatbot</span>
        <button onClick={onClose} className="text-white hover:text-red-400">
          <X size={24} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-2">
        <p className="text-gray-700">👋 Hi! How can I help you today?</p>
      </div>

      {/* Chat Input */}
      <div className="flex p-2 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow border p-2 rounded-l focus:outline-none"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
