

import api from "./api";
// import {MovieType} from '../common/type '

const fetchPaginatedMovies = async (pageParam) => {
    const { data } = await api.get('/movie/')
    console.log(data)
    return data
}



export default fetchPaginatedMovies