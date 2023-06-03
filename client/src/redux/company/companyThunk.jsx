import customFetch from "../../lib/customFetch";

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