import { createSlice } from "@reduxjs/toolkit";

export const themeModeSlice = createSlice({
  name: "themeMode",
  initialState: "dark" as "light" | "dark",
  reducers: {
    toggle: (state) => (state === "light" ? "dark" : "light"),
  },
});
