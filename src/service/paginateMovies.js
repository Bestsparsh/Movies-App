

import api from "./api";
// import {MovieType} from '../common/type '

const fetchPaginatedMovies = async (pageParam=1) => {
    const { data } = await api.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${pageParam}`
    )
    // console.log(data.results)
    return data.results
}



export default fetchPaginatedMovies