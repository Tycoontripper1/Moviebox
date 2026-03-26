const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_TOKEN = process.env.TMDB_API_KEY

export const tmdbFetch = async (endpoint, params = {}) => {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
    
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`)
    }

    return response.json()
}