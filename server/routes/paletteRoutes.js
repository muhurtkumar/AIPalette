import express from 'express';
import { generatePalettes } from '../controllers/paletteController.js';
import { protectUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to generate palettes based on a prompt
router.post('/generate', protectUser, generatePalettes);

export default router;
