import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export const fetchHeroesThunk = createAsyncThunk(
  "heroes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("people");
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMoreHeroesThunk = createAsyncThunk(
  "heroes/fetchMore",
  async (page, thunkAPI) => {
    try {
      const { data } = await axios.get(`people/?page=${page + 1}`);
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFilmsThunk = createAsyncThunk(
  "films/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("films");
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStarshipData = async (starshipId) => {
  return axios
    .get(`starships/${starshipId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching starship data:", error);
      throw error;
    });
};

export const fetchStarships = createAsyncThunk(
  "starships/fetchStarships",
  async (starshipIds, thunkAPI) => {
    try {
      const starshipPromises = starshipIds.map((id) => fetchStarshipData(id));
      const starships = await Promise.all(starshipPromises);
      return starships;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
