import express from 'express';
import { generatePalettes, getAllPalettes, savePalette, deleteSavedPalette, getPaletteById, saveColor, deleteColor } from '../controllers/paletteController.js';
import { protectUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to generate palettes based on a prompt
router.post('/generate', protectUser, generatePalettes);

// Route to get all palettes
router.get('/allPalettes', getAllPalettes);

// Route to save a palette to user's savedPalettes
router.post('/save', protectUser, savePalette);

// Route to delete a saved palette
router.delete('/delete/:paletteId', protectUser, deleteSavedPalette);

// Route to get a palette by ID
router.get('/palette/:id', getPaletteById);

// Route to save a color to user's savedColors
router.post('/color/save', protectUser, saveColor);

// Route to delete a color from user's savedColors
router.delete('/color/delete', protectUser, deleteColor);

export default router;
