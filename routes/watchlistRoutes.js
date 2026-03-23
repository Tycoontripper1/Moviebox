// watxhlist routes

import express from "express";
const router = express.Router();

import { addMovieToWatchlist, getWatchlist, updateWatchlistItem, deleteWatchlistItem, getWatchlistStats } from "../src/config/controller/watchlistController.js";
import { protect } from "../src/middleware/authMiddleware.js";

router.get("/stats", protect, getWatchlistStats);
router.post("/add", protect, addMovieToWatchlist);
router.get("/", protect, getWatchlist);
router.patch("/:id", protect, updateWatchlistItem);
router.delete("/:id", protect, deleteWatchlistItem);

export default router; 