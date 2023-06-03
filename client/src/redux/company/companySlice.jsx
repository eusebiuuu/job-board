import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCompanyThunk } from "./companyThunk";
import { toast } from "react-toastify";

const initialState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  mainHeadquarter: '',
  subscriptionExpiration: null,
  logo: '',
  availablePosts: 0,
  aboutUs: '',
  averageRating: 0,
}

export const deleteCompany = createAsyncThunk('company/delete', deleteCompanyThunk);

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
      .addCase(deleteCompany.rejected, (state, action) => {
        toast.error(action.payload.msg);
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        toast.success(action.payload.msg);
      })
  }
});

export default companySlice.reducer;

export const {
  changeState,
} = companySlice.actions;