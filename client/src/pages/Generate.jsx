import React, { useState, useContext } from "react";
import ColorPaletteBlock from "../components/ColorPaletteBlock";
import { prompts } from "../assets/assets.js";
import { FaEye, FaDownload, FaPalette } from "react-icons/fa";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Generate = () => {

    const { userToken, backendUrl, savePalette, generatedPalettes, setGeneratedPalettes, generatedPrompt, setGeneratedPrompt } = useContext(AppContext);
    const navigate = useNavigate();

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter a prompt to generate!");
            return;
        }

        setLoading(true);
        setGeneratedPalettes([]);
        setGeneratedPrompt(prompt);

        try {
            const res = await axios.post(backendUrl + '/api/palettes/generate',
                { prompt },
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: userToken,
                    },
                }
            );

            const data = res.data;

            if (!data.success) {
                toast.error(data.message || "Failed to generate palettes");
                setLoading(false);
                return;
            }

            const extracted = data.palettes.map((p) => ({
                _id: p._id,
                colors: p.colors
            }));
            setGeneratedPalettes(extracted);
            toast.success("Palettes generated successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Server Error");
        } finally {
            setLoading(false);
        }
    };

    const handlePromptClick = (selectedPrompt) => {
        setPrompt(selectedPrompt);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black">
                Generate Your AI Palette
            </h1>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <input type="text" placeholder="Enter a theme (e.g., sunset, forest, sky, love etc.)" className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <button onClick={handleGenerate} disabled={loading} className={`text-white px-6 py-3 rounded-md transition ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                    {loading ? "Generating..." : "Generate"}
                </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-10 justify-center">
                {prompts.map((p, idx) => (
                    <button key={idx} onClick={() => handlePromptClick(p)} className="px-4 py-2 border border-blue-300 rounded-full text-sm hover:bg-blue-50 transition">
                        {p}
                    </button>
                ))}
            </div>

            {!loading && generatedPalettes.length > 0 && (
                <>
                    <p className="text-center text-gray-600 mb-4">
                        Showing results for: <strong>{generatedPrompt}</strong>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {generatedPalettes.map((palette, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <ColorPaletteBlock colors={palette.colors} />
                                <div className="flex justify-end items-center w-full mt-3 text-gray-600 text-sm px-4">
                                    <div className="flex items-center gap-4">
                                        <div className="hover:text-blue-500 cursor-pointer" onClick={() => navigate(`/visualize/${palette._id}`)}>
                                            <FaEye />
                                        </div>
                                        <div className="hover:text-blue-500 cursor-pointer" onClick={() => navigate(`/palette/${palette._id}`)}>
                                            <FaPalette />
                                        </div>
                                        <div className="hover:text-green-500 cursor-pointer" onClick={() => savePalette({ paletteId: palette._id })}>
                                            <FaDownload />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {loading && <p className="text-center text-gray-500">Generating palettes with AI...</p>}
        </div>
    );
};

export default Generate;
