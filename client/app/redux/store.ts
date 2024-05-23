import { configureStore } from "@reduxjs/toolkit";
import urlSlice from './urlSlice'

const store = configureStore({
 reducer: {
  url: urlSlice,
 }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;