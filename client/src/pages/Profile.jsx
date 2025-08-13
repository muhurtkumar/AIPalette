import React, { useEffect, useState } from "react";
import ColorPaletteBlock from "../components/ColorPaletteBlock";
import { FiEye } from "react-icons/fi";

const Profile = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        savedColors: ["#FF5733", "#3498DB", "#2ECC71", "#F1C40F"],
        savedPalettes: [
        ["#FF5733", "#FF8D1A", "#FFC300", "#DAF7A6", "#FF8D1A"],
        ["#3498DB", "#2ECC71", "#1ABC9C", "#9B59B6", "#FF8D1A"]
        ]
    });

    useEffect(() => {
        // Future API call to fetch profile data
    }, []);

    const handleRemoveColor = (colorToRemove) => {
        setUser((prevUser) => ({
        ...prevUser,
        savedColors: prevUser.savedColors.filter((color) => color !== colorToRemove)
        }));
    };

    const handleRemovePalette = (paletteIndex) => {
        setUser((prevUser) => ({
        ...prevUser,
        savedPalettes: prevUser.savedPalettes.filter(
            (_, idx) => idx !== paletteIndex
        ),
        }));
    };

    return (
        <div className="min-h-screen px-6 py-12">
            <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-gray-100">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-800">{user.name}</h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Saved Colors */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-5">🎨 Saved Colors</h2>
                    <div className="flex flex-wrap gap-6">
                        {user.savedColors.map((color, index) => (
                            <div key={index} className="relative flex flex-col items-center group cursor-pointer bg-white rounded-xl shadow p-3 border border-gray-200">
                                {/* Color Block */}
                                <div
                                className="w-16 h-16 rounded-lg shadow-lg border border-gray-200 transition-transform transform group-hover:scale-110"
                                style={{ backgroundColor: color }}
                                ></div>

                                {/* Tooltip for Color Code */}
                                <div className="absolute bottom-20 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg pointer-events-none">
                                    {color}
                                </div>

                                {/* Remove Button */}
                                <button onClick={() => handleRemoveColor(color)} className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"> Remove </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Saved Palettes */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-5">🖌 Saved Palettes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {user.savedPalettes.map((palette, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col gap-3 hover:shadow-xl transition-shadow">
                                {/* Palette using ColorPaletteBlock */}
                                <ColorPaletteBlock colors={palette} height="h-20" />

                                {/* Buttons */}
                                <div className="flex gap-2">
                                    <button onClick={() => handleRemovePalette(index)} className="flex-1 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors cursor-pointer">
                                        Remove
                                    </button>
                                    <button className="flex-1 py-2 text-sm font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer">
                                        Palette
                                    </button>
                                    <button className="flex-1 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer">
                                        Visualize <FiEye size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
