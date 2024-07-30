import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export const fetchHeroesThunk = createAsyncThunk(
  "heroes/fetchAll",
  async (_, thunkAPI) => {
    console.log("click");
    try {
      const { data } = await axios.get("people");
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
