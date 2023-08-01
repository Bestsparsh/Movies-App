
import api from './api'

const fetchMovie = async (movieId) => {
    const {data} = await api.get(
        `/movie/${movieId}`
    )
   
    return data
    
}



export default fetchMovie