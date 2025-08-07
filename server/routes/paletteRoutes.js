import express from 'express';
import { generatePalettes, getAllPalettes } from '../controllers/paletteController.js';
import { protectUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to generate palettes based on a prompt
router.post('/generate', protectUser, generatePalettes);

// Route to get all palettes
router.get('/allPalettes', getAllPalettes);

export default router;
