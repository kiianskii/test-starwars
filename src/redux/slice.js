import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFilmsThunk,
  fetchHeroesThunk,
  fetchMoreHeroesThunk,
  fetchStarships,
} from "./operations";

const initialState = {
  heroes: [],
  films: [],
  starships: [],
  isLoading: false,
  isError: false,
  page: 1,
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
    selectPage: (state) => state.page,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroesThunk.fulfilled, (state, { payload }) => {
        state.heroes = payload;
        state.isLoading = false;
        state.page = 1;
      })
      .addCase(fetchHeroesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHeroesThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchMoreHeroesThunk.fulfilled, (state, { payload }) => {
        state.heroes.push(...payload);
        state.isLoading = false;
        state.page += 1;
      })
      .addCase(fetchMoreHeroesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoreHeroesThunk.rejected, (state) => {
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
  selectPage,
} = sliceHeroes.selectors;
