import api from './api'

const favorite = async (userId) => {
    const { data } = await api.get(
        `wishlist/${userId}`
    )
    console.log(data)
    return data
}

export default favorite