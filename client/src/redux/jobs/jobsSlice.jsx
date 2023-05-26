import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAnnouncementsThunk, getAllJobsThunk, getAppliedJobsThunk } from "./jobsThunk";
import { toast } from "react-toastify";

const initialState = {
  jobs: null,
  filteredJobs: null,
  page: 1,
  limit: 10,
  sort: 'oldest',
}

export const getAllJobs = createAsyncThunk('jobs/getAllJobs', getAllJobsThunk);

export const getAllAnnouncements = createAsyncThunk('jobs/getAllAnnouncements', getAllAnnouncementsThunk);

export const getAppliedJobs = createAsyncThunk('jobs/getAppliedJobs', getAppliedJobsThunk);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    changeState: (state, { payload }) => {
      state[payload.name] = payload.value;
      if (payload.name !== 'page') {
        state.page = 1;
      }
    },
    filterJobs: (state, { payload: filters }) => {
      if (state.jobs === null) {
        state.jobs = [];
      }
      state.filteredJobs = state.jobs.filter(job => {
        if (!job.title.includes(filters.keywords) && !job.requirements.includes(filters.keywords) &&
        !job.description.includes(filters.keywords)) {
          return null;
        }
        const num1 = filters.minSalary === '' ? 0 : Number(filters.minSalary);
        const num2 = job.minSalary === '' ? 0 : Number(job.minSalary);
        if (num1 > num2) {
          return null;
        }
        const existType = job.jobTypes.find(type => {
          if (filters.jobTypes.includes(type)) {
            return true;
          }
          return null;
        });
        const existCity = job.cities.find(city => {
          if (filters.cities.includes(city.toLowerCase())) {
            return true;
          }
          return null;
        })
        if (filters.jobTypes.length !== 0 && !existType) {
          return null;
        }
        if (filters.cities.length !== 0 && !existCity) {
          return null;
        }
        if (filters.locations.length !== 0 && !filters.locations.includes(job.location)) {
          return null;
        }
        if (filters.experiences.length !== 0 && !filters.experiences.includes(job.experience)) {
          return null;
        }
        return job;
      });
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.rejected, (state, action) => {
        toast.error(action.payload.msg);
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.jobs = state.filteredJobs = action.payload.jobs;
      })
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        toast.error(action.payload.msg);
      })
      .addCase(getAllAnnouncements.fulfilled, (state, action) => {
        state.jobs = state.filteredJobs = action.payload.announcements;
      })
      .addCase(getAppliedJobs.rejected, (state, action) => {
        toast.error(action.payload.msg);
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.jobs = state.filteredJobs = action.payload.jobs;
      })
  }
});

export default jobsSlice.reducer;

export const {
  filterJobs,
  changeState,
} = jobsSlice.actions;