import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPalette, FaArrowRight } from "react-icons/fa";
import laptop from "../assets/laptop.svg"; // Update with your illustration


const Hero = () => {
  const navigate = useNavigate();


  return (
    <div className="container 2xl:px-20 mx-auto my-10">
    <section className="py-16 mx-2 rounded-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Side */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img src={laptop} alt="AI-generated color palette visualization" className="w-full max-w-md md:max-w-lg rounded-xl" />
        </div>
        {/* Right Side*/}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-800 mb-4">
            Unleash Creativity<br className="hidden md:block" />
            with AI Color Palettes
          </h1>
          <p className="text-gray-700 mb-6 max-w-md">
            Instantly generate stunning, harmonious palettes for any digital project. Let our AI inspire your next masterpiece—mix, remix, and save your favorites with ease.
          </p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => navigate("/generate")}
              className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 transition"
            >
              <FaPalette size={20} /> Try AI Palette
            </button>
            <button
              onClick={() => navigate("/explore")}
              className="bg-white border border-blue-200 hover:shadow-lg text-blue-700 px-7 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
            >
              Explore Gallery <FaArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};


export default Hero;