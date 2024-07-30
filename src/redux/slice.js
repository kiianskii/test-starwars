// import { createSlice } from "@reduxjs/toolkit";
// import { fetchHeroesThunk } from "./operations";

// const initialState = {
//   heroes: [],
//   isLoading: false,
//   isError: false,
// };

// const sliceHeroes = createSlice({
//   name: "heroes",
//   initialState,
//   selectors: {
//     selectHeroes: (state) => state.heroes,
//     selectIsError: (state) => state.isError,
//     selectIsLoading: (state) => state.isLoading,
//   },

//   extraReducers: (builder) => {
//     builder.addCase(fetchHeroesThunk.fulfilled, (state, { payload }) => {
//       state.heroes = payload;
//     });
//   },
// });

// export const heroesReducer = sliceHeroes.reducer;

// export const { selectHeroes, selectIsLoading, selectIsError } =
//   sliceHeroes.selectors;

// slice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroesThunk } from "./operations"; // Переконайтесь, що шлях правильний

const sliceHeroes = createSlice({
  name: "heroes",
  initialState: [],
  selectors: {
    selectHeroes: (state) => state,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchHeroesThunk.fulfilled, (state, { payload }) => {
        return (state = payload);
      })
      .addCase(fetchHeroesThunk.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const heroesReducer = sliceHeroes.reducer;
export const { selectHeroes } = sliceHeroes.selectors;
