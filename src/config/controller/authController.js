// auth controller

import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../middleware/generateToken.js";


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate inputs
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Please provide all required fields: name, email, password' 
            });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: 'User with this email already exists' 
            });
        }

        // Hash the password - make sure password is a string
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);

        // Create user in database
        const user = await prisma.user.create({
            data: {
                name: name.toString(),
                email: email.toString().toLowerCase(),
                password: hashedPassword 
            }
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Server error during registration',
            error: error.message 
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Please provide both email and password' 
            });
        }

        // Find user by email (case-insensitive)
        const user = await prisma.user.findUnique({
            where: { email: email.toString().toLowerCase() }
        });

        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password.toString(), 
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        const token = generateToken(user, res);
        res.status(200).json({
            message: 'Login successful',
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Server error during login',
            error: error.message 
        });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
    try {
        // In a real implementation, you would clear the session or token
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        res.status(200).json(user);
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
