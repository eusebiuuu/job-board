import customFetch from "../../lib/customFetch";

export const getCompanyThunk = async (companyID, thunkAPI) => {
  if (companyID) {
    try {
      const response = await customFetch.get(`/companies/${companyID}`);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  } else {
    //
  }
}

export const editCompanyThunk = async (companyID, thunkAPI) => {
  const company = thunkAPI.getState().company;
  try {
    const response = await customFetch.patch(`/companies/${companyID}`, { company });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const registerCompanyThunk = async (userInfo, thunkAPI) => {
  userInfo.type = 'company';
  try {
    const response = await customFetch.post(`/auth/register`, { user: userInfo });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}