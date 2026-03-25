// routes/authRoutes.js
import express from "express";
const router = express.Router();

import { validate } from "../src/middleware/validate.js";
import { registerSchema, loginSchema } from "../src/config/validation/authSchema.js";

// Import controllers
import { register, login, logout, getProfile, updateProfile } from "../src/config/controller/authController.js";
import { upload } from "../src/config/cloudinary.js";
import { protect } from "../src/middleware/authMiddleware.js";

// Import middleware
// import { protect } from "../src/config/middleware/authMiddleware.js";

// Auth routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
router.patch("/profile", protect, upload.single('avatar'), updateProfile);

export default router;