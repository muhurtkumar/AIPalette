import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import upload from '../config/multer.js';

const router = express.Router();

// Register a new user
router.post('/register', upload.single('image'), registerUser);

// Login a user
router.post('/login', loginUser)

export default router;
