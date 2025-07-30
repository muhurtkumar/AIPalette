import React from "react";
import { FaBolt, FaDownload, FaMagic, FaCompass } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt className="text-indigo-600 text-3xl" />,
    title: "Design Faster",
    description:
      "No more wasting hours experimenting with color schemes. Let AI generate stunning palettes instantly so you can focus on creating, not tweaking.",
  },
  {
    icon: <FaMagic className="text-indigo-600 text-3xl" />,
    title: "Smart Color Detection",
    description: "Uses intelligent algorithms to pick the most relevant colors.",
  },
  {
    icon: <FaDownload className="text-indigo-600 text-3xl" />,
    title: "Download & Use",
    description: "Easily download your palette for personal or professional use.",
  },
  {
    icon: <FaCompass className="text-indigo-600 text-3xl" />,
    title: "Explore Endless Palettes",
    description:
      "Discover a wide range of AI-generated color palettes on the Explore page. Get inspired, find your perfect match, and make it yours.",
  },
];

const Features = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 2xl:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Powerful Features for Creators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-lg shadow p-6 text-center hover:shadow-md transition duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
