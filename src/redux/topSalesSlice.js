import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { 
  items: [], 
  status: 'idle' 
};

const getItems = async (url) => {
  const response = await fetch(url)
    .then(response => response.json())
  return response;
};

export const fetchItems = createAsyncThunk('topSalesSlice/fetchItems', async (url, { rejectWithValue }) => {

  try {
    const items = await getItems(url);
    return items
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
  }

});

const topSalesSlice = createSlice({
  name: 'topSalesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    })
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = 'error';
    })
  }
});

export const topSalesActions = topSalesSlice.actions;
export default topSalesSlice.reducer;