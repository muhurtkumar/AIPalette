import React from "react";

const ColorPaletteBlock = ({ colors, height = "h-25" }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 w-full">
      <div className="flex">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`relative flex-1 ${height} group cursor-pointer`}
            style={{ backgroundColor: color }}
          >
            {/* Hover Tooltip */}
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              {color}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteBlock;
