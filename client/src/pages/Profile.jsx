import React, { useEffect, useContext } from "react";
import ColorPaletteBlock from "../components/ColorPaletteBlock";
import { FiEye } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
    const { userData, fetchUserData, userToken, backendUrl, setUserData } = useContext(AppContext);

    useEffect(() => {
        if (!userData) {
            fetchUserData();
        }
    }, [userData, fetchUserData]);

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    const handleRemoveColor = (colorToRemove) => {
        setUser((prevUser) => ({
        ...prevUser,
        savedColors: prevUser.savedColors.filter((color) => color !== colorToRemove)
        }));
    };

    const handleRemovePalette = async (paletteId) => {
        if (!userToken) {
            toast.error("You must be logged in to remove palettes");
            return;
        }
        try {
            const { data } = await axios.delete(backendUrl + `/api/palettes/delete/${paletteId}`, {
                headers: { token: userToken }
            });

            if (data.success) {
                setUserData((prev) => ({
                    ...prev,
                    savedPalettes: prev.savedPalettes.filter((p) => p._id !== paletteId),
                }));
                toast.success(data.message);
            } 
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="min-h-screen px-6 py-12">
            <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-gray-100">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {userData.name?.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-800">{userData.name}</h1>
                            <p className="text-gray-500">{userData.email}</p>
                        </div>
                    </div>
                </div>

                {/* Saved Colors */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-5">🎨 Saved Colors</h2>
                    <div className="flex flex-wrap gap-6">
                        {userData.savedColors?.map((color, index) => (
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
                        {userData.savedPalettes?.map((palette, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col gap-3 hover:shadow-xl transition-shadow">
                                {/* Palette using ColorPaletteBlock */}
                                <ColorPaletteBlock colors={palette.colors} height="h-20" />

                                {/* Buttons */}
                                <div className="flex gap-2">
                                    <button onClick={() => handleRemovePalette(palette._id)} className="flex-1 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors cursor-pointer">
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
