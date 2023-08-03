import React, { useState } from "react"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { Link } from "react-router-dom"
import "./style.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addFavorite, removeFavorite } from "../../features/favMovieSlice"

const Card = movieData => {
  const { movies } = useAppSelector(state => state.favorites)
  const dispatch = useAppDispatch()
  const [isFavorites, setIsFavorites] = useState(() => {
    const isFavoriteMovie = movies.find(movie => movie.id === movieData.id)
    return !!isFavoriteMovie
  })

  const handleFavorites = () => {
    if (isFavorites) {
      dispatch(removeFavorite(movieData.id))
      setIsFavorites(prevState => !prevState)
    } else {
      dispatch(addFavorite(movieData))
      setIsFavorites(prevState => !prevState)
    }
  }
  // console.log(movieData.poster_path)

  return (
    <div className="col-md-4 col-sm-6">
      <div className="card card-block">
        <h4 className="icon-fav">
          <i>
            {isFavorites ? (
              <AiFillStar size={24} onClick={handleFavorites} />
            ) : (
              <AiOutlineStar size={24} onClick={handleFavorites} />
            )}
          </i>
        </h4>
        <a href= {`/movie/${movieData.id}`}>
        <img 
          src={`data:image/jpeg;base64,${movieData.poster_path}`}
          alt={movieData.original_title}
        />
        </a>
       
        <Link to={`/movie/${movieData.id}`} style={{ textDecoration: "none" }}>
          <h5 className="card-title mt-3 mb-3">{movieData.original_title}</h5>
        </Link>
      </div>
    </div>
  )
}

export default Card 