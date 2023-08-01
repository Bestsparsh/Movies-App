import api from './api'

const credits = async (PersonId) => {
    const {data} = await api.get(
        `/person/${PersonId}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`
    )
    // console.log(data)
    return data
    
}


export default credits