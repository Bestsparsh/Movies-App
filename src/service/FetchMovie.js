
import api from './api'

const fetchMovie = async (movieId) => {
    const {data} = await api.get(`api/movie/${movieId}`)
    // console.log(data)
    return data
}



export default fetchMovie