import { configureStore } from "@reduxjs/toolkit";
import { heroesReducer } from "./slice";

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
});
