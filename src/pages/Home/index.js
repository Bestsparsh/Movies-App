import React, { useState } from 'react';
import fetchPaginatedMovies from '../../service/paginateMovies';
import Card from '../../component/Card';
import { useQuery } from "react-query";
import "./style.css"; // Import your custom CSS file here

const Home = () => {
  const [page, setPage] = useState(1);
  const { data: movies, isLoading } = useQuery(["movies", page], () => fetchPaginatedMovies(page), {
    keepPreviousData: true
  });

  return (
    <div className="home-container">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="movie-grid">
            {movies?.map(({ movieId, posterBase64, title }) => (
              <Card
                key={movieId}
                id={movieId}
                poster_path={posterBase64}
                original_title={title}
              />
            ))}
          </div>
          <footer className="pagination">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setPage((prevPage) => prevPage - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <p className="page-number">{page}</p>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next
            </button>
          </footer>
        </>
      )}
    </div>
  );
}

export default Home;
