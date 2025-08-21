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
            palettes.map((colors) => ({ colors, user: null }))
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
        const palettes = await Palette.find({user: null})
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
    const { paletteId, colors } = req.body || {};
    if (!paletteId && !colors) {
        return res.status(400).json({ success: false, message: "paletteId or colors required" });
    }
    const userId = req.user._id;

    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        let finalColors;

        // CASE 1: Save from existing palette
        if (paletteId) {
            const original = await Palette.findById(paletteId);
            if (!original) {
                return res.status(404).json({ success: false, message: "Palette not found" });
            }
            finalColors = original.colors;
        }

        // CASE 2: Save edited/new palette
        if (colors?.length > 0) {
            finalColors = colors;
        }
        if (!finalColors?.length) {
            return res.status(400).json({ success: false, message: "No colors provided" });
        }

        const exists = await Palette.findOne({ user: userId, colors: finalColors });
        if (exists) {
            return res.status(400).json({ success: false, message: "Palette already saved" });
        }

        // Always create a fresh copy
        const newPalette = await Palette.create({
            user: userId,
            colors: finalColors,
        });

        await User.findByIdAndUpdate(userId, {
            $push: { savedPalettes: newPalette._id },
        });
        const updatedUser = await User.findById(userId).populate("savedPalettes");

        res.status(201).json({ success: true, message: "Palette saved successfully", user: updatedUser });
    } catch (error) {
        console.error("Save Palette Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteSavedPalette = async (req, res) => {
    try {
        const userId = req.user._id;
        const { paletteId } = req.params;

        const palette = await Palette.findOne({ _id: paletteId, user: userId });
        if (!palette) {
            return res.status(404).json({ message: "Palette not found" });
        }

        await User.findByIdAndUpdate(userId, {
            $pull: { savedPalettes: paletteId }
        });

        await Palette.findByIdAndDelete(paletteId);

        const updatedUser = await User.findById(userId).populate("savedPalettes");

        res.status(200).json({
            success: true,
            message: "Palette removed successfully",
            savedPalettes: updatedUser.savedPalettes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get a palette by ID
export const getPaletteById = async (req, res) => {
    const { id } = req.params;

    try {
        const palette = await Palette.findById(id);
        if (!palette) {
            return res.status(404).json({ success: false, message: "Palette not found" });
        }

        return res.status(200).json({ success: true, palette });
    } catch (error) {
        console.error("Error fetching palette:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Save color to user's savedColors
export const saveColor = async (req, res) => {
    try {
        const userId = req.user._id;
        const { color } = req.body || {};
        if (!color) {
            return res.status(400).json({ success: false, message: "Color is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        if(user.savedColors.includes(color)){
            return res.status(400).json({ success: false, message: "Color already saved" });
        }
        user.savedColors.push(color);
        await user.save();
        res.json({success: true, message: "Color saved successfully", savedColors: user.savedColors });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};