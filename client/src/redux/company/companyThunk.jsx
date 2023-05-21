import customFetch from "../../lib/customFetch";

export const getCompanyThunk = async (companyID, thunkAPI) => {
  try {
    const response = await customFetch.get(`/companies/${companyID}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const editCompanyThunk = async (companyID, thunkAPI) => {
  const company = thunkAPI.getState().company;
  try {
    const response = await customFetch.patch(`/companies/${companyID}`, { company });
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const deleteCompanyThunk = async (companyID, thunkAPI) => {
  try {
    const response = await customFetch.delete(`/companies/${companyID}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}