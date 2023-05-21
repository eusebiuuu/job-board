import { configureStore } from '@reduxjs/toolkit';
import jobsSlice from './jobs/jobsSlice';
import candidateSlice from './candidate/candidateSlice';
import companySlice from './company/companySlice';

export const store = configureStore({
  reducer: {
    jobs: jobsSlice,
    candidate: candidateSlice,
    company: companySlice,
  },
});