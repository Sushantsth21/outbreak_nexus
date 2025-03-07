import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Remark from "./Remark";
import AboutUs from "../pages/AboutUs";

const Modal = ({ title, onClose, children }) => (
  <div className="x-15 fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
    <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg transform transition duration-300 hover:scale-105">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">{title}</h2>
      {children}
      <button
        onClick={onClose}
        className="w-1/4 bg-red-500 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-red-600 mt-4"
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
    <div className="relative p-4 text-center mt-6" style={{ backgroundColor: "white" }}>
      <header className="text-3xl text-center font-bold text-black-700 mb-6">
        Disease Outbreak Info
      </header>
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
        Welcome to Outbreak Nexus
      </h2>

      <p className="text-lg text-center text-gray-700 mb-6">
        Outbreak Maps is your go-to platform for monitoring disease outbreaks...
      </p>

      <div className="space-y-1 mt-1">
        {/* Buttons in One Row with Spacing */}
        <div className="flex justify-center space-x-4">
          {/* Individual Login Button */}
          <button
            onClick={() => openModal("person")}
            className="inline-block text-lg font-semibold text-white bg-gray-600 py-3 px-8 rounded-full transition-transform transform hover:scale-110 hover:bg-yellow-500 hover:shadow-lg group-hover:text-white duration-300 ease-in-out w-1/3 bg-black text-white px-6 py-3 rounded-lg shadow-md transition transform duration-300 hover:bg-yellow-500"
          >
            Individual Login
          </button>

          {/* Government Button */}
          <button
            onClick={() => openModal("government")}
            className="inline-block text-lg font-semibold text-white bg-gray-600 py-3 px-8 rounded-full transition-transform transform hover:scale-110 hover:bg-yellow-500 hover:shadow-lg group-hover:text-white duration-300 ease-in-out w-1/3 bg-black text-white px-6 py-3 rounded-lg shadow-md transition transform duration-300 hover:bg-yellow-500"
          >
            Officer Login
          </button>
        </div>
      </div>

      {/* Modals */}
      {modalType === "person" && (
        <Modal title="" onClose={closeModal}>
          <div className="flex justify-between">
            <div className="w-1/2 text-center">
              <a
                href="/personDisease"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-blue-600 inline-block text-center"
              >
                Look for Disease
              </a>
            </div>
            <div className="w-1/2 text-center">
            <a
                href="/locality"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-600 inline-block text-center"
              >
                Look for Locality
              </a>
            </div>
          </div>
        </Modal>
      )}

      {/* Government Modal */}
      {modalType === "government" && (
        <Modal title="" onClose={closeModal}>
          <div className="text-center">
            <a
              href="/report"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-600 inline-block text-center"
            >
              Generate Report
            </a>
          </div>
        </Modal>
      )}

      {/* Remarks Section */}
      <div className="remark">
        <Remark />
      </div>

      {/* About Us Section */}
      <div className="about-us">
        <AboutUs />
      </div>
    </div>
  );
};

export default SecondaryComponent;
