
import api from './api'

const fetchPerson = async (PersonId) => {
    const {data} = await api.get(
        `/person/${PersonId}?api_key=${process.env.REACT_APP_API_KEY}`
    )
   
    return data
    
}



export default fetchPerson