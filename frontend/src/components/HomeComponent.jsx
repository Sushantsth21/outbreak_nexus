import React from 'react';
import SecondaryComponent from './SecondaryComponent';
import ImageSlider from './ImageSlider';

const HomeComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-6 bg-white text-blue-900 shadow-lg border-b border-gray-200" style={{ backgroundColor: '#beef00' }}>
        <div className="font-bold text-2xl sm:text-3xl tracking-tight">
          Outbreak Nexus
        </div>
        <div className="flex items-center space-x-6 transition-all duration-200">
          <img 
            src="https://www.citypng.com/public/uploads/preview/hd-3d-upward-growth-green-arrow-png-7017516950437708tpcsbhrz0.png" 
            alt="World Bank logo" 
            className="h-10 w-10 object-contain transform hover:scale-105 transition-transform duration-200" 
          />
          <span className="text-lg font-medium text-blue-900">
            1.8 Billion people affected
          </span>
          <a 
            href="#" 
            className="relative text-blue-900 font-medium px-4 py-2 rounded-md hover:text-blue-700 transition-colors duration-200 
            before:content-[''] before:absolute before:inset-0 before:bg-blue-200/20 before:scale-x-0 
            before:origin-left before:transition-transform before:duration-200 before:rounded-md
            hover:before:scale-x-100"
          >
            Trending Data
          </a>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: '#beef00' }}>
        <section style={{ backgroundColor: '' }}className=" rounded-xl shadow-md p-8 mb-12 transform hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
            Disease Outbreaks Worldwide
          </h2>
           {/*adding image slider*/} 
                  <div className="imageslider">
                      <ImageSlider />
                  </div>
          
          <div className="flex justify-center space-x-6 mt-8" >
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg shadow-md 
              font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" style={{ backgroundColor: '#1dbab4' }}
>
              About Us
            </button>
            
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md 
              font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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