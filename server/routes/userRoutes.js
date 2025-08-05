import express from 'express';
import { registerUser, loginUser, getUserData } from '../controllers/userController.js';
import { protectUser } from '../middlewares/authMiddleware.js';
import upload from '../config/multer.js';

const router = express.Router();

// Register a new user
router.post('/register', upload.single('image'), registerUser);

// Login a user
router.post('/login', loginUser)

// Get user data
router.get('/user', protectUser, getUserData)

export default router;
