import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAppliedJobsThunk } from "./applicationThunk";

const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  page: 1,
}

export const getAppliedJobs = createAsyncThunk('/application/getAppliedJobs', getAppliedJobsThunk);

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppliedJobs.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getAppliedJobs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        console.log(action.payload);
      })
  }
});

export default applicationSlice.reducer;