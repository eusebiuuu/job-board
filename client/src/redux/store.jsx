import { configureStore } from '@reduxjs/toolkit';
import jobsSlice from './jobs/jobsSlice';
import jobSlice from './job/jobSlice';
import applicationSlice from './application/applicationSlice';
import candidateSlice from './candidate/candidateSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsSlice,
    job: jobSlice,
    applications: applicationSlice,
    candidate: candidateSlice
  },
});