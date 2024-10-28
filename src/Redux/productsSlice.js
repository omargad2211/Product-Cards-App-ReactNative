// productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?skip=${
          (page - 1) * limit
        }&limit=${limit}`
      );
      return {
        products: response.data.products,
        hasMore: response.data.products.length > 0,
      };
    } catch (e) {
      console.log(e);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    hasMore: true, // Track if there are more products to load
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.products]; // Append new products
        state.hasMore = action.payload.hasMore; // Update hasMore state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
