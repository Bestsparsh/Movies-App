import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { FiArrowLeft } from "react-icons/fi"
import Card from "../../component/Card"
import "./style.css"

const Favorites = (Logins) => {
  const { movies } = useAppSelector(state => state.favorites)

  const navigate = useNavigate()
  return (
    <>
      <div className="container">
        <div className="header">
          <FiArrowLeft size={24} onClick={() => navigate("/")} />
        </div>
        <h4 className="title">Favorites</h4>
        {!movies.length && (
          <h3 style={{ marginTop: "70px" }}>Please add your favorite movies</h3>
        )}
        <div className="row">
          {movies?.map(({ movieId, posterBase64, title }) => {
            return (
              <Card
                id={movieId}
                poster_path={posterBase64}
                original_title={title}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Favorites