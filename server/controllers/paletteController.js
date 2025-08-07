import { generateAIPalettes } from "../utils/genrateFromPrompt.js";
import Palette from "../models/Palette.js";

// Controller to generate palettes based on a prompt
export const generatePalettes = async (req, res) => {
    const { prompt } = req.body || {};
    const userId = req.user?._id; 

    if (!prompt) {
        return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    try {
        const palettes = await generateAIPalettes(prompt);

        if (!palettes || !Array.isArray(palettes)) {
            return res.status(500).json({ success: false, message: "AI failed to generate palettes" });
        }

        const savedPalettes = await Palette.insertMany(
            palettes.map((colors) => ({ colors, user: userId }))
        );

        return res.status(201).json({ success: true, palettes: savedPalettes });
    } catch (err) {
        console.error("Generation Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get all palettes sorted by likes
export const getAllPalettes = async (req, res) => {
    try {
        const palettes = await Palette.find()
        .sort({ likes: -1 });

        return res.status(200).json({
            success: true,
            count: palettes.length,
            palettes,
        });
    } catch (err) {
        console.error("Error fetching palettes:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch palettes",
        });
    }
};