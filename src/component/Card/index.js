import React, { useState } from "react"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { Link } from "react-router-dom"
import "./style.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addFavorite, removeFavorite } from "../../features/favMovieSlice"

const Card = movieData => {
  const { movies } = useAppSelector(state => state.favorites)
  const userId = sessionStorage.getItem('userid');

  const dispatch = useAppDispatch()
  const [isFavorites, setIsFavorites] = useState(() => {
    const isFavoriteMovie = movies.find(movie => movie.id === movieData.id)
    return !!isFavoriteMovie
  })
  const createdDate = new Date(); // Get the current date and time.

  const wishlistItem = {
    createdDate: createdDate,

    movieId: movieData.id, // Convert the date to ISO string format.
  };


  const handleFavorites = () => {
    if (isFavorites) {
      // dispatch(removeFavorite(movieData.id))
      // setIsFavorites(prevState => !prevState)
      fetch(`http://localhost:8080/wishlist/delete?movieId=${movieData.id}&userId=${userId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res) {
             dispatch(removeFavorite(movieData.id))
      setIsFavorites(prevState => !prevState)
          } else {
            console.error("Failed to remove movie from favorites");
          }
        })
        .catch((error) => {
          console.error("Error removing movie from favorites:", error);
        });
    
    } else {
      // dispatch(addFavorite(movieData))
      // setIsFavorites(prevState => !prevState)
      console.log(userId)

      fetch(`http://localhost:8080/wishlist/add?movieId=${movieData.id}&userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers required by your backend.
      },
      body: JSON.stringify(wishlistItem),
    })
      .then((res) => {
        if (res) {
       dispatch(addFavorite(movieData))
      setIsFavorites(prevState => !prevState)
        } else {
          console.error("Failed to add movie to favorites");
        }
      })
      .catch((error) => {
        console.error("Error adding movie to favorites:", error);
      });
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
        <a href={`/movie/${movieData.id}`}>
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