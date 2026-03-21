import express from "express";
const router = express.Router();
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from "../src/config/controller/movieController.js";
import { protect } from "../src/middleware/authMiddleware.js";



// movie routes

router.post("/", protect, createMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.put("/:id", protect, updateMovie);
router.delete("/:id", protect, deleteMovie);



export default router;