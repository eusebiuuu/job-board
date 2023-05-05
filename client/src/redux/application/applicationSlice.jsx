import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAppliedJobsThunk } from "./applicationThunk";
import { toast } from "react-toastify";

const initialState = {
  jobs: [],
  isLoading: false,
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
        state.isLoading = true;
      })
      .addCase(getAppliedJobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        console.log(action.payload);
      })
  }
});

export default applicationSlice.reducer;