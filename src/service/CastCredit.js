import api from './api'
// console.log('hello')
const movieCredit = async (movieId) => {
    const {data} = await api.get(
        `api/movie/${movieId}/actors`
    )
    // console.log(data)
    return data
    
}


export default movieCredit