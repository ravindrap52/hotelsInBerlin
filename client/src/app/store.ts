import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "../features/hotels/hotelsSlice";
import languageReducer from "../features/language/languageSlice";

export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    language: languageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
