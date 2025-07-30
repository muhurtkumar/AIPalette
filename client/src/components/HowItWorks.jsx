import React from "react";
import { FaCommentDots, FaMagic, FaPalette, FaSave } from "react-icons/fa";

const steps = [
  {
    icon: <FaCommentDots className="text-indigo-600 text-2xl" />,
    title: "Describe Your Vibe",
    description:
      "Tell the AI what you're going for—vibrant summer tones, dark cyberpunk theme, or pastel tech startup—in a simple prompt.",
  },
  {
    icon: <FaMagic className="text-indigo-600 text-2xl" />,
    title: "Generate Your Palette",
    description:
      "With a single click, AIPalette uses AI to create a stunning 5-color palette based on your input.",
  },
  {
    icon: <FaPalette className="text-indigo-600 text-2xl" />,
    title: "Visualize Your Palette",
    description:
      "Preview your palette on sample UI components and layouts to see how it would look in real-world design scenarios.",
  },
  {
    icon: <FaSave className="text-indigo-600 text-2xl" />,
    title: "Save & Reuse",
    description:
      "Save your favorite palettes to your dashboard or download them to use in your projects right away.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 2xl:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          How Does AIPalette Work?
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-neutral-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition duration-300"
              >
                {/* Step Number */}
                <div className="hidden sm:flex absolute -top-4 -left-4 bg-indigo-600 text-white font-bold w-8 h-8 items-center justify-center rounded-full shadow-md">
                    {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-4 flex justify-center">{step.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mt-2 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
