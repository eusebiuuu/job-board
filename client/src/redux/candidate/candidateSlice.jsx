import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCandidateThunk, editCandidateThunk, getSingleCandidateThunk } from "./candidateThunk";
import { toast } from "react-toastify";

const initialState = {
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

export const deleteCandidate = createAsyncThunk('candidate/delete', deleteCandidateThunk);

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
      .addCase(editCandidate.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(editCandidate.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        return { ...payload.candidate };
      })
      .addCase(getSingleCandidate.rejected, (state, action) => {
        toast.error(action.payload.msg);
      })
      .addCase(getSingleCandidate.fulfilled, (state, { payload }) => {
        return { ...initialState, ...payload.candidate };
      })
      .addCase(deleteCandidate.rejected, (state, action) => {
        toast.error(action.payload.msg);
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        toast.success(action.payload.msg);
      })
  }
})

export default candidateSlice.reducer;

export const {
  changeState,
} = candidateSlice.actions;