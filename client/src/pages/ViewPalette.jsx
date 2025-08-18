import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaEye, FaHeart, FaMagic, FaPalette, FaRegClipboard, FaThLarge } from "react-icons/fa";

const ViewPalette = () => {
    const { id } = useParams();
    const { getPaletteById } = useContext(AppContext);
    const [palette, setPalette] = useState(null);

    const navigate = useNavigate();

    const fetchPaletteById = async () => {
        try {
        const data = await getPaletteById(id);
        if (data) {
            setPalette(data);
        }
        } catch (error) {
        console.error("Error fetching palette:", error);
        }
    };

    useEffect(() => {
        fetchPaletteById();
    }, [id, getPaletteById]);

    if (!palette) return <p>Loading...</p>;

    return (
        <div className="w-full h-screen flex flex-col pt-2">
            {/* Toolbar */}
            <div className="flex justify-center items-center gap-6 py-4 bg-white shadow-md">
                <button className="text-gray-600 hover:text-blue-500 text-xl">
                    <FaEye />
                </button>
                <button className="text-gray-600 hover:text-red-500 text-xl">
                    <FaHeart />
                </button>
                <button className="text-gray-600 hover:text-green-500 text-xl" onClick={() => navigate("/generate")}>
                    <FaMagic />
                </button>
            </div>

            {/* Palette Visualization */}
            <div className="flex flex-1">
                {palette.colors.map((color, idx) => (
                    <div key={idx} className="group relative flex-1 flex items-center justify-center" style={{ backgroundColor: color }}>
                        {/* Hex code */}
                        <span className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-xl font-bold drop-shadow-lg">
                            {color.toUpperCase()}
                        </span>

                        {/* Hover Icons */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaPalette className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" />
                            <FaRegClipboard className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" />
                            <FaHeart className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" />
                            <FaThLarge className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewPalette;
