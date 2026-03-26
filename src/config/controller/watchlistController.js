// watchlist controller

import { prisma } from "../db.js";
import dotenv from "dotenv";
dotenv.config();


// @desc    Add movie to watchlist
// @route   POST /api/watchlist/add
// @access  Private
export const addMovieToWatchlist = async (req, res) => {
    try {
        const { movieId, title, posterPath, status, notes, rating } = req.body;
        const userId = req.user.id;

        const existingWatchlistItem = await prisma.watchlistItem.findUnique({
            where: {
                userId_movieId: {
                    userId,
                    movieId,
                },
            },
        });

        if (existingWatchlistItem) {
            return res.status(400).json({ message: "Movie already in watchlist" });
        }

        const watchlistItem = await prisma.watchlistItem.create({
            data: {
                userId,
                movieId,
                title,
                posterPath,
                status,
                notes,
                rating,
            },
        });

        res.status(201).json(watchlistItem);
    } catch (error) {
        console.error("Error adding movie to watchlist", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get watchlist
// @route   GET /api/watchlist
// @access  Private
export const getWatchlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const watchlist = await prisma.watchlistItem.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json(watchlist);
    } catch (error) {
        console.error("Error getting watchlist", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Update watchlist item
// @route   PATCH /api/watchlist/:movieId
// @access  Private
export const updateWatchlistItem = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { status, notes, rating } = req.body;
        const userId = req.user.id;

        const watchlist = await prisma.watchlistItem.update({
            where: {
                userId_movieId: { 
                    userId, 
                    movieId: parseInt(movieId)
                }
            },
            data: { status, notes, rating }
        });

        res.status(200).json(watchlist);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Watchlist item not found" });
        }
        console.error("Error updating watchlist item", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Delete watchlist item
// @route   DELETE /api/watchlist/:movieId
// @access  Private
export const deleteWatchlistItem = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userId = req.user.id;

        await prisma.watchlistItem.delete({
            where: {
                userId_movieId: {
                    userId,
                    movieId: parseInt(movieId),
                },
            },
        });

        res.status(200).json({ message: "Watchlist item deleted successfully" });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Watchlist item not found" });
        }
        console.error("Error deleting watchlist item", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get watchlist stats
// @route   GET /api/watchlist/stats
// @access  Private
export const getWatchlistStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const [total, watched, watching, wantToWatch, onHold, dropped] = await Promise.all([
            prisma.watchlistItem.count({ where: { userId } }),
            prisma.watchlistItem.count({ where: { userId, status: "COMPLETED" } }),
            prisma.watchlistItem.count({ where: { userId, status: "IN_PROGRESS" } }),
            prisma.watchlistItem.count({ where: { userId, status: "PLANNED" } }),
            prisma.watchlistItem.count({ where: { userId, status: "ON_HOLD" } }),
            prisma.watchlistItem.count({ where: { userId, status: "DROPPED" } }),
        ]);

        res.status(200).json({
            total,
            watched,
            watching,
            wantToWatch,
            onHold,
            dropped,
        });
    } catch (error) {
        console.error("Error getting watchlist stats", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Add movie to watchlist
// @route   POST /api/watchlist/add
// @access  Private
// export const addMovieToWatchlist = async (req, res) => {
//     try {
//         const { movieId, status, notes, rating } = req.body;
//         const userId = req.user.id;

//         const movie = await prisma.movie.findUnique({
//             where: { id: movieId },
//         });

//         if (!movie) {
//             return res.status(404).json({ message: "Movie not found" });
//         }

//         const existingWatchlistItem = await prisma.watchlistItem.findUnique({
//             where: {
//                 userId_movieId: {
//                     userId,
//                     movieId,
//                 },
//             },
//         });

//         if (existingWatchlistItem) {
//             return res.status(400).json({ message: "Movie already in watchlist" });
//         }

//         const watchlist = await prisma.watchlistItem.create({
//             data: {
//                 userId,
//                 movieId,
//                 status,
//                 notes,
//                 rating,
//             },
//         });

//         res.status(201).json(watchlist);
//     } catch (error) {
//         console.error("Error adding movie to watchlist", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };


// // @desc    Get watchlist
// // @route   GET /api/watchlist
// // @access  Private
// export const getWatchlist = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const watchlist = await prisma.watchlistItem.findMany({
//             where: { userId },
//             include: {
//                 movie: true,
//             },
//         });

//         res.status(200).json(watchlist);
//     } catch (error) {
//         console.error("Error getting watchlist", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // @desc    Update watchlist item
// // @route   PUT /api/watchlist/:id
// // @access  Private
// export const updateWatchlistItem = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status, notes, rating } = req.body;
//         const userId = req.user.id;

//         const watchlist = await prisma.watchlistItem.update({
//             where: {
//                 userId_movieId: { userId, movieId: id }
//             },
//             data: { status, notes, rating }
//         });

//         res.status(200).json(watchlist);

//     } catch (error) {
//         // Prisma throws this specific code when record not found
//         if (error.code === 'P2025') {
//             return res.status(404).json({ message: "Watchlist item not found" });
//         }
//         console.error("Error updating watchlist item", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // @desc    Delete watchlist item
// // @route   DELETE /api/watchlist/:id
// // @access  Private
// export const deleteWatchlistItem = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const userId = req.user.id;

//         // const existingWatchlistItem = await prisma.watchlistItem.findUnique({
//         //     where: {
//         //         userId_movieId: {
//         //             userId,
//         //             movieId: id,
//         //         },
//         //     },
//         // });

//         // if (!existingWatchlistItem) {
//         //     return res.status(404).json({ message: "Watchlist item not found" });
//         // }

//         await prisma.watchlistItem.delete({
//             where: {
//                 userId_movieId: {
//                     userId,
//                     movieId: id,
//                 },
//             },
//         });

//         res.status(200).json({ message: "Watchlist item deleted successfully" });
//     } catch (error) {    
//         if (error.code === 'P2025') {
//             return res.status(404).json({ message: "Watchlist item not found" });
//         }
//         console.error("Error deleting watchlist item", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // @desc    Get watchlist stats
// // @route   GET /api/watchlist/stats
// // @access  Private
// export const getWatchlistStats = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const [total, watched, watching, wantToWatch, onHold, dropped] = await Promise.all([
//             prisma.watchlistItem.count({ where: { userId } }),
//             prisma.watchlistItem.count({ where: { userId, status: "COMPLETED" } }),
//             prisma.watchlistItem.count({ where: { userId, status: "IN_PROGRESS" } }),
//             prisma.watchlistItem.count({ where: { userId, status: "PLANNED" } }),
//             prisma.watchlistItem.count({ where: { userId, status: "ON_HOLD" } }),
//             prisma.watchlistItem.count({ where: { userId, status: "DROPPED" } }),
//         ]);

//         res.status(200).json({
//             total,
//             watched,
//             watching,
//             wantToWatch,
//             onHold,
//             dropped,
//         });
//     } catch (error) {
//         console.error("Error getting watchlist stats", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
