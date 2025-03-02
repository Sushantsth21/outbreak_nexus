import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4C5kFRo9QytZv8VRQ1s736dCcNaXYe2OnMAlhW",
    title: "Mpox (Monkeypox) Resurgence In 2024",
    description: "Mpox reemerged, affecting regions previously unexposed. The disease spread rapidly in crowded areas, leading to numerous cases and fatalities. Communities grappled with containment efforts amidst public concern.",
    source: "https://sparkinlist.com/lifestyle/health/top-10-deadly-diseases-of-2024/?utm_source=chatgpt.com",
    fullDescription: "Mpox (Monkeypox) had a significant resurgence in 2024, primarily affecting communities that were previously unexposed. Its rapid spread was facilitated by densely packed environments where containment measures struggled to keep pace. This resurgence prompted global health agencies to reevaluate preparedness and response strategies."
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4Cx2g9ypSphvWlDsj6mJEzHn13OYM0yaFRxbqQ",
    title: "Bird Flu (H5N1) Throughout 2024",
    description: "H5N1 bird flu infected 66 individuals in the U.S., resulting in one death. The virus's high mortality rate in humans raised alarms about potential pandemics. Global health authorities intensified surveillance and response measures.",
    source: "https://www.usnews.com/news/health-news/articles/2025-01-02/5-infectious-diseases-to-keep-an-eye-on-in-2025?utm_source=chatgpt.com",
    fullDescription: "The H5N1 bird flu outbreak in 2024 raised global concern due to its high mortality rate in humans. A total of 66 reported infections in the U.S. resulted in one death, but its potential for a larger-scale pandemic led to swift action by global health authorities to enhance monitoring, prevention, and vaccine development."
  },
  // You can add other disease objects here following the same structure
];

export default function DiseaseDetails() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Top Deadly Diseases in 2024</h1>
      
      {/* Image Slider */}
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg min-h-[45vh]">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          className="w-full h-80 object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        />

        {/* Slide Controls */}
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

      {/* Disease Details */}
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-gray-800">{images[currentIndex].title}</h3>
        <p className="mt-2 text-lg text-gray-700">{images[currentIndex].description}</p>
        <p className="mt-4 text-sm text-gray-500">Source:{" "}
          <a href={images[currentIndex].source} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
            Click here
          </a>
        </p>
      </div>

      {/* Full Description */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h4 className="text-xl font-semibold text-gray-800">Full Description:</h4>
        <p className="mt-2 text-gray-700">{images[currentIndex].fullDescription}</p>
      </div>
    </div>
  );
}
