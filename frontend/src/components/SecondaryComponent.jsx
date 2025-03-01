import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigateToPage = (path) => {
    navigate(path);
    closeModal();
  };

  return (
    <div className="p-6">
      <header className="text-3xl text-center font-semibold text-blue-700 mb-6">Disease Outbreak Info</header>

      <main className="bg-gradient-to-b from-white to-gray-200 min-h-[30vh] rounded-lg shadow-2xl mt-8 p-6">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Disease Outbreaks Around the World</h2>
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
        {/* Person Button and Text */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-gray-700">Explore disease outbreaks related to individuals and their impacts.</p>
          <button
            onClick={() => openModal('person')}
            className="w-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition transform duration-300 hover:bg-blue-600"
          >
            Person
          </button>
        </div>

        {/* Government Button and Text */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-gray-700">Discover how government policies can affect disease outbreaks and response.</p>
          <button
            onClick={() => openModal('government')}
            className="w-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md transition transform duration-300 hover:bg-green-600"
          >
            Are you a Government?
          </button>
        </div>
      </div>

      {/* Person Modal */}
      {modalType === 'person' && (
        <Modal title="Look for Diseases" onClose={closeModal}>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 border border-gray-300">
                <th className="p-2 font-semibold">Look for Disease</th>
                <th className="p-2 font-semibold">Look for Locality</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-300">
                <td className="p-2">Lorem Ipsum</td>
                <td className="p-2">Lorem Ipsum</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2">Lorem Ipsum</td>
                <td className="p-2">Lorem Ipsum</td>
              </tr>
            </tbody>
          </table>
          <a
            href="/person"
            className="text-blue-500 underline mt-4 block text-center hover:text-blue-700"
          >
            Click here for more details
          </a>
        </Modal>
      )}

      {/* Government Modal */}
      {modalType === 'government' && (
        <Modal title="Government Policies on Disease Control" onClose={closeModal}>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 border border-gray-300">
                <th className="p-2 font-semibold">Look for Disease</th>
                <th className="p-2 font-semibold">Look for Locality</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-300">
                <td className="p-2"> A</td>
                <td className="p-2"> A</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2"> B</td>
                <td className="p-2"> B</td>
              </tr>
            </tbody>
          </table>
          <a
            href="/government"
            className="text-blue-500 underline mt-4 block text-center hover:text-blue-700"
          >
            Click here for more government policies
          </a>
        </Modal>
      )}

      {/* Remarks Section */}
      <section className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Remarks</h3>
        <p className="text-gray-700">
          Important information and additional context about our services and resources. We strive to give you the best data insights.
        </p>
      </section>
    </div>
  );
};

export default SecondaryComponent;
