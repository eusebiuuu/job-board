import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createJobThunk, deleteJobThunk, editJobThunk, getSingleJobThunk } from "./jobThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  title: '',
  description: '',
  benefits: [],
  experience: 'no experience',
  location: 'office',
  cities: [],
  jobTypes: ['full-time'],
  minSalary: '',
  requirements: '',
  image: '',
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
    clearFields: (state, { payload }) => {
      return { ...initialState, isLoading: payload };
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
      })
      .addCase(addJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.job = action.payload.job;
        toast.success(action.payload.msg);
      })
      .addCase(getSingleJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(getSingleJob.fulfilled, (state, action) => {
        const curJob = action.payload.job;
        // console.log(curJob);
        return { ...initialState, ...curJob, job: curJob, isLoading: false };
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.job = action.payload.job;
        toast.success(action.payload.msg);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.msg);
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