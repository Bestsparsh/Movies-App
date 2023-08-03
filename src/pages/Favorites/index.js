import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Card from "../../component/Card";
import favorite from '../../service/favorites';
import { useQuery } from 'react-query';
import "./style.css";

const Favorites = (Logins) => {
  const userId = sessionStorage.getItem("userid");
  const { data: movies } = useQuery(['favorites', userId], () => favorite(userId), {
    keepPreviousData: true,
  });
  const navigate = useNavigate();

  return (
    <div className="favorites-container">
      <div className="header">
        <FiArrowLeft size={24} onClick={() => navigate("/")} />
      </div>

      <h4 className="title">Favorites</h4>

      <div className="favorites-list">
        {movies?.map((item) => (
          <Card
            id={item.movieId}
            key={item.movieId}
            poster_path={item.posterBase64}
            original_title={item.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
