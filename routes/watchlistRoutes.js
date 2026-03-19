// watxhlist routes

import express from "express";
const router = express.Router();

import { addMovieToWatchlist } from "../src/config/controller/watchlistController.js";
import { getWatchlist } from "../src/config/controller/watchlistController.js";
import { updateWatchlistItem } from "../src/config/controller/watchlistController.js";
import { deleteWatchlistItem } from "../src/config/controller/watchlistController.js";
import { protect } from "../src/middleware/authMiddleware.js";

router.post("/add", protect, addMovieToWatchlist);
router.get("/", protect, getWatchlist);
router.put("/:id", protect, updateWatchlistItem);
router.delete("/:id", protect, deleteWatchlistItem);

export default router; 