import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const hotels_URL = "http://localhost:3000/v1/recruiting/hotels";

interface hotelsState {
  hotels: Array<{ [key: string]: string }>;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState = {
  hotels: [],
  status: "idle",
  error: null,
} as hotelsState;

export const getAllHotels = createAsyncThunk(
  "hotels/getAllHotels",
  async (lang: string) => {
    const response = await axios.get(`${hotels_URL}/?lang=${lang}`);
    return response.data;
  }
);

/**
 createSlice internally uses createAction and createReducer API.
 this will automatically generate action creaters and action types for the given reducer and state.
 */
const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHotels.pending, (state) => {
        // we can mutate the state like this because it internally uses immerjs library
        // here we are not modifying the state directly but we are modfying the proxy object (current state obbject) which is called as draft state
        state.status = "pending";
      })
      .addCase(getAllHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hotels = action.payload;
      })
      .addCase(getAllHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const allHotels = (state) => state.hotels.hotels;
export const status = (state) => state.hotels.status;
export const error = (state) => state.hotels.error;

export default hotelSlice.reducer;
