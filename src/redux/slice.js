import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFilmsThunk,
  fetchHeroesThunk,
  fetchStarships,
} from "./operations";

const initialState = {
  heroes: [],
  films: [],
  starships: [],
  isLoading: false,
  isError: false,
};

const sliceHeroes = createSlice({
  name: "heroes",
  initialState,
  selectors: {
    selectHeroes: (state) => state.heroes,
    selectFilms: (state) => state.films,
    selectStarships: (state) => state.starships,
    selectIsError: (state) => state.isError,
    selectIsLoading: (state) => state.isLoading,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroesThunk.fulfilled, (state, { payload }) => {
        state.heroes = payload;
        state.isLoading = false;
      })
      .addCase(fetchHeroesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHeroesThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFilmsThunk.fulfilled, (state, { payload }) => {
        state.films = payload;
        state.isLoading = false;
      })
      .addCase(fetchFilmsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmsThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchStarships.fulfilled, (state, { payload }) => {
        state.starships = payload;
        state.isLoading = false;
      })
      .addCase(fetchStarships.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStarships.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const heroesReducer = sliceHeroes.reducer;

export const {
  selectHeroes,
  selectFilms,
  selectStarships,
  selectIsLoading,
  selectIsError,
} = sliceHeroes.selectors;
