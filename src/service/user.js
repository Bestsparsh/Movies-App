import api from './api'

const Users = async (userId) => {
    const {data} = await api.get(
        `api/user/${userId}`
    )
    console.log(data)
    return data
    
}


export default Users