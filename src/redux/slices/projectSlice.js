import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await axios.get("http://localhost:5000/projects");
  return response.data;
});

const projectSlice = createSlice({
  name: "project",
  initialState: { projects: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      });
  },
});

export default projectSlice.reducer;
