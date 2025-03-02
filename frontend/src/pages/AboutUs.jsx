import React from 'react';

const AboutUs = () => {
  return (
    <div className=" bg-white">

      {/* The Team */}
      <section className="mt-16 text-center text-black-700">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Meet Our Team</h3>
        <div className="flex justify-center space-x-12 mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <img
              src="https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4C0rtATTE2x9jXPmHibMuL4yYweCtZaScGQV2A"
              alt="Gaurab"
              className="w-full h-full object-cover"
            />
            <p className="mt-2 text-lg font-semibold text-gray-800">Gaurab</p> {/* Name below image */}
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <img
              src="https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4CnViWY7IOQkMxtCUhH2b49waNuPrmBjgF7v1E"
              alt="Sushant"
              className="w-full h-full object-cover"
            />
            <p className=" text-lg font-semibold text-gray-800">Sushant</p> {/* Name below image */}
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <img
              src="https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4CPfPyWuaBnCJf09dpY7boaGw2xcZtqDAkQ35W"
              alt="Mith"
              className="w-full h-full object-cover"
            />
            <p className="mt-2 text-lg font-semibold text-gray-800">Mith</p> {/* Name below image */}
          </div>
        </div>
        <p className="pb-10 text-lg text-gray-700 px-4 sm:px-6 md:px-12 lg:px-20">
          Our dedicated team of developers, researchers, and health experts are committed to providing you with the most accurate and timely information.
        </p>
      </section>

      {/* Footer
      <footer className="mt-16 py-6 bg-[#f4ecdc] text-center text-gray-700">
        <p className="text-lg">&copy; 2025 Outbreak Nexus | All Rights Reserved</p>
      </footer> */}
    </div>
  );
};

export default AboutUs;
