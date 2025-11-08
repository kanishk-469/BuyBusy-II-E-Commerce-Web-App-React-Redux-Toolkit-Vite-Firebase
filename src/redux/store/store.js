import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../reducers/productReducer";
import { loggerMiddleware } from "../middlewares/loggerMiddleware";
import { cartReducer } from "../reducers/cartReducer";

export const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loggerMiddleware);
  },
});
