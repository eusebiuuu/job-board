import customFetch from "../../lib/customFetch";

export const editCandidateThunk = async (candidateID, thunkAPI) => {
  const candidate = thunkAPI.getState().candidate;
  if (candidate.lastName === '') {
    return thunkAPI.rejectWithValue({ msg: 'Last name field must not be empty'});
  }
  if (candidate.firstName === '') {
    return thunkAPI.rejectWithValue({ msg: 'First name field must not be empty'});
  }
  if (candidate.phone === '') {
    return thunkAPI.rejectWithValue({ msg: 'Phone field must not be empty'});
  }
  try {
    const response = await customFetch.patch(`/candidates/${candidateID}`, { candidate });
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const getSingleCandidateThunk = async (candidateID, thunkAPI) => {
  try {
    const response = await customFetch.get(`/candidates/${candidateID}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const deleteCandidateThunk = async (candidateID, thunkAPI) => {
  try {
    const response = await customFetch.delete(`/candidates/${candidateID}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}