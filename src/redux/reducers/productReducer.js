import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configDB/firebase"; // adjust the path if needed

// Initial Redux state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products from Firestore
export const getInitialProductStateAsync = createAsyncThunk(
  "product/getInitialState",
  async (arg, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //   console.log(productsData);
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice definition
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Optional: manual setter if you need to dispatch data manually
    // setInitialState: (state, action) => {
    //   state.products = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialProductStateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInitialProductStateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getInitialProductStateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load products";
      });
  },
});

// Exports
export const { setInitialState } = productSlice.actions;
export const productReducer = productSlice.reducer;

///Write Selector code here , to follow DRY Principle
export const productSelector = (state) => state.productReducer;
