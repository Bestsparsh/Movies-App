import React, { useState } from 'react'
import fetchPaginatedMovies from '../../service/paginateMovies'
import Card from '../../component/Card'
import { useQuery } from "react-query";
const Home = () => {
  const [page, setPage] = useState(1)
  const {data:movies,isLoading} = useQuery(['/movies',page], ()=> fetchPaginatedMovies(page), {
      keepPreviousData: true
  })
 

  console.log('movies=>',movies)
  return (
   <>
   {
    isLoading ? (
      <h2>Loading...</h2>
    ): (
      <div className='container'>
        <div className='row'>
          {movies?.map(({id, poster_path, original_title}) => {
            return(
              <Card
              id={id}
              poster_path={poster_path}
              original_title={original_title}
              />
            )
          })}
        </div>
         </div>
    )
   }
   <footer style={{margin: '10px'}}>
    <button className='btn btn-primary ' type='button' onClick={() => setPage((prevPage) => prevPage-1)} disabled={page === 1 ?true:false}>
      Prev
    </button>
    <p style={{display: 'inline', margin: '10px'}}>{page} </p>
    <button className='btn btn-primary ' type='button' onClick={() => setPage((prevPage) => prevPage+1)} disabled={false}>
      Next
    </button>
   </footer>
   </> 
  )
}

export default Home