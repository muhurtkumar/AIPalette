import React from "react";
import ColorPaletteBlock from "../components/ColorPaletteBlock.jsx";
import { FaHeart, FaEye, FaDownload, FaPalette } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading.jsx";

const Explore = () => {
    
    const { backendUrl } = useContext(AppContext);

    const [palettes, setPalettes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPalettes = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/palettes/allPalettes');
            setPalettes(res.data.palettes);
        } catch (err) {
            console.error("Failed to fetch palettes:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPalettes();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-black mb-4">
                Explore Trending AI Generated Palettes
            </h1>
            <p className="text-center text-gray-600 mb-10 text-lg">
                Explore unique palettes crafted by AI — fuel your imagination and start building!
            </p>
            {loading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {palettes.map((palette, idx) => (
                        <div key={idx} className="flex flex-col items-center w-full max-w-[300px] mx-auto">
                            <ColorPaletteBlock colors={palette.colors} />
                            <div className="flex justify-between items-center w-full mt-3 text-gray-600 text-sm px-4">
                                {/* Left-aligned Like */}
                                <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                                    <FaHeart />
                                    <span>{palette.likes || 0}</span>
                                </div>
                                {/* Right-aligned icons */}
                                <div className="flex items-center gap-4">
                                    <div className="hover:text-blue-500 cursor-pointer">
                                    <FaEye />
                                    </div>
                                    <div className="hover:text-blue-500 cursor-pointer">
                                    <FaPalette />
                                    </div>
                                    <div className="hover:text-green-500 cursor-pointer">
                                    <FaDownload />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Explore;
