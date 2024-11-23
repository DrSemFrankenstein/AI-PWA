// apiKeySlice.js
import { createSlice } from "@reduxjs/toolkit";

export const apiKeySlice = createSlice({
  name: "apiKey",
  initialState: {
    value: "", 
  },
  reducers: {
    setApiKey: (state, action) => {
      state.value = action.payload; 
    },
  },
});

export const { setApiKey } = apiKeySlice.actions;
export default apiKeySlice.reducer;
