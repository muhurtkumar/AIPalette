import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";

// Function to lighten a hex color
const lightenColor = (hex, percent) => {
    try {
        const num = parseInt(hex.replace("#", ""), 16);
        const r = Math.min(255, (num >> 16) + (255 - (num >> 16)) * percent);
        const g = Math.min(
            255,
            ((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * percent
        );
        const b = Math.min(
            255,
            (num & 0x0000ff) + (255 - (num & 0x0000ff)) * percent
        );
        return `rgb(${r}, ${g}, ${b})`;
    } catch {
        return hex;
    }
};

// Function to choose text color based on background brightness
const getTextColor = (bg) => {
    try {
        const hex = bg.replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? "text-gray-900" : "text-white";
    } catch {
        return "text-gray-900";
    }
};

const VisualizePalette = () => {
    const { paletteId } = useParams();
    const { getPaletteById } = useContext(AppContext);

    const [palette, setPalette] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPaletteById = async () => {
        setLoading(true);
        const result = await getPaletteById(paletteId);
        setPalette(result);
        setLoading(false);
    };

    useEffect(() => {
        fetchPaletteById();
    }, [paletteId, getPaletteById]);

    if (loading) {
        return <Loading />;
    }

    if (!palette) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-lg text-gray-500">Palette not found</p>
            </div>
        );
    }

    // Assign colors with fallbacks
    const [c1, c2, c3, c4, c5] = [
        palette.colors[0] || "#111827", // header
        palette.colors[1] || "#1F2937", // sidebar
        palette.colors[2] || "#374151", // cards / pie segment
        palette.colors[3] || "#4B5563", // footer
        palette.colors[4] || "#6B7280", // dashboard background
    ];

    // Slightly lighter variant of c5 for cards (25%)
    const cardColor = lightenColor(c5, 0.25);

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
                Live Palette Preview
            </h1>

            {/* === Dashboard Mock === */}
            <div className="w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden" style={{ backgroundColor: c5 }}>
                {/* Header */}
                <header className={`p-4 font-extrabold text-lg flex items-center ${getTextColor(c1)}`} style={{ backgroundColor: c1 }}>
                    AIPalette
                </header>

                <div className="flex flex-col sm:flex-row">
                    {/* Sidebar */}
                    <aside className={`w-full sm:w-1/5 min-h-[200px] sm:min-h-[400px] p-5 space-y-4 font-medium ${getTextColor(c2)}`} style={{ backgroundColor: c2 }}>
                        <p>Dashboard</p>
                        <p>Reports</p>
                        <p>Settings</p>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-6 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Card 1 - Bar Chart Mock */}
                            <div className="p-4 rounded-xl shadow-md text-gray-900" style={{ backgroundColor: cardColor }}>
                                <h2 className="font-bold mb-4">Monthly Visitors</h2>
                                <div className="flex items-end justify-between h-32">
                                    {[c1, c2, c3, c4, c5].map((color, idx) => (
                                        <div key={idx} className="flex-1 mx-1 rounded"
                                            style={{
                                                backgroundColor: color,
                                                height: `${40 + idx * 10}%`,
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 2 - Pie Chart Mock */}
                            <div className="p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-gray-900" style={{ backgroundColor: cardColor }}>
                                <h2 className="font-bold mb-4">User Segments</h2>
                                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                                    {/* Pie with c1, c2, and c3 */}
                                    <div className="absolute inset-0"
                                        style={{
                                            background: `conic-gradient(${c1} 0% 33%, ${c2} 33% 66%, ${c3} 66% 100%)`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Project Summary */}
                        <div className="p-4 rounded-xl shadow-md text-gray-900" style={{ backgroundColor: cardColor }}>
                            <h2 className="font-bold mb-2">Project Summary</h2>
                            <p className="text-sm">
                                This layout gives a clean visual preview of your selected palette. Each component (header, sidebar, charts, footer, background, cards) uses a unique color to demonstrate how your theme might look in a real dashboard.
                            </p>
                        </div>
                    </main>
                </div>

                {/* Footer */}
                <footer className={`p-3 text-center text-sm ${getTextColor(c4)}`} style={{ backgroundColor: c4 }}>
                    © AIPalette Dashboard
                </footer>
            </div>

            {/* === Palette Preview === */}
            <div className="flex gap-3 mt-8 flex-wrap justify-center">
                {palette.colors.map((color, idx) => (
                    <div key={idx} className="w-16 h-16 rounded-lg shadow border" style={{ backgroundColor: color }}></div>
                ))}
            </div>
        </div>
    );
};

export default VisualizePalette;
