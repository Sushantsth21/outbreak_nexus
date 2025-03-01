import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBx24bPSu-d0gVbahoKcP9MXP-wlvr-h1GTD2MHolDFryig0oBQjyuBMUT99h5HBTH4ME&usqp=CAU",
    title: "Disease 1",
    description: "Description of Disease 1"
  },
  {
    url: "https://www.cdc.gov/ebola/media/images/2024/04/Ebola_virus_purple.jpg",
    title: "Ebola Virus",
    description: "Ebola virus, a deadly infectious disease."
  },
  {
    url: "https://www.nfid.org/wp-content/uploads/2023/03/Pneumococcal-v1-1.jpeg",
    title: "Pneumococcal Disease",
    description: "A type of pneumonia caused by the Streptococcus pneumoniae bacteria."
  },
  {
    url: "https://www.endocrine.org/-/media/endocrine/images/patient-engagement-webpage/condition-page-images/cardiovascular-disease/cardio_disease_t2d_pe_1796x943.jpg",
    title: "Cardiovascular Disease",
    description: "Cardiovascular disease related to Type 2 diabetes."
  },
  {
    url: "https://www.ttuhsc.edu/medicine/images/internal/divisions/im_divisionpage_infectiousdisease.png",
    title: "Infectious Disease",
    description: "A variety of infectious diseases affecting the human body."
  },
  {
    url: "https://www.infectiousdiseaseadvisor.com/wp-content/uploads/sites/16/2024/01/Mpox_G_1402268655.jpg",
    title: "Mpox",
    description: "Mpox, formerly known as Monkeypox, an infectious viral disease."
  },
  {
    url: "https://www.merck.com/wp-content/uploads/sites/124/2020/02/infection-disease.jpeg?resize=666,664",
    title: "Infection Disease",
    description: "A general representation of infectious diseases."
  },
  {
    url: "https://mspgh.unimelb.edu.au/__data/assets/image/0003/4377324/varieties/medium.jpg",
    title: "Varieties of Disease",
    description: "Different varieties of diseases that exist around the world."
  },
  {
    url: "https://lirp.cdn-website.com/8318eaf8/dms3rep/multi/opt/Untitled-1-960w.jpg",
    title: "Untitled Disease Image",
    description: "A general image representing disease-related visuals."
  },
  {
    url: "https://www.novartis.com/sites/novartis_com/files/styles/crop_freeform/public/2021-09/novartis-institute-for-tropical-diseases-lrg.jpg.webp?itok=kgwbdFIX",
    title: "Tropical Diseases",
    description: "Research on tropical diseases at Novartis Institute."
  }
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <motion.img
        key={currentIndex}
        src={images[currentIndex].url}
        alt={images[currentIndex].title}
        className="w-full h-64 object-cover"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black to-transparent p-4">
        <h3 className="text-white text-xl font-bold">{images[currentIndex].title}</h3>
        <p className="text-white text-sm">{images[currentIndex].description}</p>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
