import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  movies: [],
}

const addFavoriteMovie = (state, action) => {
  const existingMovie = state.movies.find(
    movie => movie.id === action.payload.id
  )

  if (!existingMovie) {
    state.movies.push(action.payload)
  }
}

const removeFavoriteMovie = (state, action) => {
  const updateFavMovieList = state.movies.filter(
    movie => movie.id !== action.payload
  )
  state.movies = updateFavMovieList
}

// export const favroitesSlice = createSlice({
//   name: "favorites",
//   initialState,
//   reducers: {
//     addFavoriteMovie,
//     removeFavoriteMovie
//   }
// })

// export const {
//   addFavoriteMovie: addFavorite,
//   removeFavoriteMovie: removeFavorite
// } = favroitesSlice.actions

// export default favroitesSlice.reducer



export const favroitesSlice = createSlice({
  name: "User",
  initialState: {
    movies: []
  },
  reducers: {
    addFavoriteMovie: (state, action) => {
      const existingMovie = state.movies.find(
        movie => movie.id === action.payload.id
      )

      if (!existingMovie) {
        state.movies.push(action.payload)
      }
    },
    removeFavoriteMovie: (state, action) => {
      const updateFavMovieList = state.movies.filter(
        movie => movie.id !== action.payload
      )
      state.movies = updateFavMovieList
    }

  }
});

export const {
  addFavoriteMovie: addFavorite,
  removeFavoriteMovie: removeFavorite,
} = favroitesSlice.actions

export default favroitesSlice.reducer