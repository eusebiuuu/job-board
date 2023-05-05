import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAnnouncementsThunk, getAllJobsThunk } from "./jobsThunk";
import { toast } from "react-toastify";

const initialState = {
  jobs: null,
  filteredJobs: null,
  isLoading: true,
  experiences: [],
  locations: [],
  cities: [],
  jobTypes: [],
  minSalary: '',
  keywords: '',
  page: 1,
  sort: 'oldest',
}

export const getAllJobs = createAsyncThunk('jobs/getAllJobs', getAllJobsThunk);

export const getAllAnnouncements = createAsyncThunk('jobs/getAllAnnouncements', getAllAnnouncementsThunk);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearFilters: (state) => {
      state.filteredJobs = state.jobs;
      state.experiences = [];
      state.locations = [];
      state.cities = [];
      state.jobTypes = [];
      state.minSalary = '';
      state.keywords = '';
      state.page = 1;
      state.sort = 'oldest';
    },
    changeExperiences: (state, action) => {
      const idx = state.experiences.indexOf(action.payload);
      if (idx !== -1) {
        state.experiences.splice(idx, 1);
      } else {
        state.experiences.push(action.payload);
      }
    },
    changeLocations: (state, action) => {
      const idx = state.locations.indexOf(action.payload);
      console.log(action.payload);
      if (idx !== -1) {
        state.locations.splice(idx, 1);
      } else {
        state.locations.push(action.payload);
      }
    },
    changeJobTypes: (state, action) => {
      const idx = state.jobTypes.indexOf(action.payload);
      console.log(action.payload);
      if (idx !== -1) {
        state.jobTypes.splice(idx, 1);
      } else {
        state.jobTypes.push(action.payload);
      }
    },
    changeCities: (state, action) => {
      state.cities = action.payload.map(city => {
        return city.toLowerCase();
      });
    },
    changeKeywords: (state, action) => {
      console.log(action.payload);
      state.keywords = action.payload;
    },
    changeMinSalary: (state, action) => {
      state.minSalary = action.payload;
    },
    filterJobs: (state) => {
      state.filteredJobs = state.jobs.filter(job => {
        if (!job.title.includes(state.keywords) && !job.requirements.includes(state.keywords) &&
        !job.description.includes(state.keywords)) {
          return null;
        }
        const num1 = state.minSalary === '' ? 0 : Number(state.minSalary);
        const num2 = job.minSalary === '' ? 0 : Number(job.minSalary);
        if (num1 > num2) {
          return null;
        }
        const existType = job.jobTypes.find(type => {
          if (state.jobTypes.includes(type)) {
            return true;
          }
          return null;
        });
        const existCity = job.cities.find(city => {
          if (state.cities.includes(city.toLowerCase())) {
            return true;
          }
          return null;
        })
        if (state.jobTypes.length !== 0 && !existType) {
          return null;
        }
        if (state.cities.length !== 0 && !existCity) {
          return null;
        }
        if (state.locations.length !== 0 && !state.locations.includes(job.location)) {
          return null;
        }
        if (state.experiences.length !== 0 && !state.experiences.includes(job.experience)) {
          return null;
        }
        return job;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        state.filteredJobs = action.payload.jobs;
      })
      .addCase(getAllAnnouncements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(getAllAnnouncements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.announcements;
      })
  }
});

export default jobsSlice.reducer;

export const {
  clearFilters,
  changeExperiences,
  changeLocations,
  changeJobTypes,
  changeKeywords,
  changeCities,
  changeMinSalary,
  filterJobs,
} = jobsSlice.actions;