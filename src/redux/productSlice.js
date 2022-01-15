import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { 
  product: {},
  pickedSize : null,
  count: 1,
  status: 'idle' 
};

const getItem = async (url) => {
  const response = await fetch(url)
    .then(response => response.json());
  return response;
};

export const fetchItem = createAsyncThunk('productSlice/fetchItem', async (url, { rejectWithValue }) => {

  try {
    const item = await getItem(url);
    return item
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
  }

});

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setPickedSize(state, action) {
      state.pickedSize = action.payload;
    },
    setCount(state, action) {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItem.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.status = 'success';
      state.product = action.payload;
    })
    builder.addCase(fetchItem.rejected, (state, action) => {
      state.status = 'error';
    })
  }
});

export const productActions = productSlice.actions;
export default productSlice.reducer;