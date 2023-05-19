import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editCompanyThunk, getCompanyThunk, registerCompanyThunk } from "./companyThunk";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true,
  name: '',
  email: '',
  password: '',
  phone: '',
  mainHeadquarter: '',
  subscriptionExpiration: '',
  logo: '',
  availablePosts: 0,
  aboutUs: '',
}

export const getCompany = createAsyncThunk('company/getCompany', getCompanyThunk);

export const editCompany = createAsyncThunk('company/editCompany', editCompanyThunk);

export const registerCompany = createAsyncThunk('company/register', registerCompanyThunk);

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    changeState: (state, { payload }) => {
      state[payload.name] = payload.value;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(getCompany.fulfilled, (state, { payload }) => {
        return { isLoading: false, ...payload.company };
      })
      .addCase(editCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCompany.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(editCompany.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        return { isLoading: false, ...payload.company };
      })
      .addCase(registerCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.msg);
      })
      .addCase(registerCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.msg);
      })
  }
});

export default companySlice.reducer;

export const {
  changeState,
} = companySlice.actions;