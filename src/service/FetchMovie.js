
import api from './api'

const fetchMovie = async (movieId) => {
    const {response} = await api.get(
        `/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
    )
    return response.data
}



export default fetchMovie