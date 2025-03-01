import React from 'react';
import SecondaryComponent from './SecondaryComponent';
import ImageSlider from './ImageSlider';

const HomeComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8e5c8]"> {/* Light cream color */}

<header className="flex justify-between items-center p-6 bg-[#f4ecdc] text-white shadow-xl rounded-b-3xl"> {/* Solid cream color */}
  <div className="flex items-center space-x-3 ml-2"> {/* Added margin-left to move logo slightly to the left */}
    <img 
      src="https://7pi46kr4xr.ufs.sh/f/GB776kQdNYxHzEXNj2BS3GHIoLaA7MFqv4V0pnNYUXChse91" 
      alt="Outbreak Nexus Logo" 
      className="h-12 w-12 object-cover rounded-full border-2 border-white"  // Added border for modern look
    />
    <div className="font-bold text-3xl sm:text-4xl tracking-wide text-black">Outbreak Nexus</div> {/* Adjusted text size and tracking for clarity */}
  </div>
  
  <div className="flex items-center space-x-6 mr-2"> {/* Added margin-right to shift 'Trending Data' a little left */}
    <img 
      src="https://7pi46kr4xr.ufs.sh/f/GB776kQdNYxHdgwWAQ2N59UaHOcIQj3Bdkp1s2fWgvYSVeJi" 
      alt="World Bank logo" 
      className="h-12 w-12 object-cover rounded-full border-2 border-white"  // Added border for consistency
    />
    <span className="relative group">
      <a href="#" className="inline-block text-lg font-semibold text-white bg-gray-600 py-3 px-8 rounded-full transition-transform transform hover:scale-110 hover:bg-yellow-500 hover:shadow-lg group-hover:text-white duration-300 ease-in-out">
        Trending Data
      </a>
    </span>
  </div>
</header>

        <section className="mt-7">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Disease Outbreaks Around the World
          </h2>
          <p className="text-gray-700 text-lg text-center mb-8">
            Explore global disease outbreaks, both near and far.
          </p>
          
        </section>
      <div className='ImageSlider'>
        <ImageSlider />
      </div>
      <div className="flex justify-center space-x-8 mt-6">
            <button className="bg-black hover:bg-yellow-500 text-white py-3 px-8 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
              About Us
            </button>
            
            <button className="bg-black hover:bg-yellow-500 text-white py-3 px-8 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
              Real Stories
            </button>
        </div>
    
      <SecondaryComponent />
    </div>
  );
};

export default HomeComponent;