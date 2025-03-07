import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4C5kFRo9QytZv8VRQ1s736dCcNaXYe2OnMAlhW",
    title: "Mpox (Monkeypox) Resurgence In 2024",
    description: "Mpox reemerged, affecting regions previously unexposed. The disease spread rapidly in crowded areas, leading to numerous cases and fatalities. Communities grappled with containment efforts amidst public concern.",
    source: "https://sparkinlist.com/lifestyle/health/top-10-deadly-diseases-of-2024/?utm_source=chatgpt.com"
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4Cx2g9ypSphvWlDsj6mJEzHn13OYM0yaFRxbqQ",
    title: "Bird Flu (H5N1) Throughout 2024",
    description: "H5N1 bird flu infected 66 individuals in the U.S., resulting in one death. The virus's high mortality rate in humans raised alarms about potential pandemics. Global health authorities intensified surveillance and response measures.",
    source: "https://www.usnews.com/news/health-news/articles/2025-01-02/5-infectious-diseases-to-keep-an-eye-on-in-2025?utm_source=chatgpt.com"
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4CqLpw8ArOqWpE0dz4j5VCtgwRcMav8UQn1ZLu",
    title: "Dengue Fever In 2024",
    description: "Dengue fever cases soared globally, with over 12 million reported—the highest annual count on record. The surge overwhelmed healthcare systems, especially in endemic regions. Preventive measures became crucial to control mosquito populations.",
    source: "https://www.cdc.gov/global-health/annual-report-2024/outbreaks.html?utm_source=chatgpt.com"
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4C5Gj6hwhQytZv8VRQ1s736dCcNaXYe2OnMAlh",
    title: "Tuberculosis (TB) Surge in Kansas",
    description: "Kansas experienced a TB outbreak with 67 active cases, marking the largest in the U.S. since the 1950s. The rapid increase puzzled health officials, who struggled to identify the outbreak's source. Intensive efforts were initiated to control the spread.",
    source: "https://en.wikipedia.org/wiki/2024%E2%80%932025_Kansas_tuberculosis_outbreak?utm_source=chatgpt.com"
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4CtPpzbI76gDf3rd05L1cl4zemHOUwsnvSWjuG",
    title: "Valley Fever (Coccidioidomycosis)",
    description: "Climate change in 2024 led to increased cases of Valley fever, a fungal infection from soil in arid regions. The disease's spread beyond traditional areas caught many off guard. Underdiagnosis remained a challenge due to symptom overlap with other respiratory infections.",
    source: "https://www.vox.com/future-perfect/401242/valley-fever-infectious-diseases-climate-change?utm_source=chatgpt.com"
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4Cdm3Qy0Ww1Trj6mGb0YcRsFZfkxqINVEDWJpM",
    title: "Marburg Virus Disease Marburg virus outbreaks in 2024",
    description: "With rapid progression from symptom onset to death. The disease's hemorrhagic nature terrified affected communities. International support was crucial in managing the crisis.",
    source: "https://www.thehealthsite.com/photo-gallery/10-deadliest-disease-outbreaks-of-2024-mpox-ebola-dancing-disease-dinga-dinga-mystery-illness-pandemic-lockdown-virus-1163778/?utm_source=chatgpt.com"
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4CtLqrEV76gDf3rd05L1cl4zemHOUwsnvSWjuG",
    title: "Ebola Virus Disease Ebola outbreaks in 2024",
    description: "Ebola outbreaks in 2024 led to numerous cases and deaths, particularly in West Africa. Fear and stigma surrounded affected individuals and communities. Global health responses focused on containment and support for survivors.",
    source: "https://www.thehealthsite.com/photo-gallery/10-deadliest-disease-outbreaks-of-2024-mpox-ebola-dancing-disease-dinga-dinga-mystery-illness-pandemic-lockdown-virus-1163778/?utm_source=chatgpt.com"
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4CjNANaK4dzPAZuSDFcQ7Bk04VCRTGWswga8NL",
    title: "Norovirus Outbreaks In early 2025",
    description: "Norovirus infections spiked, leading to widespread gastroenteritis. The highly contagious nature of the virus resulted in numerous outbreaks in communal settings. Preventive measures like hand hygiene were emphasized to curb transmission.",
    source: "https://www.health.com/quad-demic-winter-viruses-8771332?utm_source=chatgpt.com"
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4C8JIkoYyb5tRgalKN6MzFYu124VDsm3ykTqfE",
    title: "Unidentified Illness in the Democratic Republic of the Congo (DRC)",
    description: "In early 2025, the DRC faced an outbreak of an unidentified illness, resulting in over 1,000 cases and 60 deaths. Rapid disease progression posed significant challenges for healthcare workers. Ongoing investigations aimed to identify the pathogen and control the outbreak.",
    source: "https://en.wikipedia.org/wiki/2025_disease_outbreak_in_the_Democratic_Republic_of_the_Congo?utm_source=chatgpt.com"
  },
  {
    url: "https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4C0ueG062x9jXPmHibMuL4yYweCtZaScGQV2A3",
    title: "Measles Outbreaks",
    description: "Measles Outbreaks Declining vaccination rates in 2024 led to a surge in measles cases, with over 280 reported in the U.S. Unvaccinated children were particularly vulnerable, facing severe complications. Health officials emphasized the importance of immunization to prevent outbreaks.",
    source: "https://www.usnews.com/news/health-news/articles/2025-01-02/5-infectious-diseases-to-keep-an-eye-on-in-2025?utm_source=chatgpt.com"
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
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
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

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black to-transparent p-4">
        <h3 className="text-white text-xl font-bold">{images[currentIndex].title}</h3>
        <p className="text-white text-sm">{images[currentIndex].description}</p>
        <p className="text-white text-xs mt-2"> Source:{" "} <a href={images[currentIndex].source} target="_blank"
          rel="noopener noreferrer"
          className="underline">
          Click here</a>
        </p>
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
