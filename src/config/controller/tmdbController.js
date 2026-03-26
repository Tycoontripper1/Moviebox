import { tmdbFetch } from '../tmdb.js'

export const getTrending = async (req, res) => {
    try {
        const { timeWindow = 'week' } = req.params
        const data = await tmdbFetch(`/trending/all/${timeWindow}?language=en-US`)
        res.status(200).json(data)
    } catch (error) {
        console.error('TMDB trending error:', error)
        res.status(500).json({ message: 'Failed to fetch trending' })
    }
}

export const getPopularMovies = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const data = await tmdbFetch(`/movie/popular?language=en-US&page=${page}`)
        res.status(200).json(data)
    } catch (error) {
        console.error('TMDB popular error:', error)
        res.status(500).json({ message: 'Failed to fetch popular movies' })
    }
}

export const getTopRatedMovies = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const data = await tmdbFetch(`/movie/top_rated?language=en-US&page=${page}`)
        res.status(200).json(data)
    } catch (error) {
        console.error('TMDB top rated error:', error)
        res.status(500).json({ message: 'Failed to fetch top rated movies' })
    }
}

export const getNetflixOriginals = async (req, res) => {
    try {
        const data = await tmdbFetch(`/discover/tv?with_networks=213&language=en-US`)
        res.status(200).json(data)
    } catch (error) {
        console.error('TMDB netflix error:', error)
        res.status(500).json({ message: 'Failed to fetch netflix originals' })
    }
}

export const getTrendingInNigeria = async (req, res) => {
    try {
        const data = await tmdbFetch(`/trending/all/week?language=en-US&region=NG`)
        res.status(200).json(data)
    } catch (error) {
        console.error('TMDB nigeria trending error:', error)
        res.status(500).json({ message: 'Failed to fetch trending in Nigeria' })
    }
}

export const searchMovies = async (req, res) => {
    try {
        const { q, page = 1 } = req.query
        if (!q) {
            return res.status(400).json({ message: 'Search query is required' })
        }
        const data = await tmdbFetch(`/search/movie?query=${q}&page=${page}&language=en-US`)
        res.status(200).json(data)
    } catch (error) {
        console.error('TMDB search error:', error)
        res.status(500).json({ message: 'Failed to search movies' })
    }
}

export const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params
        const [details, videos, similar] = await Promise.all([
            tmdbFetch(`/movie/${id}?language=en-US`),
            tmdbFetch(`/movie/${id}/videos?language=en-US`),
            tmdbFetch(`/movie/${id}/similar?language=en-US`),
        ])

        const trailer = videos.results.find(
            v => v.type === 'Trailer' && v.site === 'YouTube'
        )

        res.status(200).json({
            ...details,
            trailerKey: trailer?.key || null,
            similar: similar.results.slice(0, 6),
        })
    } catch (error) {
        console.error('TMDB movie details error:', error)
        res.status(500).json({ message: 'Failed to fetch movie details' })
    }
}

export const getMoviesByGenre = async (req, res) => {
    try {
        const { genreId, page = 1 } = req.query
        const data = await tmdbFetch(`/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc&language=en-US`)
        res.status(200).json(data)
    } catch (error) {
        console.error('TMDB genre error:', error)
        res.status(500).json({ message: 'Failed to fetch movies by genre' })
    }
}

export const getGenres = async (req, res) => {
    try {
        const data = await tmdbFetch(`/genre/movie/list?language=en-US`)
        res.status(200).json(data)
    } catch (error) {
        console.error('TMDB genres error:', error)
        res.status(500).json({ message: 'Failed to fetch genres' })
    }
}