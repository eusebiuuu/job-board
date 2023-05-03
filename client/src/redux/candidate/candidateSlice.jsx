import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editCandidateThunk, getCandidatesThunk, getSingleCandidateThunk } from "./candidateThunk";

const initialState = {
  isLoading: false,
  isError: false,
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

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    changeLastName: (state, { payload }) => {
      state.lastName = payload;
    },
    changeFirstName: (state, { payload }) => {
      state.firstName = payload;
    },
    changeEmail: (state, { payload }) => {
      state.email = payload;
    },
    changePassword: (state, { payload }) => {
      state.password = payload;
    },
    changePhone: (state, { payload }) => {
      state.phone = payload;
    },
    changeEducation: (state, { payload }) => {
      state.education = payload;
    },
    changeExperience: (state, { payload }) => {
      state.experience = payload;
    },
    changeImage: (state, { payload }) => {
      state.image = payload;
    },
    changeAbilities: (state, { payload }) => {
      state.abilities = payload;
    },
    changeAboutMe: (state, { payload }) => {
      state.aboutMe = payload;
    },
    changeBirthday: (state, { payload }) => {
      state.birthday = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(editCandidate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editCandidate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(editCandidate.fulfilled, (state, { payload }) => {
        return { isLoading: false, isError: false, ...payload.candidate};
        // console.log(state.candidate);
      })
      .addCase(getSingleCandidate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSingleCandidate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(getSingleCandidate.fulfilled, (state, { payload }) => {
        return { ...initialState, isLoading: false, isError: false, ...payload.candidate };
      })
      .addCase(getCandidates.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCandidates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(getCandidates.fulfilled, (state, { payload }) => {
        console.log(payload.candidates);
        return { isLoading: false, isError: false, candidates: payload.candidates };
        // console.log(state.candidate);
      })
  }
})

export default candidateSlice.reducer;

export const {
  changeAbilities,
  changeAboutMe,
  changeBirthday,
  changeEducation,
  changeEmail,
  changeExperience,
  changeFirstName,
  changeImage,
  changeLastName,
  changePassword,
  changePhone,
} = candidateSlice.actions;