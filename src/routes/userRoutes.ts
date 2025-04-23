import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Register user
router.post('/', registerUser);

// Login user
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', protect, getUserProfile);

export default router; 