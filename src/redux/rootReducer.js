import { combineReducers } from "redux";
import { heroesReducer } from "./slice";

const rootReducer = combineReducers({
  heroes: heroesReducer,
});

export default rootReducer;
