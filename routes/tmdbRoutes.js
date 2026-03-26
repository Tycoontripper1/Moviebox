import express from 'express'
const router = express.Router()

import {
    getTrending,
    getPopularMovies,
    getTopRatedMovies,
    getNetflixOriginals,
    getTrendingInNigeria,
    searchMovies,
    getMovieDetails,
    getMoviesByGenre,
    getGenres
} from '../src/config/controller/tmdbController.js'

router.get('/trending/:timeWindow', getTrending)
router.get('/popular', getPopularMovies)
router.get('/top-rated', getTopRatedMovies)
router.get('/netflix-originals', getNetflixOriginals)
router.get('/trending-nigeria', getTrendingInNigeria)
router.get('/search', searchMovies)
router.get('/movie/:id', getMovieDetails)
router.get('/genre', getMoviesByGenre)
router.get('/genres', getGenres)

export default router
