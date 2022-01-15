import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  visibility: 'hidden',
  search: '',
  status: 'idle' 
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setVisibility(state, action) {
      state.visibility = action.payload;
    },
    changeSearchField(state, action) {
      state.search = action.payload;
    }
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;