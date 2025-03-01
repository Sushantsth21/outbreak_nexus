import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";

const Modal = ({ title, onClose, children }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
    <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg transform transition duration-300 hover:scale-105">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">{title}</h2>
      {children}
      <button
        onClick={onClose}
        className="w-full bg-red-500 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-red-600 mt-4"
      >
        Close
      </button>
    </div>
  </div>
);

const SecondaryComponent = () => {
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <div className="p-6" style={{ backgroundColor: "#beef00" }}>
      <header className="text-3xl text-center font-semibold text-blue-700 mb-6">
        Disease Outbreak Info
      </header>

      <main className="bg-gradient-to-b from-white to-gray-200 min-h-[30vh] rounded-lg shadow-2xl mt-8 p-6">
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
      </main>

      <div className="space-y-6 mt-8">
        {/* Person Button */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-gray-700">
            Explore disease outbreaks related to individuals and their impacts.
          </p>
          <button
            onClick={() => openModal("person")}
            className="w-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition transform duration-300 hover:bg-blue-600"
          >
            Person
          </button>
        </div>


        {/* Government Button */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-gray-700">
            Discover how government policies can affect disease outbreaks and response.
          </p>
          <button
            onClick={() => openModal("government")}
            className="w-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md transition transform duration-300 hover:bg-green-600"
          >
            Are you a Government?
          </button>
        </div>
      </div>

      /* Person Modal */
        {modalType === "person" && (
          <Modal title="" onClose={closeModal}>
            <div className="flex justify-between">
          <div className="w-1/2 text-center">
          <a
            href="/pages/personDisease"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-blue-600 inline-block text-center"
          >
            Look for Disease
          </a>
            <p className="mt-2 text-gray-700">Find information about diseases.</p>
          </div>
          <div className="w-1/2 text-center">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-600">
              Look for Locality
            </button>
            <p className="mt-2 text-gray-700">Find outbreaks in a specific area.</p>
          </div>
            </div>
          </Modal>
        )}

        {/* Government Modal */}
      {modalType === "government" && (
        <Modal title="" onClose={closeModal}>
          <div className="flex justify-between">
            <div className="w-1/2 text-center">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-blue-600">
                Look for Disease
              </button>
              <p className="mt-2 text-gray-700">Find information about diseases.</p>
            </div>
            <div className="w-1/2 text-center">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-600">
                Look for Locality
              </button>
              <p className="mt-2 text-gray-700">Find outbreaks in a specific area.</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Remarks Section */}
      <section className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Remarks</h3>
        <p className="text-gray-700">
          Important information and additional context about our services and resources. We strive
          to give you the best data insights.
        </p>
      </section>
    </div>
  );
};

export default SecondaryComponent;
