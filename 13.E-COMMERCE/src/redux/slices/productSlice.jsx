import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  selectedProduct: {},
  loading: false,
  searchTerm: ""
};

export const getAllProducts = createAsyncThunk("product/getAll", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct : (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSearchTerm : (state, action) => {
      state.searchTerm = action.payload.toLowerCase();
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
     
  },
});

export const { setSelectedProduct,setSearchTerm } = productSlice.actions
export default productSlice.reducer;
