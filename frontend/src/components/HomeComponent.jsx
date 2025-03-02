// HomeComponent.js
import React from 'react';
import SecondaryComponent from './SecondaryComponent';
import ImageSlider from './ImageSlider';

const HomeComponent = () => {
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
        <div className="flex items-center space-x-6 mr-2">
          <img 
            src="https://7pi46kr4xr.ufs.sh/f/GB776kQdNYxHdgwWAQ2N59UaHOcIQj3Bdkp1s2fWgvYSVeJi" 
            alt="World Bank logo" 
            className="h-12 w-12 object-cover rounded-full border-2 border-white"  
          />
          <span className="relative group">
            <a href="#" className="inline-block text-lg font-semibold text-white bg-gray-600 py-3 px-8 rounded-full transition-transform transform hover:scale-110 hover:bg-yellow-500 hover:shadow-lg group-hover:text-white duration-300 ease-in-out">
              Trending Data
            </a>
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
      <div className='width-1' style={{ width: "100%" }}>
        <ImageSlider />
      </div>
      
      {/* About Us Button */}
      <div className="flex justify-center space-x-8 mt-6">
        <button className="bg-black hover:bg-yellow-500 text-white py-3 px-8 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
          About Us
        </button>
      </div>
      
      {/* Secondary Component */}
      <SecondaryComponent />
    </div>
  );
};

export default HomeComponent;
