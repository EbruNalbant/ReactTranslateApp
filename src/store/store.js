import { configureStore } from "@reduxjs/toolkit";
import translateSlice from "./slices/transleteSlice";

export default configureStore({
  reducer: { translateSlice },
});
