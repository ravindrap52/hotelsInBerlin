import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const hotels_URL = "http://localhost:3000/v1/recruiting/hotels";

interface hotelsState {
  hotels: Array<{ [key: string]: string }>;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  hotel: Array<{ [key: string]: string }>;
}

interface IHotel {
  hotelId: string;
  locale: string;
}

const initialState = {
  hotels: [],
  status: "idle",
  error: null,
  hotel: [],
} as hotelsState;

/* get all hotels */
export const getAllHotels = createAsyncThunk(
  "hotels/getAllHotels",
  async (lang: string) => {
    const response = await axios.get(`${hotels_URL}/?lang=${lang}`);
    return response.data;
  }
);

/* get hotel by hotelId */
export const getHotelByHotelID = createAsyncThunk(
  "hotels/getHotelByHotelID",
  async ({ hotelId, locale }: IHotel) => {
    const response = await axios.get(
      `${hotels_URL}/${hotelId}/?lang=${locale}`
    );
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
      })
      .addCase(getHotelByHotelID.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getHotelByHotelID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hotel = action.payload;
      })
      .addCase(getHotelByHotelID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const allHotels = (state) => state.hotels.hotels;
export const status = (state) => state.hotels.status;
export const error = (state) => state.hotels.error;
export const hotel = (state) => state.hotels.hotel;

export default hotelSlice.reducer;
