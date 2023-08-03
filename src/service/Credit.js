import api from './api'

const credits = async (PersonId) => {
    const {data} = await api.get(
        `api/actor/${PersonId}/movies`
    )
    // console.log(data)
    return data
    
}


export default credits