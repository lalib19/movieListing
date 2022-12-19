import { createAction, createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { movies$ } from "../movies";

const initialState = {
  loading: false,
  movies: [],
  error: "",
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", () => {
  return movies$.then((res) => res);
});

export const revertAll = createAction("REVERT_ALL");

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      return state;
    },
    filterMovie: (state, action) => {
      state.movies = state.movies.filter((cat) =>
        cat.category.includes(action.payload)
      );
    },
    pageFilter: (state, action) => {
      state.movies = state.movies.slice(0, action.payload);
    },
    turnPage: (state, action) => {
      state.movies = state.movies.slice(
        action.payload.number * (action.payload.page - 1),
        action.payload.number * action.payload.page
      );
      console.log(action.payload.page);
    },
    movieLike: (state, action) => {
      state.movies[action.payload].likes++;
    },
    movieUnlike: (state, action) => {
      state.movies[action.payload].likes--;
    },
    movieDislike: (state, action) => {
      state.movies[action.payload].dislikes++;
    },
    movieUndislike: (state, action) => {
      state.movies[action.payload].dislikes--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = false;
      state.movies = [];
      state.error = action.error.message;
    });
  },
});

export const {
  deleteMovie,
  movieLike,
  movieDislike,
  movieUnlike,
  movieUndislike,
  filterMovie,
  pageFilter,
  reset,
  turnPage,
} = moviesSlice.actions;
