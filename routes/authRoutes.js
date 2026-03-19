// routes/authRoutes.js
import express from "express";
const router = express.Router();

import { validate } from "../src/middleware/validate.js";
import { registerSchema, loginSchema } from "../src/config/validation/authSchema.js";

// Import controllers
import { register, login, logout, getProfile } from "../src/config/controller/authController.js";

// Import middleware
// import { protect } from "../src/config/middleware/authMiddleware.js";

// Auth routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
// router.get("/profile", protect, getProfiles);

export default router;