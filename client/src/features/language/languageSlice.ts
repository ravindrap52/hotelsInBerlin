import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILanguage {
  lang: string;
}
// by default we are taking the browser locale as a default langugae.

// putting langugae in a store because langugae is required across the application
// it's a good idea to put only those items in a store, which are required across application, otherwise use component local store

const initialState = {
  lang: window.navigator.language,
} as ILanguage;

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLocale(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
  },
});
export const { changeLocale } = languageSlice.actions;
export default languageSlice.reducer;
