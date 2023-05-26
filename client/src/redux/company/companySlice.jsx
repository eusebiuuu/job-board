import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCompanyThunk, editCompanyThunk } from "./companyThunk";
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

export const editCompany = createAsyncThunk('company/editCompany', editCompanyThunk);

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
      .addCase(editCompany.rejected, (state, action) => {
        toast.error(action.payload.msg);
      })
      .addCase(editCompany.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        return { ...payload.company };
      })
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