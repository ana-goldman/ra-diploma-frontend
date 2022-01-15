import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { 
  cart: [],
  status: 'idle' 
};

export const postOrder = createAsyncThunk('cartSlice/postOrder', async (body, { rejectWithValue }) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}order`, requestOptions)
      .then(response => response.status)
    return response
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
  }

});

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart.push(action.payload);
      state.status = 'idle' 
    },
    addMore(state, action){
      const addMoreOf = state.cart.find(o => o.title === action.payload.title);
      addMoreOf.count = addMoreOf.count + action.payload.count;
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(o => o.id !== action.payload);
    },
    resetStatus(state, action) {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(postOrder.fulfilled, (state, action) => {
      if(action.payload === 204) {
        state.cart = [];
        state.status = 'success';
      } else {
        state.status = 'error';
      }
    })
    builder.addCase(postOrder.rejected, (state, action) => {
      state.status = 'error';
    })
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;