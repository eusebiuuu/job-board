import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editCandidateThunk, getCandidatesThunk, getSingleCandidateThunk, registerCandidateThunk } from "./candidateThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  education: '',
  experience: '',
  image: '',
  abilities: [],
  birthday: '',
  aboutMe: '',
  candidates: null
}

export const editCandidate = createAsyncThunk('candidate/editCandidate', editCandidateThunk);

export const getSingleCandidate = createAsyncThunk('candidate/getCandidate', getSingleCandidateThunk);

export const getCandidates = createAsyncThunk('candidate/getCandidates', getCandidatesThunk);

export const registerCandidate = createAsyncThunk('candidate/register', registerCandidateThunk);

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    changeState: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(editCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCandidate.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(editCandidate.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        return { isLoading: false, ...payload.candidate };
      })
      .addCase(getSingleCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleCandidate.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(getSingleCandidate.fulfilled, (state, { payload }) => {
        return { ...initialState, isLoading: false, ...payload.candidate };
      })
      .addCase(getCandidates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCandidates.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(getCandidates.fulfilled, (state, { payload }) => {
        return { isLoading: false, candidates: payload.candidates };
      })
      .addCase(registerCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerCandidate.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(registerCandidate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.msg);
      })
  }
})

export default candidateSlice.reducer;

export const {
  changeState,
} = candidateSlice.actions;