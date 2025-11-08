///using redux-toolkit

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../configDB/firebase";

const initialState = {
  cartItems: [],
  error: null,
};

////retrieve all cart items from firestore, we can call this as action
export const getInitialCartValueAsync = createAsyncThunk(
  "cart/getCartValue",
  async (arg, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "cartItems"));
      const cartItemsData = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return cartItemsData;
    } catch (err) {
      console.error("Error fetching cartItems:", err);
      return rejectWithValue(err.message);
    }
  }
);

//// Remove a specific cart item by ID
export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "cartItems", cartItemId));
      console.log(" Deleted cart item with ID:", cartItemId);
      return cartItemId; // return ID for local state update
    } catch (err) {
      console.error(" Error deleting cartItem:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // setInitialCartValue: (state, action) => {
    //   state.cartItems = [...action.payload];
    // },
    addItems: (state, action) => {
      console.log("inside add action" + state);
    },

    removeItem: (state, action) => {
      console.log("inside removeItem action" + state);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getInitialCartValueAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(getInitialCartValueAsync.rejected, (state, action) => {
        state.error = action.payload || "Failed to load cartItems";
        console.log("Error Message: " + action.error.message);
      })
      //  Remove one cart item
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        console.log("✅ Successfully deleted cart item");
        // remove from local state
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeCartItemAsync.rejected, (state, action) => {
        console.log(" Failed deleting cartItem:", action.error?.message);
        state.error = action.payload || "Failed to delete cart item";
      });
  },
});

export const cartReducer = cartSlice.reducer;
// export const { addItems, removeItem } = cartReducer.actions;

///writing selector code here, to follow DRY Principle
export const cartSelector = (state) => state.cartReducer;
