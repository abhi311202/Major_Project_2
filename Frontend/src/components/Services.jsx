import React, { useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const services = [
  {
    title: "Summarization",
    heading: "Summarize your Documents.",
    description: "",
  },
  {
    title: "Classification",
    heading: "Classify your Documents.",
    description: "",
  },
  { title: "Search", heading: "Advance Document Search.", description: "" },
  {
    title: "Entity Extraction",
    heading: "Extract Entities of Documents.",
    description: "",
  },
  {
    title: "Metadata Extraction",
    heading: "Extract Metadata of Documents.",
    description: "",
  },
  {
    title: "Text to Voice Support",
    heading: "Text to Voice of Documents.",
    description: "",
  },
  {
    title: "Language Support",
    heading: "Language Translation.",
    description: "",
  },
];

export const Services = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-red-200 to-green-300 py-16 w-full relative">
      <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-12">
        Our Features
      </h2>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-pink-800 transition"
      >
        <FiArrowLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-pink-800 transition"
      >
        <FiArrowRight />
      </button>

      {/* Card Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden scroll-smooth no-scrollbar px-4 md:px-8"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group rounded-3xl transition-transform duration-300 hover:scale-105"
          >
            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-300 to-indigo-400 opacity-0 group-hover:opacity-100 transition duration-300 z-0"></div>

            {/* Inner card */}
            <div className="relative z-10 w-[350px] h-[350px] flex-shrink-0 bg-indigo text-indigo-900 rounded-3xl p-8 shadow-xl">
              <p className="uppercase text-sm font-medium tracking-wide mb-2 text-black">
                {service.title}
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                {service.heading}
              </h3>
              <p className="text-md md:text-lg mb-6 text-black">
                {service.description}
              </p>
              <button className="group flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-purple-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500">
                Learn More
                <FiArrowUpRight className="opacity-0 group-hover:opacity-100 translate-x-1 transition duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};