import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    // Validate password length
    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters long' });
      return;
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({ message: messages.join(', ') });
      return;
    }
    
    res.status(400).json({ message: error.message || 'Invalid user data' });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}; 