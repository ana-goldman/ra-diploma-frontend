import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { 
  items: [], 
  categories: [], 
  current: '',
  moreBtn: false, 
  status: 'idle' 
};

const getItems = async (url) => {
  const response = await fetch(url)
    .then(response => response.json());
  return response;
};

export const fetchCategories = createAsyncThunk('catalogSlice/fetchCategories', async (url, { rejectWithValue }) => {

  try {
    const categories = getItems(url);
    return categories
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
  }

});

export const fetchItems = createAsyncThunk('catalogSlice/fetchItems', async (url, { rejectWithValue }) => {

  try {
    const items = await getItems(url);
    return items
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
  }

});

export const fetchMoreItems = createAsyncThunk('catalogSlice/fetchMoreItems', async (url, { rejectWithValue }) => {

  try {
    const items = await getItems(url);
    return items
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
  }

});

const catalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    setCurrent(state, action) {
      const current = state.categories.find(o => o.id === action.payload);
      state.current = current;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = [];
      state.categories = action.payload;
      state.categories.unshift({id: 11, title: 'Все'});
      state.current = state.categories[0];
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = 'error';
    })
    builder.addCase(fetchItems.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
      state.moreBtn = true;
    })
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.status = 'error';
    })
    builder.addCase(fetchMoreItems.pending, (state, action) => {
      state.status = 'loadingMore'
    })
    builder.addCase(fetchMoreItems.fulfilled, (state, action) => {
      state.status = 'success';
      action.payload.forEach(o => state.items.push(o));
      if (action.payload < 6 || action.payload.length === []) {
        state.moreBtn = false;
      }
    })
    builder.addCase(fetchMoreItems.rejected, (state, action) => {
      state.status = 'error';
    })
  }
});

export const catalogActions = catalogSlice.actions;
export default catalogSlice.reducer;