import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchMovie from '../../service/FetchMovie';
import movieCredit from '../../service/CastCredit';
import { FiArrowLeft } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import './style.css';
import { useQuery } from 'react-query';
import axios from 'axios';

const Movie = () => {
  const { id } = useParams();

  const { data: movie2 } = useQuery(['movies1', id], () => movieCredit(id), {
    keepPreviousData: true,
  });
  const { data: movie } = useQuery(['movie', id], () => fetchMovie(id), {
    keepPreviousData: true,
  });

  const navigate = useNavigate();

  const handleWriteReview = () => {
    // Retrieve user ID from sessionStorage
    const userId = sessionStorage.getItem('userid');
    console.log(userId)
    if (userId && userReview.trim() && userRating>0) {
      const createReviewEndpoint = `http://localhost:8080/api/review/movie/${id}/review?userId=${userId}`;
      const reviewData = {
        content: userReview,
        rating: userRating,
      };

      axios
        .post(createReviewEndpoint, reviewData)
        .then((response) => {
          console.log('Review submitted successfully!');
          setUserReview('');
          setUserRating(0);
        })
        .catch((error) => {
          console.error('Error creating review:', error);
          if (error.response) {
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
          }
        });
    } else {
      console.warn('Please enter your review before submitting.');
    }
  };

  const [userReview, setUserReview] = useState('');

  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (event) => {
    setUserRating(Number(event.target.value));
  };

  const handleReviewChange = (event) => {
    setUserReview(event.target.value);
  };


  return (
    <>

      <div className='container'>
        <div className='header'>
          <FiArrowLeft size={24} onClick={() => navigate('/')} />
        </div>
        <div className='movie-card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-lg-5 col-md-4 col-sm-6'>
                <div className='white-box'>
                  <div className='poster'>
                    <img
                      src={`data:image/jpeg;base64,${movie?.posterBase64}`}

                      alt={movie?.title}
                      className='img-responsive'
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-7 col-md-7 col-sm-6'>
                <h4 className='text-left title'>{movie?.title}</h4>
                <p className='text-left'>{movie?.description}</p>
                <div className='text-left'>
                  <strong>Rating</strong>
                  <AiFillStar size={30} />
                  {/* <input
                    type='number'
                    min='1'
                    max='10'
                    step='0.1'
                    value={userRating}
                    onChange={handleRatingChange}
                    placeholder='Rate the movie (1-10)'
                  /> */}
                  {/* <button onClick={handleRateMovie}>Rate Movie</button> */}
                  <span className='rating'>{movie?.imdb}</span>
                </div>
                <div className='text-left movie-detail'>

                  <span>

                    <strong>Type</strong>
                    Movie
                  </span>
                  <span>

                    <strong>Released</strong>
                    {movie?.featuredYear}
                  </span>
                  <span>

                    <strong>Run Time</strong>
                    {movie?.duration}
                  </span>
                  <span>

                    <strong>Genres</strong>

                    {movie?.genre}

                  </span>
                  {/* <span>

                    <strong>Director</strong>
                    {movie2?.crew.map((item) => (
                      (item.job === 'Director') ? <a href={`/person/${item.id}`}> {item.name}</a> : null
                    ))}
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="panel top_billed scroller">
        <h3 dir="auto">Top Billed Cast</h3>

        <div id="cast_scroller" class="scroller_wrap should_fade is_fading">
          <ol class="people scroller">
            {
              movie2?.map((item) => (
                <li class="card">
                  <a href={`/actor/${item.id}`}>
                    <img loading="lazy" class="profile" src={`data:image/jpeg;base64,${item.imgBase64}`} alt={item.name} />

                  </a>

                  <p><a href={`/actor/${item.id}`}>{item.name}</a></p>                </li>
              ))
            }
          </ol>
          <div class="style_wrapper"></div>
        </div>
      </section>


      <section className="panel media_panel social_panel">
        <section className="review">
          <div className="content">
            <div className="original_content">
              <div className="review_container three">
                <div className="content three">
                  <div className="inner_content">
                    <div className="content">
                      <div className="inner_content">
                        <div className="card">
                          <div className="grouped">
                            <div className="info">
                              <div className="rating_wrapper">
                                <ul>
                                  {movie?.reviews.map((item) => (
                                    <li key={item.id}>
                                      <h3>
                                        {/* <a
                                          href={`https://api.themoviedb.org/3/review/${item.id}?api_key=${process.env.REACT_APP_API_KEY}`}
                                        > */}
                                        A review by {item.firstName + item.lastName}
                                        {/* </a> */}
                                      </h3>
                                      <div className="rounded rating">
                                        <span>
                                          {item.rating}{" "}
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="yellow"
                                          >
                                            <path d="M12 1l2.37 7.65h7.63l-6.13 4.72 2.38 7.63-6.12-4.73-6.13 4.73 2.38-7.63-6.13-4.72h7.63z" />
                                          </svg>
                                        </span>
                                      </div>
                                      <h5>
                                        Written by{" "}
                                        {/* <a
                                          href={`https://www.themoviedb.org/u/${item.author_details.username}`}
                                        > */}
                                        {item.firstName + item.lastName}
                                        {/* </a>{" "} */}
                                        on {item.addedDate}
                                      </h5>
                                      <p>{item.content}</p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='write-review-section'>
            <strong>Write a Review</strong>
            <textarea
              value={userReview}
              onChange={handleReviewChange}
              placeholder='Write your review here...'
            />
            <label>
              Rating:{" "}
              <input
                type='number'
                min='1'
                max='10'
                value={userRating}
                onChange={handleRatingChange}
              />
            </label>
            <button onClick={handleWriteReview}>Submit Review</button>
          </div>

        </section>
      </section>

    </>
  )
}

export default Movie