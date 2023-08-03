import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addFavorite, removeFavorite } from "../../features/favMovieSlice";
import favorite from '../../service/favorites';
import { useQuery } from 'react-query';


const Card = ({ id, poster_path, original_title }) => {
  const { movies } = useAppSelector(state => state.favorites);
     // Change to "userId" if this is the key you're using

  const dispatch = useAppDispatch();
  const isFavoriteMovie = movies.find(movie => movie.id === id);
  const [isFavorites, setIsFavorites] = useState(!!isFavoriteMovie);
  const userId = sessionStorage.getItem("userid");
  const { data: fav } = useQuery(['favorites', userId], () => favorite(userId), {
    keepPreviousData: true,
  });

  const wishlistItem = {
    createdDate: new Date().toISOString(),
    movieId: id,
  };

  const handleFavorites = () => {
    const exist = fav.some(movie => movie.movieId === id)
    if (isFavorites || exist) {
      fetch(`http://localhost:8080/wishlist/delete?movieId=${id}&userId=${userId}`, {
        method: "DELETE",
      })
        .then(res => {
          if (res.ok) {
            dispatch(removeFavorite(id));
            setIsFavorites(false);
          } else {
            console.error("Failed to remove movie from favorites");
          }
        })
        .catch(error => {
          console.error("Error removing movie from favorites:", error);
        });
    } else {
      fetch(`http://localhost:8080/wishlist/add?movieId=${id}&userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistItem),
      })
        .then(res => {
          if (res.ok) {
            dispatch(addFavorite({ id, poster_path, original_title }));
            setIsFavorites(true);
          } else {
            console.error("Failed to add movie to favorites");
          }
        })
        .catch(error => {
          console.error("Error adding movie to favorites:", error);
        });
    }
  };

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
        <div className="image-container">
          <a href={`/movie/${id}`}>
            <img src={`data:image/jpeg;base64,${poster_path}`} alt={original_title} />
          </a>
        </div>
        <div className="card-container">
          <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
            <h5 className="card-title mt-3 mb-3">{original_title}</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;