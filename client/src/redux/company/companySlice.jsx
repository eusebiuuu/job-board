import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editCompanyThunk, getCompanyThunk } from "./companyThunk";
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

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    changeName: (state, { payload }) => {
      state.name = payload;
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
    changeMainHeadquarter: (state, { payload }) => {
      state.mainHeadquarter = payload;
    },
    changeSubscriptionExpiration: (state, { payload }) => {
      state.subscriptionExpiration = payload;
    },
    changeLogo: (state, { payload }) => {
      state.logo = payload;
    },
    changeAvailablePosts: (state, { payload }) => {
      state.availablePosts = payload;
    },
    changeAboutUs: (state, { payload }) => {
      state.aboutUs = payload;
    },
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
  }
});

export default companySlice.reducer;

export const {
  changeName,
  changeAboutUs,
  changeAvailablePosts,
  changeEmail,
  changeLogo,
  changeMainHeadquarter,
  changePassword,
  changePhone,
  changeSubscriptionExpiration,
} = companySlice.actions;