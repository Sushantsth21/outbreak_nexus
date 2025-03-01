import React from 'react';
import SecondaryComponent from './SecondaryComponent';

const HomeComponent = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
        <div className="font-bold text-xl sm:text-2xl">Outbreak Nexus</div>
        <div className="flex items-center space-x-4">
          <img 
            src="https://www.citypng.com/public/uploads/preview/hd-3d-upward-growth-green-arrow-png-7017516950437708tpcsbhrz0.png" 
            alt="World Bank logo" 
            className="h-12 w-12 text-white-500" 
          />
          <span className="text-lg">
            1.8 Billion people are affected by disease
          </span>
          <span className="hover:text-yellow-300">
            <a href="#">Trending Data</a>
          </span>
        </div>
      </header>
      
      <main className=" bg-gradient-to-b from-white to-gray-200 min-h-[40vh] rounded-lg shadow-2xl mt-8">
        <section className="min-h-[40vh] bg-white shadow-lg rounded-xl p-6 mb-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
            Disease Outbreaks Around the World
          </h2>
          <p className="text-gray-700 text-lg text-center mb-6">
            This page provides details about the disease outbreaks, both nearby and worldwide.
          </p>
          
          <div className="flex justify-center space-x-6 mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              About Us
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              Real Stories
            </button>
          </div>
        </section>
      </main>
    
      <SecondaryComponent />
    </div>
  );
};

export default HomeComponent;
