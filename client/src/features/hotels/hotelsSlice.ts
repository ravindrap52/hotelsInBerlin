import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IHotelsState,
  IHotel,
  ISearchHotel,
  IFilter,
} from "./responseInterface";

const hotels_URL = "http://localhost:3000/v1/recruiting/hotels";

const initialState = {
  hotels: [],
  status: "idle",
  searchStatus: "idle",
  error: null,
  hotel: [],
  searchedHotel: [],
} as IHotelsState;

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

/* search hotel by hotelName */
export const searchtHotelByHotelName = createAsyncThunk(
  "hotels/searchtHotelByHotelName",
  async ({ searchTerm, locale }: ISearchHotel) => {
    console.log(searchTerm);
    const response = await axios.get(
      `${hotels_URL}/?search=${searchTerm}&lang=${locale}`
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
      })
      .addCase(searchtHotelByHotelName.pending, (state) => {
        state.searchStatus = "pending";
      })
      .addCase(searchtHotelByHotelName.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchedHotel = action.payload;
      })
      .addCase(searchtHotelByHotelName.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.error.message as string;
      });
  },
});

// to get all hotels
export const allHotels = (state) => state.hotels.hotels;
// hotel by hotelID
export const hotel = (state) => state.hotels.hotel;
// hotel by hotelname
export const hotelFound = (state) => state.hotels.searchedHotel;

export const status = (state) => state.hotels.status;
// search status
export const searchStatus = (state) => state.hotels.searchStatus;
export const error = (state) => state.hotels.error;

// applying filters

export const applyFilters = (
  hotels,
  { distanceFilter, priceFilter }: IFilter
) => {
  return hotels
    .filter((hotel) => {
      return (
        hotel.distance <= distanceFilter.minDistance &&
        hotel.distance <= distanceFilter.maxDistance
      );
    })
    .filter((data) => {
      return data.minPrice <= priceFilter.maxPrice;
    });
};

export default hotelSlice.reducer;
