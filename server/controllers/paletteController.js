import { generateAIPalettes } from "../utils/genrateFromPrompt.js";
import Palette from "../models/Palette.js";
import User from "../models/User.js";

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

// Save palette to user's savedPalettes
export const savePalette = async (req, res) => {
    const { paletteId } = req.body;
    const userId = req.user?._id;

    if (!paletteId) {
        return res.status(400).json({ success: false, message: "Palette ID is required" });
    }

    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        // Check if palette exists
        const palette = await Palette.findById(paletteId);
        if (!palette) {
            return res.status(404).json({ success: false, message: "Palette not found" });
        }

        // Add palette to user's savedPalettes if not already saved
        const user = await User.findById(userId);
        if (user.savedPalettes.some(id => id.equals(paletteId))) {
            return res.status(400).json({ success: false, message: "Palette already saved" });
        }

        user.savedPalettes.push(paletteId);
        await user.save();

        return res.status(200).json({ 
            success: true,
            message: "Palette saved successfully",
            savedPalettes: user.savedPalettes
        });
    } catch (err) {
        console.error("Error saving palette:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
