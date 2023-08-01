import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import fetchMovie from '../../service/FetchMovie'
import Reviews from '../../service/Review'
import movieCredit from '../../service/CastCredit'
import { FiArrowLeft } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import './style.css'
import { useQuery } from "react-query"
import axios from 'axios'
import { useState } from 'react'

const Movie = () => {
  const { id } = useParams()

  const { data: movie1 } = useQuery(["movies", id], () => Reviews(id), {
    keepPreviousData: true
  })
  const { data: movie2 } = useQuery(["movies1", id], () => movieCredit(id), {
    keepPreviousData: true
  })
  const { data: movie } = useQuery(["movie", id], () => fetchMovie(id), {
    keepPreviousData: true
  })


  const navigate = useNavigate()

  const [userRating, setUserRating] = useState(null);
  const [userReview, setUserReview] = useState('');


  const handleRatingChange = (event) => {
    setUserRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setUserReview(event.target.value);
  };

  const handleRateMovie = () => {
    if (userRating) {
      // API endpoint to rate the movie
      const rateMovieEndpoint = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}`;

      // Make the API request to rate the movie
      axios.post(rateMovieEndpoint, { value: userRating })
        .then((response) => {
          // Handle successful rating (e.g., show a success message)
          console.log('Movie rated successfully!');
        })
        .catch((error) => {
          // Handle error if the rating request fails
          console.error('Error rating the movie:', error);
        });
    } else {
      // User has not selected a rating
      console.warn('Please select a rating before submitting.');
    }
  };




  const handleWriteReview = () => {
    if (userReview.trim()) {
      // API endpoint to create a review
      const createReviewEndpoint = `http://localhost:8080/api/review/movie/${id}/review`;

      // Payload for creating the review
      const reviewData = {
        content: userReview,
      };

      // Make the API request to create the review
      axios.post(createReviewEndpoint, reviewData)
        .then((response) => {
          // Handle successful review creation (e.g., show a success message)
          console.log('Review submitted successfully!');
          // Clear the review input after submission
          setUserReview('');
        })
        .catch((error) => {
          // Handle error if the review creation request fails
          console.error('Error creating review:', error);
        });
    } else {
      // User has not entered any review content
      console.warn('Please enter your review before submitting.');
    }
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
                      src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                      alt={movie?.original_title}
                      className='img-responsive'
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-7 col-md-7 col-sm-6'>
                <h4 className='text-left title'>{movie?.original_title}</h4>
                <p className='text-left'>{movie?.overview}</p>
                <div className='text-left'>
                  <strong>Rating</strong>
                  <AiFillStar size={30} />
                  <input
                    type='number'
                    min='1'
                    max='10'
                    step='0.1'
                    value={userRating}
                    onChange={handleRatingChange}
                    placeholder='Rate the movie (1-10)'
                  />
                  <button onClick={handleRateMovie}>Rate Movie</button>
                  <span className='rating'>{movie?.vote_average}</span>
                </div>
                <div className='text-left movie-detail'>

                  <span>

                    <strong>Type</strong>
                    Movie
                  </span>
                  <span>

                    <strong>Release Date</strong>
                    {movie?.release_date}
                  </span>
                  <span>

                    <strong>Run Time</strong>
                    {`${movie?.runtime} minutes`}
                  </span>
                  <span>

                    <strong>Genres</strong>

                    {movie?.genres.map(({ name }) => name).join(', ')}

                  </span>
                  <span>

                    <strong>Director</strong>
                    {movie2?.crew.map((item) => (
                      (item.job === 'Director') ? <a href={`/person/${item.id}`}> {item.name}</a> : null
                    ))}
                  </span>
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
              movie2?.cast.map((item) => (
                <li class="card">
                  <a href={`/person/${item.id}`}>
                    <img loading="lazy" class="profile" src={`https://www.themoviedb.org/t/p/w138_and_h175_face${item.profile_path}`} alt={item.name} />

                  </a>

                  <p><a href={`/person/${item.id}`}>{item.name}</a></p>
                  <p class="character">{item.character}</p>
                </li>
              ))
            }


            <li class="filler view_more">
              <p><a href="/movie/872585-oppenheimer/cast">View More <span class="glyphicons_v2 arrow-thin-right"></span></a></p>
            </li>
          </ol>
          <div class="style_wrapper"></div>
        </div>
      </section>


      <section className="panel media_panel social_panel">
        <section className="review">
          {/* ... Other content ... */}
          <div className='write-review-section'>
            <strong>Write a Review</strong>
            <textarea
              value={userReview}
              onChange={handleReviewChange}
              placeholder='Write your review here...'
            />
            <button onClick={handleWriteReview}>Submit Review</button>
          </div>
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
                                  {movie1?.results.map((item) => (
                                    <li key={item.id}>
                                      <h3>
                                        <a
                                          href={`https://api.themoviedb.org/3/review/${item.id}?api_key=${process.env.REACT_APP_API_KEY}`}
                                        >
                                          A review by {item.author_details.username}
                                        </a>
                                      </h3>
                                      <div className="rounded rating">
                                        <span>
                                          {item.author_details.rating}{" "}
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
                                        <a
                                          href={`https://www.themoviedb.org/u/${item.author_details.username}`}
                                        >
                                          {item.author_details.username}
                                        </a>{" "}
                                        on {item.created_at}
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
                    <p className="new_button">
                      <a href={`/movie/${movie1?.id}/reviews`}>Read All Reviews</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

    </>
  )
}

export default Movie