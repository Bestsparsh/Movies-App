
import api from './api'

const fetchPerson = async (PersonId) => {
    const {data} = await api.get(
        `api/actor/${PersonId}`
    )
   
    return data
    
}



export default fetchPerson