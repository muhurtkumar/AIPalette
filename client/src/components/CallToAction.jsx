import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#f8f9ff] to-[#f2f4fd] p-10 rounded-3xl shadow-lg text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Ready to Design Smarter?
        </h2>
        <p className="text-lg text-gray-600 mb-8">Use AI to generate stunning, harmonious color palettes for your next project.</p>
        <Link to="/explore" className="inline-flex items-center bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200">
          Try AIPalette Now <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
