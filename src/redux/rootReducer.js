import { combineReducers } from "@reduxjs/toolkit";
import { heroesReducer } from "./slice"; // Імплементуємо ваш редуктор

const rootReducer = combineReducers({
  heroes: heroesReducer, // Ключ повинен відповідати стану в вашому slice
});

export default rootReducer;
