import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { authSlice } from "./auth/authSlice";
import { calendarSlice } from "./calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
