import api from './api'

const Reviews = async (movieId) => {
    const {data} = await api.get(
        `/movie/${movieId}/reviews?api_key=${process.env.REACT_APP_API_KEY}`
    )
    // console.log(data)
    return data
    
}


export default Reviews