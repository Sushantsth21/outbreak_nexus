import React, { useState } from 'react';
import SecondaryComponent from './SecondaryComponent';
import ImageSlider from './ImageSlider';
import Chatbot from './Chatbot'; // Import chatbot component
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react"; // Icon library for chat icon

const HomeComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false); // Toggle chatbot

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8e5c8]">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-[#f4ecdc] text-white shadow-xl rounded-b-3xl">
        <div className="flex items-center space-x-3 ml-2">
          <img 
            src="https://7pi46kr4xr.ufs.sh/f/GB776kQdNYxHzEXNj2BS3GHIoLaA7MFqv4V0pnNYUXChse91" 
            alt="Outbreak Nexus Logo" 
            className="h-12 w-12 object-cover rounded-full border-2 border-white"  
          />
          <div className="font-bold text-3xl sm:text-4xl tracking-wide text-black">Outbreak Nexus</div>
        </div>
        <div className="flex items-center space-x-1 mr-1">
          <img 
            src="https://7pi46kr4xr.ufs.sh/f/GB776kQdNYxHdgwWAQ2N59UaHOcIQj3Bdkp1s2fWgvYSVeJi" 
            alt="World Bank logo" 
            className="h-12 w-12 object-cover rounded-full border-2 border-white"  
          />
          <span className="relative group">
            <Link to="/disease-details" className="inline-block text-lg font-semibold text-white bg-gray-600 py-3 px-9 rounded-full transition-transform transform hover:bg-yellow-500">
              Trending Data
            </Link>
          </span>
        </div>
      </header>

      {/* Section Title */}
      <section className="mt-7">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Disease Outbreaks Around the World
        </h2>
        <p className="text-gray-700 text-lg text-center mb-8">
          Explore global disease outbreaks, both near and far.
        </p>
      </section>

      {/* Image Slider */}
      <div className="flex justify-center items-center w-11/12 mx-auto">
        <ImageSlider />
      </div>

      {/* Sticky Chatbot Icon */}
      <div 
        className="fixed bottom-10 left-4 flex items-center space-x-3 bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-green-700 transition-all"
        onClick={() => setShowChatbot(true)} // Show chatbot on click
      >
        <MessageCircle size={28} />
        <span className="hidden sm:inline-block font-semibold">Chat with us</span>
      </div>

      {/* Chatbot Popup */}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}

      {/* Secondary Component */}
      <SecondaryComponent />
    </div>
  );
};

export default HomeComponent;
