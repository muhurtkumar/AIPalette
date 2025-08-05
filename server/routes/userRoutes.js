import express from 'express';
import { registerUser } from '../controllers/userController.js';
import upload from '../config/multer.js';

const router = express.Router();

// Register a new user
router.post('/register', upload.single('image'), registerUser);

export default router;
