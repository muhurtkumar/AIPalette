import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaEye, FaHeart, FaMagic, FaPalette, FaRegClipboard, FaThLarge, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const ViewPalette = () => {
    const { id } = useParams();
    const { getPaletteById, saveColor, savePalette } = useContext(AppContext);
    const [palette, setPalette] = useState(null);

    // modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [isShadesModalOpen, setIsShadesModalOpen] = useState(false);
    const [shades, setShades] = useState([]);

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

    const copyToClipboard = async (color) => {
        try {
            await navigator.clipboard.writeText(color);
            toast.success(`${color.toUpperCase()} copied to clipboard!`);
        } catch (err) {
            console.error("Failed to copy: ", err);
            toast.error("Failed to copy color code");
        }
    };

    // open modal with selected color
    const openEditModal = (color, index) => {
        setSelectedColor(color);
        setSelectedIndex(index);
        setIsModalOpen(true);
    };

    // update color locally
    const handleUpdateColor = (newColor, closeModal) => {
        if (selectedIndex !== null) {
            const updatedPalette = { ...palette };
            updatedPalette.colors[selectedIndex] = newColor;
            setPalette(updatedPalette);
        }
        if (closeModal) closeModal(false);
    };

    const generateShades = (hex, steps = 10) => {
        const shadesArr = [];
        const normalizeHex = hex.replace("#", "");
        let r = parseInt(normalizeHex.substring(0, 2), 16);
        let g = parseInt(normalizeHex.substring(2, 4), 16);
        let b = parseInt(normalizeHex.substring(4, 6), 16);

        for (let i = 1; i <= steps; i++) {
            // lighten
            const nr = Math.min(255, r + (255 - r) * (i / steps));
            const ng = Math.min(255, g + (255 - g) * (i / steps));
            const nb = Math.min(255, b + (255 - b) * (i / steps));
            shadesArr.unshift(
                "#" +
                    Math.round(nr).toString(16).padStart(2, "0") +
                    Math.round(ng).toString(16).padStart(2, "0") +
                    Math.round(nb).toString(16).padStart(2, "0")
            );

            // darken
            const dr = r * (1 - i / steps);
            const dg = g * (1 - i / steps);
            const db = b * (1 - i / steps);
            shadesArr.push(
                "#" +
                    Math.round(dr).toString(16).padStart(2, "0") +
                    Math.round(dg).toString(16).padStart(2, "0") +
                    Math.round(db).toString(16).padStart(2, "0")
            );
        }
        return shadesArr;
    };

    if (!palette) return <p>Loading...</p>;

    return (
        <div className="w-full h-screen flex flex-col pt-2">
            {/* Toolbar */}
            <div className="flex justify-center items-center gap-6 py-4 bg-white shadow-md">
                <button className="text-gray-600 hover:text-blue-500 text-xl">
                    <FaEye />
                </button>
                <button className="text-gray-600 hover:text-red-500 text-xl" onClick={() => savePalette({ paletteId: palette._id, colors: palette.colors })}>
                    <FaHeart />
                </button>
                <button className="text-gray-600 hover:text-green-500 text-xl" onClick={() => navigate("/generate")}>
                    <FaMagic />
                </button>
            </div>

            {/* Palette Visualization */}
            <div className="flex flex-1 flex-col lg:flex-row">
                {palette.colors.map((color, idx) => (
                    <div key={idx} className="group relative flex-1 flex items-center justify-center" style={{ backgroundColor: color }}>
                        {/* Hex code */}
                        <span className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-xl font-bold drop-shadow-lg">
                            {color.toUpperCase()}
                        </span>

                        <div className="absolute inset-0 flex flex-row lg:flex-col items-center justify-center gap-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <FaPalette className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" onClick={() => openEditModal(color, idx)} />
                            <FaRegClipboard className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" onClick={() => copyToClipboard(color)} />
                            <FaHeart className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" onClick={() => saveColor(color)} />
                            <FaThLarge className="text-white text-xl cursor-pointer hover:scale-110 transition-transform"
                                onClick={() => {
                                    setSelectedIndex(idx);
                                    setShades(generateShades(color));
                                    setIsShadesModalOpen(true);
                                }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Color Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 p-2 rounded-md text-gray-600 hover:text-white hover:bg-red-400 transition cursor-pointer">
                            <FaTimes size={18} />
                        </button>
                        <h2 className="text-lg font-bold mb-4">Select Color:</h2>
                        <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="w-full h-12 rounded cursor-pointer mb-4"/>

                        <label className="block text-sm font-medium mb-2">Or Enter HEX:</label>
                        <input type="text" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="border p-2 w-full rounded mb-4" />
                        <button onClick={() => handleUpdateColor(selectedColor, setIsModalOpen)} className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600">
                            Update Color
                        </button>
                    </div>
                </div>
            )}
            {/* Shades Modal */}
            {isShadesModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[700px] max-h-[500px] overflow-y-auto relative">
                        <button onClick={() => setIsShadesModalOpen(false)} className="absolute top-3 right-3 p-2 rounded-md text-gray-600 hover:text-white hover:bg-red-400 transition cursor-pointer">
                            <FaTimes size={18} />
                        </button>
                        <div className="p-4 border-b border-gray-300">
                            <h2 className="text-lg font-bold">Select A Shade</h2>
                        </div>
                        {/* Shades */}
                        <div className="flex flex-col">
                            {shades.map((shade, idx) => (
                                <div key={idx} className="w-full py-1 flex justify-center cursor-pointer hover:opacity-80" style={{ backgroundColor: shade }} onClick={() => {handleUpdateColor(shade, setIsShadesModalOpen);}} >
                                    <span className="text-sm font-semibold drop-shadow-md text-white">
                                        {shade.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewPalette;
