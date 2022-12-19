import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./slices";


export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
    }
})
