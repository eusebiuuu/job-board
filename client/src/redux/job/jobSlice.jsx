import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createJobThunk, deleteJobThunk, editJobThunk, getSingleJobThunk } from "./jobThunk";

const initialState = {
  isLoading: false,
  isError: false,
  title: '',
  description: '',
  benefits: [],
  experience: 'no experience',
  location: 'office',
  cities: [],
  jobTypes: ['full-time'],
  minSalary: '',
  requirements: '',
  job: null,
}

export const addJob = createAsyncThunk('job/addJob', createJobThunk);

export const getSingleJob = createAsyncThunk('job/getSingleJob', getSingleJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearFields: (state) => {
      return { ...initialState };
    },
    changeExperience: (state, action) => {
      state.experience = action.payload;
    },
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
    changeLocation: (state, action) => {
      state.location = action.payload;
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
    changeBenefits: (state, action) => {
      state.benefits = action.payload.map(benefit => {
        return benefit.toLowerCase();
      });
    },
    changeMinSalary: (state, action) => {
      state.minSalary = action.payload;
    },
    changeRequirements: (state, action) => {
      state.requirements = action.payload;
    },
    changeDescription: (state, action) => {
      state.description = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.job = action.payload.job;
        // console.log(state.job);
      })
      .addCase(getSingleJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSingleJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(getSingleJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const curJob = action.payload.job;
        state.job = curJob;
        state.experience = curJob.experience;
        state.location = curJob.location;
        state.jobTypes = curJob.jobTypes;
        state.cities = curJob.cities;
        state.benefits = curJob.benefits;
        state.description = curJob.description;
        state.title = curJob.title;
        state.minSalary = curJob.minSalary;
        state.requirements = curJob.requirements;
        console.log(action.payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.job = action.payload.job;
        // console.log(action.payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log(action.payload);
      })
  }
});

export const {
  changeBenefits,
  changeCities,
  changeDescription,
  changeExperience,
  changeJobTypes,
  changeLocation,
  changeMinSalary,
  changeRequirements,
  changeTitle,
  clearFields,
} = jobSlice.actions;

export default jobSlice.reducer;