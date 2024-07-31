import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroesThunk } from "./operations";

const initialState = {
  heroes: [],
  isLoading: false,
  isError: false,
};

const sliceHeroes = createSlice({
  name: "heroes",
  initialState,
  selectors: {
    selectHeroes: (state) => state.heroes,
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
      });
  },
});

export const heroesReducer = sliceHeroes.reducer;

export const { selectHeroes, selectIsLoading, selectIsError } =
  sliceHeroes.selectors;
