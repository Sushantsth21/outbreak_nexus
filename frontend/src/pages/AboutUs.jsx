import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Section Title */}
      <section className="mt-16 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">
          About Outbreak Nexus
        </h2>
        <p className="text-lg text-gray-700 px-4 sm:px-6 md:px-12 lg:px-20">
          Outbreak Nexus is a platform designed to inform and educate the public about disease outbreaks
          occurring around the world. We provide up-to-date information on ongoing outbreaks, their effects
          on global health, and preventive measures to help individuals stay informed and safe.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mt-16 text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h3>
        <p className="text-lg text-gray-700 px-4 sm:px-6 md:px-12 lg:px-20">
          Our mission is to provide reliable, real-time data on disease outbreaks globally, empowering people to
          make informed decisions. Through this platform, we aim to support health initiatives and raise awareness
          about emerging health risks, ensuring that individuals are equipped with the knowledge needed to stay
          safe during a crisis.
        </p>
      </section>

      {/* The Team */}
      <section className="mt-16 text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Meet Our Team</h3>
        <div className="flex justify-center space-x-12 mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <img
              src="https://via.placeholder.com/128/ff7f7f/ffffff?text=G"
              alt="Gaurab"
              className="w-full h-full object-cover"
            />
            <p className="mt-2 text-lg font-semibold text-gray-800">Gaurab</p>
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <img
              src="https://via.placeholder.com/128/7f7fff/ffffff?text=S"
              alt="Sushant"
              className="w-full h-full object-cover"
            />
            <p className="mt-2 text-lg font-semibold text-gray-800">Sushant</p>
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <img
              src="https://via.placeholder.com/128/7fff7f/ffffff?text=M"
              alt="Mith"
              className="w-full h-full object-cover"
            />
            <p className="mt-2 text-lg font-semibold text-gray-800">Mith</p>
          </div>
        </div>
        <p className="text-lg text-gray-700 px-4 sm:px-6 md:px-12 lg:px-20">
          Our dedicated team of developers, researchers, and health experts are committed to providing you with the most accurate and timely information.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-6 bg-[#f4ecdc] text-center text-gray-700">
        <p className="text-lg">&copy; 2025 Outbreak Nexus | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default AboutUs;
