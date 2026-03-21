// movie controller

import { prisma } from "../db.js";

// create movie
export const createMovie = async (req, res) => {
    try {
        const { title, overview, genres, runtime, posterurl, releaseYear } = req.body;
        const movie = await prisma.movie.create({
            data: {
                title,
                overview,
                genres,
                runtime,
                posterurl,
                releaseYear,
            },
        });
        res.status(201).json(movie);
    } catch (error) {
        console.error("Error creating movie:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// get all movies
export const getAllMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany();
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error getting movies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// get movie by id
export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await prisma.movie.findUnique({
            where: { id },
        });
        res.status(200).json(movie);
    } catch (error) {
        console.error("Error getting movie:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// update movie
export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, overview, genres, runtime, posterurl, releaseYear } = req.body;
        const movie = await prisma.movie.update({
            where: { id },
            data: {
                title,
                overview,
                genres,
                runtime,
                posterurl,
                releaseYear,
            },
        });
        res.status(200).json(movie);
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// delete movie
export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await prisma.movie.delete({
            where: { id },
        });
        res.status(200).json(movie);
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
